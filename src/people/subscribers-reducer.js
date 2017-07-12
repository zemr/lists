import { fetchPeople, createReducer } from '../utils/reducers';

export const actionTypes = {
  BEGIN: 'subscribers/FETCH_BEGIN',
  SUCCESS: 'subscribers/FETCH_SUCCESS',
  FAIL: 'subscribers/FETCH_FAIL',
  CLEAR: 'subscribers/CLEAR_STATE'
};

export const fetchSubscribers = (url, etag) => dispatch => {
  dispatch(fetchPeople(url, etag, actionTypes));
};

const reducer = createReducer(actionTypes);

export default reducer;
