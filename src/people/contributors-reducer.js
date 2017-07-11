import { fetchPeople } from '../utils/reducers';

const actionTypes = {
  BEGIN: 'contributors/FETCH_BEGIN',
  SUCCESS: 'contributors/FETCH_SUCCESS',
  FAIL: 'contributors/FETCH_FAIL',
  CLEAR: 'contributors/CLEAR_STATE'
};

export const fetchContributors = (url, modified) => dispatch => {
  dispatch(fetchPeople(url, modified, actionTypes));
};

const initialState = {
  data: [],
  modified: null,
  fetching: false,
  error: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.BEGIN:
      return {
        ...state,
        fetching: true
      };
    case actionTypes.SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.data),
        modified: action.modified,
        fetching: false
      };
    case actionTypes.FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case actionTypes.CLEAR:
      return {
        ...state,
        data: initialState.data
      };
    default:
      return state
  }
}
