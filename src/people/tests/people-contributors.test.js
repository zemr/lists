import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { peopleData } from '../../utils/test-helpers';
import * as storage from '../../utils/storage';
import { People } from '../people';

describe('people: contributors', () => {

  it('calls function to fetch data (localStorage available)', () => {
    const mockFn = jest.fn();

    // setting up proper getItem value
    localStorage.getItem();
    localStorage.getItem();

    // third call ("null" value)
    TestUtils.renderIntoDocument(
      <People
        data={peopleData}
        type="contributors"
        url=""
        etag=""
        fetchContributors={mockFn}
        fetchSubscribers={() => {}}
      />
    );
    expect(mockFn).toHaveBeenCalled();

    // setting up proper getItem value
    localStorage.getItem();

    // fifth-eighth calls (some values)
    TestUtils.renderIntoDocument(
      <People
        data={peopleData}
        type="contributors"
        url=""
        etag="abc"
        fetchContributors={mockFn}
        fetchSubscribers={() => {}}
      />
    );

    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[1].length).toBe(2);
    expect(mockFn.mock.calls[1][0]).toBe('https://api.github.com/repos/reactjs/react-redux/contributors');
    expect(mockFn.mock.calls[1][1]).toBe('abc');
  });

  it('calls function to fetch data (localStorage not available)', () => {
    const mockFn = jest.fn();
    //noinspection JSAnnotator
    storage.storageAvailable = jest.fn(() => false);
    TestUtils.renderIntoDocument(
      <People
        data={peopleData}
        type="contributors"
        url=""
        etag=""
        fetchContributors={mockFn}
        fetchSubscribers={() => {}}
      />
    );
    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe('https://api.github.com/repos/reactjs/react-redux/contributors');
  });

  it('sets custom url', () => {
    const mockFn = jest.fn();
    //noinspection JSAnnotator
    storage.storageAvailable = jest.fn(() => false);
    TestUtils.renderIntoDocument(
      <People
        data={peopleData}
        type="contributors"
        url="https://path/"
        etag=""
        fetchContributors={mockFn}
        fetchSubscribers={() => {}}
      />
    );
    expect(mockFn.mock.calls[0][0]).toBe('https://path/contributors');
  });

  it('renders list', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <People
        data={peopleData}
        type="contributors"
        url=""
        etag=""
        fetchContributors={() => {}}
        fetchSubscribers={() => {}}
      />
    );
    const spans = TestUtils.scryRenderedDOMComponentsWithTag(peopleList, 'span');
    expect(spans.length).toBe(6);
  });

  it('doesn\'t render list when there is no data', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <People
        data={[]}
        type="contributors"
        url=""
        etag=""
        fetchContributors={() => {}}
        fetchSubscribers={() => {}}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(peopleList, 'div');
    const loader = divs[1].outerHTML;
    expect(loader.indexOf('Fetching data') > 0).toBeTruthy();
  });

});
