import {
  EMAIL_SET_FILTERS,
} from '../../../../src/features/email/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/email/redux/setFilters';

describe('email/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', EMAIL_SET_FILTERS);
  });

  it('handles action type EMAIL_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: EMAIL_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
