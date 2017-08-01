import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { issuesData, store } from '../../utils/test-helpers';
import * as storage from '../../utils/storage';
import ConnectedIssues, { Issues } from '../issues';

jest.mock('../issue', () => {
  const Issue = (props) => (<div>{props.details.title}</div>);
  return Issue;
});

describe('issues', () => {

  it('calls function to fetch data (localStorage available)', () => {
    const mockFn = jest.fn();

    // setting up proper getItem value
    localStorage.getItem();
    localStorage.getItem();

    // third call ("null" value)
    TestUtils.renderIntoDocument(
      <Issues
        data={issuesData}
        url=""
        etag=""
        result={true}
        fetchIssues={mockFn}
      />
    );
    expect(mockFn).toHaveBeenCalled();

    // setting up proper getItem value
    localStorage.getItem();

    // fifth-eighth calls (some values)
    TestUtils.renderIntoDocument(
      <Issues
        data={issuesData}
        url=""
        etag="abc"
        result={true}
        fetchIssues={mockFn}
      />
    );

    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[1].length).toBe(2);
    expect(mockFn.mock.calls[1][0]).toBe('https://api.github.com/repos/reactjs/react-redux/issues');
    expect(mockFn.mock.calls[1][1]).toBe('abc');
  });

  it('calls function to fetch data (localStorage not available)', () => {
    const mockFn = jest.fn();
    //noinspection JSAnnotator
    storage.storageAvailable = jest.fn(() => false);
    TestUtils.renderIntoDocument(
      <Issues
        data={issuesData}
        url=""
        etag=""
        result={true}
        fetchIssues={mockFn}
      />
    );
    expect(mockFn.mock.calls[0].length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toBe('https://api.github.com/repos/reactjs/react-redux/issues');
  });

  it('sets custom url', () => {
    const mockFn = jest.fn();
    //noinspection JSAnnotator
    storage.storageAvailable = jest.fn(() => false);
    TestUtils.renderIntoDocument(
      <Issues
        data={issuesData}
        url="https://path/"
        etag=""
        result={true}
        fetchIssues={mockFn}
      />
    );
    expect(mockFn.mock.calls[0][0]).toBe('https://path/issues');
  });

  it('renders list', () => {
    const issuesList = TestUtils.renderIntoDocument(
      <Issues
        data={issuesData}
        url=""
        etag=""
        result={true}
        fetchIssues={() => {}}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(issuesList, 'div');
    expect(divs[2].textContent).toBe('seven');
    expect(divs[3].textContent).toBe('eight');
    expect(divs[4].textContent).toBe('nine');
  });

  it('renders loading animation', () => {
    const issuesList = TestUtils.renderIntoDocument(
      <Issues
        data={[]}
        url=""
        etag=""
        result={true}
        fetchIssues={() => {}}
      />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(issuesList, 'div');
    const loader = divs[1].outerHTML;
    expect(loader.indexOf('Fetching data') > 0).toBeTruthy();
  });

  it('renders message when there is no data', () => {
    const issuesList = TestUtils.renderIntoDocument(
      <Issues
        data={[]}
        url=""
        etag=""
        result={false}
        fetchIssues={() => {}}
      />
    );
    const span = TestUtils.findRenderedDOMComponentWithTag(issuesList, 'span');
    expect(span.textContent).toBe('There aren\'t any open issues for this repository.');
  });

  it('renders without crashing (connected, no subcomponents)', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      (
        <Provider store={store}>
          <ConnectedIssues data={issuesData} url="" etag="" result={true} />
        </Provider>
      ), div);
  });

});
