import {
  HOME_SET_LOCALE,
} from '../../../../src/features/home/redux/constants';

import {
  setLocale,
  reducer,
} from '../../../../src/features/home/redux/setLocale';

describe('home/redux/setLocale', () => {
  it('returns correct action by setLocale', () => {
    expect(setLocale()).toHaveProperty('type', HOME_SET_LOCALE);
  });

  it('handles action type HOME_SET_LOCALE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_LOCALE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
