import reducer, { actionTypes, fetchContributors } from './contributors-reducer';
import store from '../store';
import { peopleData, rETag, rUrl } from '../utils/test-helpers';
import * as reducers from '../utils/reducers';

describe('contributors-reducer', () => {

  it('returns initial state', () => {
    expect(reducer()).toEqual(
      {
        data: [],
        etag: [],
        fetching: false,
        error: []
      }
    )
  });

  it('marks the beginning of data fetching', () => {
    expect(
      reducer(
        {
          data: [],
          etag: [],
          fetching: false,
          error: []
        },
        store.dispatch({ type: actionTypes.BEGIN })
      )
    ).toEqual(
      reducer({
        data: [],
        etag: [],
        fetching: true,
        error: []
      })
    )
  });

  it('saves fetched data', () => {
    expect(
      reducer(
        {
          data: [[], []],
          etag: ['', ''],
          fetching: true,
          error: []
        },
        store.dispatch({ data: [{"id": 8, "login": "eight"}], etag: rETag, index: 1, type: actionTypes.SUCCESS })
      )
    ).toEqual(
      reducer({
        data: [[], [{"id": 8, "login": "eight"}]],
        etag: ['', rETag],
        fetching: false,
        error: []
      })
    )
  });

  it('saves error message', () => {
    expect(
      reducer(
        {
          data: [],
          etag: [],
          fetching: true,
          error: ['']
        },
        store.dispatch({ error: 'Malformed JSON response', type: actionTypes.FAIL })
      )
    ).toEqual(
      reducer({
        data: [],
        etag: [],
        fetching: false,
        error: ['', 'Malformed JSON response']
      })
    )
  });

  it('clears state and errors', () => {
    expect(
      reducer(
        {
          data: [peopleData],
          etag: [rETag],
          fetching: false,
          error: ['Connection error']
        },
        store.dispatch({ type: actionTypes.CLEAR })
      )
    ).toEqual(
      reducer({
        data: [],
        etag: [rETag],
        fetching: false,
        error: []
      })
    )
  });

  it('calls fetching function with proper arguments', () => {
    const dispatch = jest.fn();
    //noinspection JSAnnotator
    reducers.fetchPeople = jest.fn((arg1, arg2, arg3) => { return [arg1, arg2, arg3]; });
    fetchContributors(rUrl, rETag)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual([rUrl, rETag, actionTypes])
  })

});
