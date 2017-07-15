import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { peopleData } from '../utils/test-helpers';
import * as storage from '../utils/storage';
import { People } from './people';

describe('people: subscribers', () => {

  it('calls function to fetch data (localStorage available)', () => {
    const mockFn = jest.fn();

    // setting up proper getItem value
    localStorage.getItem();
    localStorage.getItem();

    // third call ("null" value)
    TestUtils.renderIntoDocument(
      <People
        contributors={[]}
        subscribers={peopleData}
        type="subscribers"
        fetchContributors={() => {}}
        fetchSubscribers={mockFn}
      />
    );
    expect(mockFn).toHaveBeenCalled();

    // setting up proper getItem value
    localStorage.getItem();

    // fifth-eighth calls (some values)
    TestUtils.renderIntoDocument(
      <People
        contributors={[]}
        subscribers={peopleData}
        type="subscribers"
        fetchContributors={() => {}}
        fetchSubscribers={mockFn}
      />
    );

    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[1].length).toBe(2);
    expect(mockFn.mock.calls[1][0]).toBe('https://api.github.com/repos/reactjs/react-redux/subscribers');
    expect(mockFn.mock.calls[1][1]).toBe('etagValue');
  });

  it('calls function to fetch data (localStorage not available)', () => {
    const mockFn = jest.fn();
    const storageSpy = jest.spyOn(storage, 'storageAvailable').mockImplementation(() => false);
    TestUtils.renderIntoDocument(
      <People
        contributors={[]}
        subscribers={peopleData}
        type="subscribers"
        fetchContributors={() => {}}
        fetchSubscribers={mockFn}
      />
    );
    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe('https://api.github.com/repos/reactjs/react-redux/subscribers');
    storageSpy.mockRestore();
  });

  it('renders list', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <People
        contributors={[]}
        subscribers={peopleData}
        type="subscribers"
        fetchContributors={() => {}}
        fetchSubscribers={() => {}}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithClass(peopleList, 'person');
    expect(divs.length).toBe(3);
  });

  it('doesn\'t render list when there is no data', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <People
        contributors={[]}
        subscribers={[]}
        type="subscribers"
        fetchContributors={() => {}}
        fetchSubscribers={() => {}}
      />
    );
    const mainDiv = TestUtils.findRenderedDOMComponentWithClass(peopleList, 'people');
    expect(mainDiv.textContent).toBe('Fetching data');
  });

});
