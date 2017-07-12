import reducer, { actionTypes, fetchContributors } from './contributors-reducer';
import store from '../store';
import { peopleData, rDate, rUrl } from '../utils/test-helpers';
import * as reducers from '../utils/reducers';

describe('contributors-reducer', () => {

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
        store.dispatch({ type: actionTypes.BEGIN })
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
        store.dispatch({ data: [{"id": 8, "login": "eight"}], modified: rDate, type: actionTypes.SUCCESS })
      )
    ).toEqual(
      reducer({
        data: [{}, {"id": 8, "login": "eight"}],
        modified: rDate,
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
        store.dispatch({ error: 'Malformed JSON response', type: actionTypes.FAIL })
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
          modified: rDate,
          fetching: false,
          error: null
        },
        store.dispatch({ type: actionTypes.CLEAR })
      )
    ).toEqual(
      reducer({
        data: [],
        modified: rDate,
        fetching: false,
        error: null
      })
    )
  });

  it('calls fetching function with proper arguments', () => {
    const dispatch = jest.fn();
    //noinspection JSAnnotator
    reducers.fetchPeople = jest.fn((arg1, arg2, arg3) => { return [arg1, arg2, arg3]; });
    fetchContributors(rUrl, rDate)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0]).toEqual([rUrl, rDate, actionTypes])
  })

});
