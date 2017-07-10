import reducer, { fetchPeople, FETCH_BEGIN, FETCH_SUCCESS, FETCH_FAIL, CLEAR_STATE } from './people-reducer';
import { peopleData, prDate, prUrl, prInitObject } from '../utils/test-helpers';
import store from '../store';

describe('people-reducer', () => {

  it('returns initial state', () => {
    expect(reducer()).toEqual(
      {
        data: [],
        modified: null,
        fetching: false,
        error: null
      }
    )
  });

  it('marks the beginning of data fetching', () => {
    expect(
      reducer(
        {
          data: [],
          modified: null,
          fetching: false,
          error: null
        },
        store.dispatch({ type: FETCH_BEGIN })
      )
    ).toEqual(
      reducer({
        data: [],
        modified: null,
        fetching: true,
        error: null
      })
    )
  });

  it('saves fetched data', () => {
    expect(
      reducer(
        {
          data: [{}],
          modified: null,
          fetching: true,
          error: null
        },
        store.dispatch({ data: [{"id": 8, "login": "eight"}], modified: prDate, type: FETCH_SUCCESS })
      )
    ).toEqual(
      reducer({
        data: [{}, {"id": 8, "login": "eight"}],
        modified: prDate,
        fetching: false,
        error: null
      })
    )
  });

  it('saves error message', () => {
    expect(
      reducer(
        {
          data: [],
          modified: null,
          fetching: true,
          error: null
        },
        store.dispatch({ error: 'Malformed JSON response', type: FETCH_FAIL })
      )
    ).toEqual(
      reducer({
        data: [],
        modified: null,
        fetching: false,
        error: 'Malformed JSON response'
      })
    )
  });

  it('clears state', () => {
    expect(
      reducer(
        {
          data: peopleData,
          modified: prDate,
          fetching: false,
          error: null
        },
        store.dispatch({ type: CLEAR_STATE })
      )
    ).toEqual(
      reducer({
        data: [],
        modified: prDate,
        fetching: false,
        error: null
      })
    )
  });

  it('dispatches BEGIN action', () => {
    const dispatch = jest.fn();
    fetchPeople(prUrl)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
  });

  it('starts fetching', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve());
    fetchPeople(prUrl)(dispatch);
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toBe(prUrl);
    expect(fetch.mock.calls[0][1]).toEqual({});

    fetchPeople(prUrl, prDate)(dispatch);
    expect(fetch.mock.calls[1][0]).toBe(prUrl);
    expect(fetch.mock.calls[1][1]).toEqual(prInitObject);
  });

  it('dispatches SUCCESS action', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'Last-Modified') {
            return prDate;
          } else if (arg === 'Link') {
            return '<https://path?page=3>; rel="next"'
          }
        }
      }
    }));
    fetchPeople(prUrl)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', modified: prDate, type: FETCH_SUCCESS });
    });
  });

  it('dispatches CLEAR action (one page of results)', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'Last-Modified') {
            return prDate;
          } else if (arg === 'Link') {
            return undefined;
          }
        }
      }
    }));
    fetchPeople(prUrl)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ type: CLEAR_STATE });
      expect(dispatch.mock.calls[2][0]).toEqual({ data: 'data', modified: prDate, type: FETCH_SUCCESS });
    });
  });

  it('dispatches CLEAR action (first page of results)', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'Last-Modified') {
            return prDate;
          } else if (arg === 'Link') {
            return '<https://path?page=2>; rel="next"'
          }
        }
      }
    }));
    fetchPeople(prUrl)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ type: CLEAR_STATE });
      expect(dispatch.mock.calls[2][0]).toEqual({ data: 'data', modified: prDate, type: FETCH_SUCCESS });
    });
  });

  it('calls new fetching', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'Last-Modified') {
            return prDate;
          } else if (arg === 'Link') {
            return '<https://path?page=3>; rel="next"'
          }
        }
      }
    }));
    fetchPeople(prUrl)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', modified: prDate, type: FETCH_SUCCESS });
      expect(dispatch.mock.calls[2][0]).toBeInstanceOf(Function);
    });
  });

  it('dispatches FAIL action when promise value wasn\'t returned', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({}));
    fetchPeople(prUrl)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Connection error', type: FETCH_FAIL }]);
    });
  });

  it('dispatches FAIL action when there\'s no proper json response', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.reject({ message: 'Malformed JSON response' }),
      headers: {
        get: (arg) => {
          if (arg === 'Last-Modified') {
            return prDate;
          } else if (arg === 'Link') {
            return undefined;
          }
        }
      }
    }));
    fetchPeople(prUrl)(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Malformed JSON response', type: FETCH_FAIL }]);
    });
  });

  it('dispatches FAIL action when promise was rejected', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.reject({ message: 'Not Found' }));
    fetchPeople(prUrl)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: FETCH_BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Not Found', type: FETCH_FAIL }]);
    });
  });

});
