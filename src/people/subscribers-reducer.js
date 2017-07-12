import { fetchPeople, createReducer } from '../utils/reducers';

export const actionTypes = {
  BEGIN: 'subscribers/FETCH_BEGIN',
  SUCCESS: 'subscribers/FETCH_SUCCESS',
  FAIL: 'subscribers/FETCH_FAIL',
  CLEAR: 'subscribers/CLEAR_STATE'
};

export const fetchSubscribers = (url, modified) => dispatch => {
  dispatch(fetchPeople(url, modified, actionTypes));
};

const reducer = createReducer(actionTypes);

export default reducer;
