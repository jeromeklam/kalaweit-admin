import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import {
  AUTH_SWITCH_GROUP_BEGIN,
  AUTH_SWITCH_GROUP_SUCCESS,
  AUTH_SWITCH_GROUP_FAILURE,
  AUTH_SWITCH_GROUP_DISMISS_ERROR,
} from './constants';
import { saveToLS, getFromLS } from '../../ui';
import { freeAssoApi } from '../../../common';

export function switchGroup(grp_id = 0) {
  return (dispatch) => {
    dispatch({
      type: AUTH_SWITCH_GROUP_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.put('/v1/sso/switch_group/' + grp_id);
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_SWITCH_GROUP_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_SWITCH_GROUP_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissSwitchGroupError() {
  return {
    type: AUTH_SWITCH_GROUP_DISMISS_ERROR,
  };
}

export function useSwitchGroup() {
  const dispatch = useDispatch();

  const { switchGroupPending, switchGroupError } = useSelector(
    state => ({
      switchGroupPending: state.auth.switchGroupPending,
      switchGroupError: state.auth.switchGroupError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(switchGroup(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissSwitchGroupError());
  }, [dispatch]);

  return {
    switchGroup: boundAction,
    switchGroupPending,
    switchGroupError,
    dismissSwitchGroupError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SWITCH_GROUP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        switchGroupPending: true,
        switchGroupError: null,
      };

    case AUTH_SWITCH_GROUP_SUCCESS:
      // The request is success
      const datas = action.data;
      let realm = state.realm;
      let user = null;
      let inputMoney = state.inputMoney;
      let displayMoney = state.displayMoney;
      if (datas.data) {
        const object = jsonApiNormalizer(datas.data);
        user = normalizedObjectModeler(object, 'FreeSSO_User', object.SORTEDELEMS[0], {
          eager: true,
        });
      }
      if (user) {
        let defaultRealm = user.default_group && user.default_group.id ? user.default_group.id : getFromLS('realm');
        if (user.realms && Array.isArray(user.realms)) {
          const found = user.realms.find(item => {
            return parseInt(item.id, 10) === parseInt(defaultRealm, 10);
          });
          if (found) {
            realm = found;
            saveToLS('realm', defaultRealm);
          } else {
            user.realms.forEach(item => {
              realm = item;
              saveToLS('realm', realm.id);
            });
          }
          inputMoney = realm.grp_money_input;
          displayMoney = realm.grp_money_code;
        }
      }
      return {
        ...state,
        switchGroupPending: false,
        switchGroupError: null,
        inputMoney: inputMoney,
        displayMoney: displayMoney,
        realm: realm,
      };

    case AUTH_SWITCH_GROUP_FAILURE:
      // The request is failed
      return {
        ...state,
        switchGroupPending: false,
        switchGroupError: action.data.error,
      };

    case AUTH_SWITCH_GROUP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        switchGroupError: null,
      };

    default:
      return state;
  }
}
