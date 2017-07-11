import parse from 'parse-link-header';

export const fetchPeople = (url, modified, actionTypes) => dispatch => {
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

  dispatch({ type: actionTypes.BEGIN });
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
                  type: actionTypes.CLEAR
                });
              }
              dispatch({
                type: actionTypes.SUCCESS,
                data,
                modified
              });
              // testing settings
              if (pages && pages.next && +pages.next.page < 4) {
                dispatch(fetchPeople(pages.next.url, undefined, actionTypes));
              }
            }
          ).catch(
            error => dispatch({
              type: actionTypes.FAIL,
              error: error.message
            })
          )
      }
      if (response.status === 304) {
        throw new Error('Not modified');
      }
      throw new Error('Connection error');
    }
  ).catch(
    error => dispatch({
      type: actionTypes.FAIL,
      error: error.message
    })
  )
};
