import { fetchData, createReducer } from '../utils/reducers';

export const actionTypes = {
  BEGIN: 'contributors/FETCH_BEGIN',
  SUCCESS: 'contributors/FETCH_SUCCESS',
  FAIL: 'contributors/FETCH_FAIL',
  CLEAR: 'contributors/CLEAR_STATE',
  TRIM: 'contributors/TRIM_ETAGS',
  REFRESH: 'contributors/REFRESH_DATA'
};

export const fetchContributors = (url, etag) => dispatch => {
  dispatch(fetchData(url, etag, actionTypes));
};

const reducer =  createReducer(actionTypes);

export default reducer
