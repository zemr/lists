import { fetchData, createReducer } from '../utils/reducers';

export const actionTypes = {
  BEGIN: 'subscribers/FETCH_BEGIN',
  SUCCESS: 'subscribers/FETCH_SUCCESS',
  FAIL: 'subscribers/FETCH_FAIL',
  CLEAR: 'subscribers/CLEAR_STATE',
  TRIM: 'subscribers/TRIM_ETAGS',
  REFRESH: 'subscribers/REFRESH_DATA'
};

export const fetchSubscribers = (url, etag) => dispatch => {
  dispatch(fetchData(url, etag, actionTypes));
};

const reducer = createReducer(actionTypes);

export default reducer;
