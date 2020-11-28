import initialState from './initialState';
import { reducer as loadAllReducer } from './loadAll';
import { reducer as loadTimersReducer } from './loadTimers';
import { reducer as initSocketReducer } from './initSocket';
import { reducer as closeSocketReducer } from './closeSocket';
import { reducer as setLocaleReducer } from './setLocale';

const reducers = [
  loadAllReducer,
  loadTimersReducer,
  initSocketReducer,
  closeSocketReducer,
  setLocaleReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
