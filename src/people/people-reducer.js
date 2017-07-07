import parse from 'parse-link-header';

const FETCH_BEGIN = 'people/FETCH_BEGIN';
const FETCH_SUCCESS = 'people/FETCH_SUCCESS';
const FETCH_FAIL = 'people/FETCH_FAIL';
const CLEAR_STATE = 'people/CLEAR_STATE';

export const fetchPeople = (url, modified) => dispatch => {
  let initObject;
  if (modified === undefined) {
    initObject = {};
  } else {
    initObject = {
      headers: {
        "If-Modified-Since": modified
      }
    };
  }

  dispatch({ type: FETCH_BEGIN });
  return fetch(url, initObject
  ).then(
    response => {
      if (response.ok) {
        const pages = parse(response.headers.get('Link'));
        const modified = response.headers.get('Last-Modified');
        return response.json()
          .then(
            data => {
              if (!pages || (pages.next && pages.next.page === '2')) {
                dispatch({
                  type: CLEAR_STATE
                });
              }
              dispatch({
                type: FETCH_SUCCESS,
                data,
                modified
              });
              if (pages && pages.next) {
                dispatch(fetchPeople(pages.next.url))
              }
            }
          ).catch(
            error => dispatch({
              type: FETCH_FAIL,
              error: error.message
            })
          )
      }
      throw new Error('Connection error')
    }
  ).catch(
    error => dispatch({
      type: FETCH_FAIL,
      error: error.message
    })
  )
};

const initialState = {
  data: [],
  modified: null,
  fetching: false,
  error: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        fetching: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.data),
        modified: action.modified,
        fetching: false
      };
    case FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case CLEAR_STATE:
      return {
        ...state,
        data: initialState.data
      };
    default:
      return state
  }
}
