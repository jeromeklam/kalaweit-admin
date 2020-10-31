import {
  SITE_UPDATE_SORT,
} from '../../../../src/features/site/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/site/redux/updateSort';

describe('site/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', SITE_UPDATE_SORT);
  });

  it('handles action type SITE_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
