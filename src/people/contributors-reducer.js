import { fetchPeople, createReducer } from '../utils/reducers';

export const actionTypes = {
  BEGIN: 'contributors/FETCH_BEGIN',
  SUCCESS: 'contributors/FETCH_SUCCESS',
  FAIL: 'contributors/FETCH_FAIL',
  CLEAR: 'contributors/CLEAR_STATE'
};

export const fetchContributors = (url, etag) => dispatch => {
  dispatch(fetchPeople(url, etag, actionTypes));
};

const reducer =  createReducer(actionTypes);

export default reducer
