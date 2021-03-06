import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import {
  SITE_TYPE_LOAD_ONE_BEGIN,
  SITE_TYPE_LOAD_ONE_SUCCESS,
  SITE_TYPE_LOAD_ONE_FAILURE,
  SITE_TYPE_LOAD_ONE_DISMISS_ERROR,
} from './constants';

export function loadOne(args = {}) {
  return dispatch => {
    dispatch({
      type: SITE_TYPE_LOAD_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/asso/site_type/' + args, {});
      doRequest.then(
        res => {
          dispatch({
            type: SITE_TYPE_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: SITE_TYPE_LOAD_ONE_FAILURE,
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
    type: SITE_TYPE_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_TYPE_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
        createOneError: null,
        updateOneError: null,
      };

    case SITE_TYPE_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let object = jsonApiNormalizer(action.data.data);
      item = normalizedObjectModeler(object, 'FreeAsso_SiteType', action.id);
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneError: null,
      };

    case SITE_TYPE_LOAD_ONE_FAILURE:
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

    case SITE_TYPE_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
