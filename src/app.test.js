import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from './utils/test-helpers';
import * as storage from './utils/storage';
import ConnectedApp, { App } from './app';

jest.mock('./people/people', () => 'People');

describe('app', () => {

  it('calls function to fetch data (localStorage available)', () => {
    const mockFn = jest.fn();

    // setting up proper getItem value
    localStorage.getItem();
    localStorage.getItem();

    // third call ("null" value)
    TestUtils.renderIntoDocument(<App fetchPeople={mockFn} />);
    expect(mockFn).toHaveBeenCalled();

    // fourth call (data)
    TestUtils.renderIntoDocument(<App fetchPeople={mockFn} />);
    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[1].length).toBe(2);
    mockFn.mockClear();
  });

  it('calls function to fetch data (localStorage not available)', () => {
    const mockFn = jest.fn();
    //noinspection JSAnnotator
    storage.storageAvailable = jest.fn(() => false);
    TestUtils.renderIntoDocument(<App fetchPeople={mockFn} />);
    expect(mockFn.mock.calls[0].length).toBe(1);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      (
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      ), div);
  });

});