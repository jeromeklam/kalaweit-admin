import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_SET_LOCALE,
} from './constants';

export function setLocale(locale) {
  return {
    type: HOME_SET_LOCALE,
    locale: locale,
  };
}

export function useSetLocale() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setLocale(...params)), [dispatch]);
  return { setLocale: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };

    default:
      return state;
  }
}
