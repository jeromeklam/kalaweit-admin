import {
  COMMON_SET_COORDS,
} from '../../../../src/features/common/redux/constants';

import {
  setCoords,
  reducer,
} from '../../../../src/features/common/redux/setCoords';

describe('common/redux/setCoords', () => {
  it('returns correct action by setCoords', () => {
    expect(setCoords()).toHaveProperty('type', COMMON_SET_COORDS);
  });

  it('handles action type COMMON_SET_COORDS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_COORDS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
