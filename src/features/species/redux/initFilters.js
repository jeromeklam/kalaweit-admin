import {Filter} from 'react-bootstrap-front';
import {
  SPECIES_INIT_FILTERS,
} from './constants';

export function initFilters() {
  return {
    type: SPECIES_INIT_FILTERS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SPECIES_INIT_FILTERS:
      return {
        ...state,
        filters: new Filter(),
      };

    default:
      return state;
  }
}
