import { fetchData } from './reducers';
import * as helpers from './test-helpers';
import {
  rStore, rStoreETags, rStorePage, rStorePages, rStoreAuth,
  rETag, rUrl, rActionTypes,
  rInitObject, rInitObjectAuth, rInitObjectAuthE } from './test-helpers';
global.TESTING = true;

describe('reducers', () => {

  it('dispatches BEGIN action', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
  });

  it('starts fetching', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve());
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState);
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toBe(rUrl);
    expect(fetch.mock.calls[0][1]).toEqual({});

    fetchData(rUrl, rETag, rActionTypes)(dispatch, getState);
    expect(fetch.mock.calls[1][0]).toBe(rUrl);
    expect(fetch.mock.calls[1][1]).toEqual(rInitObject);
  });

  it('sends proper headers while fetching', () => {
    const dispatch = jest.fn();
    let getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve());
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState);
    expect(fetch.mock.calls[0][1]).toEqual({});
    fetchData(rUrl, rETag, rActionTypes)(dispatch, getState);
    expect(fetch.mock.calls[1][1]).toEqual(rInitObject);

    getState = jest.fn(() => (rStoreAuth));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState);
    expect(fetch.mock.calls[2][1]).toEqual(rInitObjectAuth);
    fetchData(rUrl, rETag, rActionTypes)(dispatch, getState);
    expect(fetch.mock.calls[3][1]).toEqual(rInitObjectAuthE);
  });

  it('dispatches SUCCESS action', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return '<https://path?page=3>; rel="next"'
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', etag: rETag, index: 1, type: rActionTypes.SUCCESS });
    });
  });

  it('dispatches CLEAR action (one page of results)', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return undefined;
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ type: rActionTypes.CLEAR });
      expect(dispatch.mock.calls[2][0]).toEqual({ data: 'data', etag: rETag, index: 0, type: rActionTypes.SUCCESS });
    });
  });

  it('dispatches CLEAR action (first page of results)', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return '<https://path?page=2>; rel="next"'
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ type: rActionTypes.CLEAR });
      expect(dispatch.mock.calls[2][0]).toEqual({ data: 'data', etag: rETag, index: 0, type: rActionTypes.SUCCESS });
    });
  });

  it('sets proper index for last page of results', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return '<https://path?page=2>; rel="prev"'
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', etag: rETag, index: 2, type: rActionTypes.SUCCESS });
    });
  });

  it('calls new fetching', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return '<https://path?page=3>; rel="next"'
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', etag: rETag, index: 1, type: rActionTypes.SUCCESS });
      expect(dispatch.mock.calls[2][0]).toBeInstanceOf(Function);
    });
  });

  it('calls new fetching with proper arguments (etag exists)', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStoreETags));
    window.fetch = jest.fn(
      () => Promise.resolve({
        ok: true,
        json: () => Promise.resolve('data'),
        headers: {
          get: (arg) => {
            if (arg === 'ETag') {
              return rETag;
            } else if (arg === 'Link') {
              return '<https://path/name?page=3>; rel="next"'
            }
          }
        }
      })
    );
    helpers.rDisplayArgs = jest.fn(helpers.rDisplayArgs);

    fetchData(rUrl, rETag, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', etag: rETag, index: 1, type: rActionTypes.SUCCESS });
      expect(dispatch.mock.calls[2][0]).toBeInstanceOf(Function);
      expect(helpers.rDisplayArgs.mock.calls[0]).toEqual(['https://path/name?page=3', 'c', rActionTypes]);
    });
  });

  it('calls new fetching with proper arguments (etag doesn\'t exist)', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(
      () => Promise.resolve({
        ok: true,
        json: () => Promise.resolve('data'),
        headers: {
          get: (arg) => {
            if (arg === 'ETag') {
              return rETag;
            } else if (arg === 'Link') {
              return '<https://path/name?page=3>; rel="next"'
            }
          }
        }
      })
    );
    helpers.rDisplayArgs = jest.fn(helpers.rDisplayArgs);

    fetchData(rUrl, rETag, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', etag: rETag, index: 1, type: rActionTypes.SUCCESS });
      expect(dispatch.mock.calls[2][0]).toBeInstanceOf(Function);
      expect(helpers.rDisplayArgs.mock.calls[0]).toEqual(['https://path/name?page=3', undefined, rActionTypes]);
    });
  });

  it('dispatches TRIM action after getting one page of results', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStorePages));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return undefined;
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ type: rActionTypes.CLEAR });
      expect(dispatch.mock.calls[2][0]).toEqual({ data: 'data', etag: rETag, index: 0, type: rActionTypes.SUCCESS });
      expect(dispatch.mock.calls[3][0]).toEqual({ index: 1, type: rActionTypes.TRIM });
    });
  });

  it('dispatches TRIM action after getting last page of results', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStorePages));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return '<https://path?page=2>; rel="prev"'
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', etag: rETag, index: 2, type: rActionTypes.SUCCESS });
      expect(dispatch.mock.calls[2][0]).toEqual({ index: 3, type: rActionTypes.TRIM });
    });
  });

  it('dispatches FAIL action when promise value wasn\'t returned', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve({}));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Connection error', type: rActionTypes.FAIL }]);
    });
  });

  it('dispatches FAIL action when there\'s no proper json response', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.reject({ message: 'Malformed JSON response' }),
      headers: {
        get: (arg) => {
          if (arg === 'ETag') {
            return rETag;
          } else if (arg === 'Link') {
            return undefined;
          }
        }
      }
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Malformed JSON response', type: rActionTypes.FAIL }]);
    });
  });

  it('dispatches FAIL action when promise was rejected', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStore));
    window.fetch = jest.fn(() => Promise.reject({ message: 'Not Found' }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Not Found', type: rActionTypes.FAIL }]);
    });
  });

  it('dispatches FAIL action when there\'s no new data (one page of data)', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStorePage));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ type: rActionTypes.REFRESH }]);
      expect(dispatch.mock.calls[2]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

  it('dispatches FAIL action when there\'s no new data (multiples pages of data', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStoreETags));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    fetchData(rUrl, undefined, rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toBeInstanceOf(Function);
      expect(dispatch.mock.calls[2]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

  it('checks second page of results for new data', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStoreETags));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    helpers.rDisplayArgs = jest.fn(helpers.rDisplayArgs);

    fetchData(rUrl, 'a', rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toBeInstanceOf(Function);
      expect(helpers.rDisplayArgs.mock.calls[0]).toEqual(['https://path/name?page=2', 'b', rActionTypes]);
      expect(dispatch.mock.calls[2]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

  it('checks another page of results for new data', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStoreETags));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    helpers.rDisplayArgs = jest.fn(helpers.rDisplayArgs);

    fetchData(rUrl + '?page=3', 'c', rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toBeInstanceOf(Function);
      expect(helpers.rDisplayArgs.mock.calls[0]).toEqual(['https://path/name?page=4', 'd', rActionTypes]);
      expect(dispatch.mock.calls[2]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

  it('doesn\'t check second page when there\'s only one page of results', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStorePage));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    helpers.rDisplayArgs = jest.fn(helpers.rDisplayArgs);

    fetchData(rUrl, 'a', rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ type: rActionTypes.REFRESH }]);
      expect(helpers.rDisplayArgs.mock.calls[0]).toBeUndefined();
      expect(dispatch.mock.calls[2]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

  it('doesn\'t check for new data after last page of results', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStoreETags));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    helpers.rDisplayArgs = jest.fn(helpers.rDisplayArgs);

    fetchData(rUrl + '?page=4', 'd', rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[2]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

  it('dispatches TRIM action after checking for updates', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => (rStoreETags));
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    helpers.rDisplayArgs = jest.fn(helpers.rDisplayArgs);

    fetchData(rUrl + '?page=4', 'd', rActionTypes)(dispatch, getState).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ index: 5, type: rActionTypes.TRIM });
      expect(dispatch.mock.calls[2]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

});
