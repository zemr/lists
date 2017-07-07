import parse from 'parse-link-header';

const FETCH_BEGIN = 'people/FETCH_BEGIN';
const FETCH_SUCCESS = 'people/FETCH_SUCCESS';
const FETCH_FAIL = 'people/FETCH_FAIL';

export const fetchPeople = (url) => dispatch => {
  dispatch({ type: FETCH_BEGIN });
  return fetch(url
  ).then(
    response => {
      if (response.ok) {
        const pages = parse(response.headers.get('Link'));
        return response.json()
          .then(
            data => {
              dispatch({
                type: FETCH_SUCCESS,
                data
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
        fetching: false
      };
    case FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    default:
      return state
  }
}
