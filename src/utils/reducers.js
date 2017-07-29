import parse from 'parse-link-header';
import { rDisplayArgs } from './test-helpers';

export const fetchData = (url, etag, actionTypes) => (dispatch, getState) => {
  const name = url.indexOf('?') < 0
    ? url.substring(url.lastIndexOf('/')+1)
    : url.substring(url.lastIndexOf('/')+1, url.indexOf('?'));
  const { etag: etags } = getState()[name];
  const dataPages = getState()[name].data.length;
  const { auth } = getState().repository;

  let initObject, args;
  if (etag === undefined) {
    if (auth.length === 0) {
      initObject = {};
    } else {
      initObject = {
        headers: {
          "Authorization": "Basic " + auth
        }
      };
    }
  } else {
    if (auth.length === 0) {
      initObject = {
        headers: {
          "If-None-Match": etag
        }
      };
    } else {
      initObject = {
        headers: {
          "If-None-Match": etag,
          "Authorization": "Basic " + auth
        }
      };
    }
  }

  dispatch({ type: actionTypes.BEGIN });
  return fetch(url, initObject
  ).then(
    response => {
      if (response.ok) {
        const pages = parse(response.headers.get('Link'));
        const etag = response.headers.get('ETag');
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
                etag,
                index: pages ? pages.next ? +pages.next.page - 2 : +pages.prev.page : 0
              });
              if (pages && pages.next) {
                args = [
                  pages.next.url,
                  etags.length > 0 ? etags[+pages.next.page - 1] : undefined,
                  actionTypes
                ];
                /*global TESTING*/
                if (TESTING) {
                  rDisplayArgs(...args);
                }
                dispatch(fetchData(...args));
              }
              if (!pages || !pages.next) {
                dispatch({
                  type: actionTypes.TRIM,
                  index: pages ? +pages.prev.page + 1 : 1
                })
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
        if (dataPages > 1) {
          if (url.indexOf('?page') < 0) {
            args = [url + '?page=2', etags[1], actionTypes];
            /*global TESTING*/
            if (TESTING) {
              rDisplayArgs(...args);
            }
            dispatch(fetchData(...args));
          } else {
            const addon = url.indexOf('?page=');
            const basicUrl = url.substring(0, addon);
            const page = url.substring(addon + 6);
            const index = +page;
            const newPage = index + 1;
            args = [basicUrl + '?page=' + newPage, etags[index], actionTypes];
            if (index < etags.length) {
              /*global TESTING*/
              if (TESTING) {
                rDisplayArgs(...args);
              }
              dispatch(fetchData(...args));
            } else {
              dispatch({
                type: actionTypes.TRIM,
                index: newPage
              })
            }
          }
        }
        throw new Error(response.statusText);
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

const initialState = {
  data: [],
  etag: [],
  fetching: false,
  error: []
};

export const createReducer = (actionTypes) => {
  return (state = initialState, action = {}) => {
    switch (action.type) {
      case actionTypes.BEGIN:
        return {
          ...state,
          fetching: true
        };
      case actionTypes.SUCCESS:
        return {
          ...state,
          data: [...state.data.slice(0, action.index), action.data, ...state.data.slice(action.index + 1)],
          etag: [...state.etag.slice(0, action.index), action.etag, ...state.etag.slice(action.index + 1)],
          fetching: false
        };
      case actionTypes.FAIL:
        return {
          ...state,
          fetching: false,
          error: [...state.error.slice(), action.error]
        };
      case actionTypes.CLEAR:
        return {
          ...state,
          data: initialState.data,
          error: initialState.error
        };
      case actionTypes.TRIM:
        return {
          ...state,
          etag: [...state.etag.slice(0, action.index)]
        };
      default:
        return state;
    }
  }
};
