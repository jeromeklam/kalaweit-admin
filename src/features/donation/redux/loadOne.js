import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import {
  DONATION_LOAD_ONE_BEGIN,
  DONATION_LOAD_ONE_SUCCESS,
  DONATION_LOAD_ONE_FAILURE,
  DONATION_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return (dispatch) => {
    dispatch({
      type: DONATION_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/donation/' + args);
      doRequest.then(
        (res) => {
          dispatch({
            type: DONATION_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: DONATION_LOAD_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadOneError() {
  return {
    type: DONATION_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DONATION_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case DONATION_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      let emptyItem = state.emptyItem;
      item = normalizedObjectModeler(object, 'FreeAsso_Donation', action.id, { eager: true });
      if (action.id <= 0) {
        emptyItem = {...item};
      }
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
        emptyItem: emptyItem,
      };

    case DONATION_LOAD_ONE_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        loadOnePending: false,
        loadOneError: error,
      };

    case DONATION_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
