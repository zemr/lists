import { fetchPeople } from './reducers';
import { rDate, rUrl, rInitObject, rActionTypes } from './test-helpers';

describe('reducers', () => {

  it('dispatches BEGIN action', () => {
    const dispatch = jest.fn();
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
  });

  it('starts fetching', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve());
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch);
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toBe(rUrl);
    expect(fetch.mock.calls[0][1]).toEqual({});

    fetchPeople(rUrl, rDate, rActionTypes)(dispatch);
    expect(fetch.mock.calls[1][0]).toBe(rUrl);
    expect(fetch.mock.calls[1][1]).toEqual(rInitObject);
  });

  it('dispatches SUCCESS action', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('data'),
      headers: {
        get: (arg) => {
          if (arg === 'Last-Modified') {
            return rDate;
          } else if (arg === 'Link') {
            return '<https://path?page=3>; rel="next"'
          }
        }
      }
    }));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', modified: rDate, type: rActionTypes.SUCCESS });
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
            return rDate;
          } else if (arg === 'Link') {
            return undefined;
          }
        }
      }
    }));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ type: rActionTypes.CLEAR });
      expect(dispatch.mock.calls[2][0]).toEqual({ data: 'data', modified: rDate, type: rActionTypes.SUCCESS });
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
            return rDate;
          } else if (arg === 'Link') {
            return '<https://path?page=2>; rel="next"'
          }
        }
      }
    }));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ type: rActionTypes.CLEAR });
      expect(dispatch.mock.calls[2][0]).toEqual({ data: 'data', modified: rDate, type: rActionTypes.SUCCESS });
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
            return rDate;
          } else if (arg === 'Link') {
            return '<https://path?page=3>; rel="next"'
          }
        }
      }
    }));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1][0]).toEqual({ data: 'data', modified: rDate, type: rActionTypes.SUCCESS });
      expect(dispatch.mock.calls[2][0]).toBeInstanceOf(Function);
    });
  });

  it('dispatches FAIL action when promise value wasn\'t returned', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({}));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Connection error', type: rActionTypes.FAIL }]);
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
            return rDate;
          } else if (arg === 'Link') {
            return undefined;
          }
        }
      }
    }));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Malformed JSON response', type: rActionTypes.FAIL }]);
    });
  });

  it('dispatches FAIL action when promise was rejected', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.reject({ message: 'Not Found' }));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Not Found', type: rActionTypes.FAIL }]);
    });
  });

  it('dispatches FAIL action when there\'s no new data', () => {
    const dispatch = jest.fn();
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 304,
      statusText: 'Not Modified'
    }));
    fetchPeople(rUrl, undefined, rActionTypes)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0]).toEqual({ type: rActionTypes.BEGIN });
      expect(dispatch.mock.calls[1]).toEqual([{ error: 'Not Modified', type: rActionTypes.FAIL }]);
    });
  });

});
