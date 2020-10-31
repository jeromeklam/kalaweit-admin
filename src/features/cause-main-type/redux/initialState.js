import {Filter} from 'react-bootstrap-front';
import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_CauseMainType'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"camt_name",way:"up"}],
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  updateOnePending: false,
  updateOneError: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
};

export default initialState;
