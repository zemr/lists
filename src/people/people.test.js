import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { Wrapper, peopleData, store } from '../utils/test-helpers';
import * as storage from '../utils/storage';
import ConnectedPeople, { People } from './people';

describe('people', () => {

  it('calls function to fetch data (localStorage available)', () => {
    const mockFn = jest.fn();

    // setting up proper getItem value
    localStorage.getItem();
    localStorage.getItem();

    // third call ("null" value)
    TestUtils.renderIntoDocument(
      <People contributors={peopleData} type="contributors" fetchContributors={mockFn} />
    );
    expect(mockFn).toHaveBeenCalled();

    // fourth call (data)
    TestUtils.renderIntoDocument(
      <People contributors={peopleData} type="contributors" fetchContributors={mockFn} />
    );
    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[1].length).toBe(2);
    expect(mockFn.mock.calls[0][0]).toBe('https://api.github.com/repos/reactjs/react-redux/contributors');
    mockFn.mockClear();
  });

  it('calls function to fetch data (localStorage not available)', () => {
    const mockFn = jest.fn();
    //noinspection JSAnnotator
    storage.storageAvailable = jest.fn(() => false);
    TestUtils.renderIntoDocument(
      <People contributors={peopleData} type="contributors" fetchContributors={mockFn} />
    );
    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe('https://api.github.com/repos/reactjs/react-redux/contributors');
  });

  it('renders list', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <Wrapper>
        <People contributors={peopleData} type="contributors" fetchContributors={() => {}}/>
      </Wrapper>
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(peopleList, 'person');
    expect(divs.length).toBe(3);
  });

  it('doesn\'t render list when there is no data', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <Wrapper>
        <People contributors={[]} type="contributors" fetchContributors={() => {}} />
      </Wrapper>
    );

    const mainDiv = TestUtils.findRenderedDOMComponentWithClass(peopleList, 'people');
    expect(mainDiv.textContent).toBe('Fetching data');
  });

  it('renders without crashing (connected)', () => {
    TestUtils.renderIntoDocument(
      (
        <Provider store={store}>
          <ConnectedPeople contributors={peopleData} type="contributors" fetchContributors={() => {}} />
        </Provider>
      )
    )
  });

});
