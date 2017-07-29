import { fetchData, createReducer } from '../utils/reducers';

export const actionTypes = {
  BEGIN: 'issues/FETCH_BEGIN',
  SUCCESS: 'issues/FETCH_SUCCESS',
  FAIL: 'issues/FETCH_FAIL',
  CLEAR: 'issues/CLEAR_STATE',
  TRIM: 'issues/TRIM_ETAGS'
};

export const fetchIssues = (url, etag) => dispatch => {
  dispatch(fetchData(url, etag, actionTypes));
};

const reducer =  createReducer(actionTypes);

export default reducer
