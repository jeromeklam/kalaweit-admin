import { Filter } from 'react-bootstrap-front';
import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Site'),
  page_number: 1,
  page_size: 999999,
  tab: '1',
  filters: new Filter(),
  sort: [{ col: 'site_name', way: 'up' }],
  properties: [
    'number_1',
    'string_1',
    'string_2',
    'number_3',
    'string_3',
    'number_4',
    'string_4',
    'bool_1',
    'number_5',
    'string_5',
    'string_6',
  ],
  quickSearch: '',
  mobileQuickSearch: false,
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneItem: null,
  loadOneRaw: null,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  filterPending: false,
  filterError: null,
  delOnePending: false,
  delOneError: null,
};

export default initialState;
