import { Filter } from 'react-bootstrap-front';
import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeFW_Country'),
  page_number: 1,
  page_size: 0,
  filters: new Filter(),
  sort: [{col:"cnty_name",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
};

export default initialState;
