import { Filter } from 'react-bootstrap-front';
import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeFW_Rate'),
  models: [],
  page_number: 1,
  page_size: 0,
  filters: new Filter(),
  sort: [{col:"rate_money_from",way:"up"}, {col:"rate_money_to",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
};

export default initialState;
