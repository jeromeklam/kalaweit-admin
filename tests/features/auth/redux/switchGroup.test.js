import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_SWITCH_GROUP_BEGIN,
  AUTH_SWITCH_GROUP_SUCCESS,
  AUTH_SWITCH_GROUP_FAILURE,
  AUTH_SWITCH_GROUP_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  switchGroup,
  dismissSwitchGroupError,
  reducer,
} from '../../../../src/features/auth/redux/switchGroup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/switchGroup', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when switchGroup succeeds', () => {
    const store = mockStore({});

    return store.dispatch(switchGroup())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_SWITCH_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_SWITCH_GROUP_SUCCESS);
      });
  });

  it('dispatches failure action when switchGroup fails', () => {
    const store = mockStore({});

    return store.dispatch(switchGroup({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_SWITCH_GROUP_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_SWITCH_GROUP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSwitchGroupError', () => {
    const expectedAction = {
      type: AUTH_SWITCH_GROUP_DISMISS_ERROR,
    };
    expect(dismissSwitchGroupError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_SWITCH_GROUP_BEGIN correctly', () => {
    const prevState = { switchGroupPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_SWITCH_GROUP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.switchGroupPending).toBe(true);
  });

  it('handles action type AUTH_SWITCH_GROUP_SUCCESS correctly', () => {
    const prevState = { switchGroupPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_SWITCH_GROUP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.switchGroupPending).toBe(false);
  });

  it('handles action type AUTH_SWITCH_GROUP_FAILURE correctly', () => {
    const prevState = { switchGroupPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_SWITCH_GROUP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.switchGroupPending).toBe(false);
    expect(state.switchGroupError).toEqual(expect.anything());
  });

  it('handles action type AUTH_SWITCH_GROUP_DISMISS_ERROR correctly', () => {
    const prevState = { switchGroupError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_SWITCH_GROUP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.switchGroupError).toBe(null);
  });
});

