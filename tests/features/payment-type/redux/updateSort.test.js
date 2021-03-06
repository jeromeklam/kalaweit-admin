import {
  PAYMENT_TYPE_UPDATE_SORT,
} from '../../../../src/features/payment-type/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/payment-type/redux/updateSort';

describe('payment-type/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', PAYMENT_TYPE_UPDATE_SORT);
  });

  it('handles action type PAYMENT_TYPE_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PAYMENT_TYPE_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
