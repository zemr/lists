import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import ConnectedPagination, { Pagination } from './pagination';
import { Child, paginationData, store } from '../utils/test-helpers';

describe('pagination', () => {

  it('prepares data (flattens two-dimensional array)', () => {
    const pagination = TestUtils.renderIntoDocument(
      <Pagination
        type="contributors"
        perPage={10}
        contributors={[]}
        subscribers={[]}
      >
        <Child />
      </Pagination>
    );
    const toFlatten = [[{id: 7, login: 'seven'}, {id: 8, login: 'eight'}], [{id: 9, login: 'nine'}]];
    const flat = pagination.flattenArrays(toFlatten);
    expect(flat).toEqual([{id: 7, login: 'seven'}, {id: 8, login: 'eight'}, {id: 9, login: 'nine'}]);
  });

  it('prepares data chunk', () => {
    const pagination = TestUtils.renderIntoDocument(
      <Pagination
        type="contributors"
        perPage={2}
        contributors={paginationData}
        subscribers={[]}
      >
        <Child />
      </Pagination>
    );
    const chunk = pagination.createDataChunk();
    expect(chunk.length).toBe(2);

    const pagination2 = TestUtils.renderIntoDocument(
      <Pagination
        type="subscribers"
        perPage={5}
        contributors={[]}
        subscribers={paginationData}
      >
        <Child />
      </Pagination>
    );
    const chunk2 = pagination2.createDataChunk();
    expect(chunk2.length).toBe(3);
  });

  it('creates page switches', () => {
    const pagination = TestUtils.renderIntoDocument(
      <Pagination
        type="contributors"
        perPage={2}
        contributors={paginationData}
        subscribers={[]}
      >
        <Child />
      </Pagination>
    );
    const pages = pagination.createSwitches();
    expect(pages.length).toBe(2);

    const pagination2 = TestUtils.renderIntoDocument(
      <Pagination
        type="subscribers"
        perPage={1}
        contributors={[]}
        subscribers={paginationData}
      >
        <Child />
      </Pagination>
    );
    const pages2 = pagination2.createSwitches();
    expect(pages2.length).toBe(3);

    const pagination3 = TestUtils.renderIntoDocument(
      <Pagination
        type="subscribers"
        perPage={1}
        contributors={[]}
        subscribers={[]}
      >
        <Child />
      </Pagination>
    );
    const pages3 = pagination3.createSwitches();
    expect(pages3.length).toBe(0);
  });

  it('sets page count', () => {
    const div = document.createElement('div');
    document.documentElement.appendChild(div);
    const instance = ReactDOM.render(
      <Pagination
        type="contributors"
        perPage={5}
        contributors={paginationData}
        subscribers={[]}
      >
        <Child />
      </Pagination>
      , div
    );
    expect(instance.state).toEqual({ pages: 1, currentPage: 1 });

    ReactDOM.render(
      <Pagination
        type="subscribers"
        perPage={5}
        contributors={[]}
        subscribers={[]}
      >
        <Child />
      </Pagination>
      , div
    );
    expect(instance.state).toEqual({ pages: 0, currentPage: 1 });

    document.documentElement.removeChild(div);
  });

  it('sets current page value', () => {
    const div = document.createElement('div');
    document.documentElement.appendChild(div);
    const instance = ReactDOM.render(
      <Pagination
        type="contributors"
        perPage={2}
        contributors={paginationData}
        subscribers={[]}
      >
        <Child />
      </Pagination>
      , div
    );
    expect(instance.state).toEqual({ pages: 2, currentPage: 1 });

    const pages = document.documentElement.querySelectorAll('div[aria-label]');
    TestUtils.Simulate.click(pages[1]);
    expect(instance.state).toEqual({ pages: 2, currentPage: 2 });

    document.documentElement.removeChild(div);
  });

  it('marks current page in pagination', () => {
    const div = document.createElement('div');
    document.documentElement.appendChild(div);
    ReactDOM.render(
      <Pagination
        type="contributors"
        perPage={2}
        contributors={paginationData}
        subscribers={[]}
      >
        <Child />
      </Pagination>
      , div
    );

    let pages = document.documentElement.querySelectorAll('div[aria-label]');
    let firstPage = pages[0].outerHTML;
    expect(firstPage.indexOf('aria-selected="true"') > 0).toBeTruthy();

    TestUtils.Simulate.click(pages[1]);
    pages = document.documentElement.querySelectorAll('div[aria-label]');
    firstPage = pages[0].outerHTML;
    let secondPage = pages[1].outerHTML;
    expect(firstPage.indexOf('aria-selected="true"') > 0).toBeFalsy();
    expect(secondPage.indexOf('aria-selected="true"') > 0).toBeTruthy();
  });

  it('renders without crashing (connected)', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      (
        <Provider store={store}>
          <ConnectedPagination
            type="contributors"
            perPage={10}
          >
            <Child />
          </ConnectedPagination>
        </Provider>
      ), div);

    ReactDOM.render(
      (
        <Provider store={store}>
          <ConnectedPagination
            type="subscribers"
            perPage={10}
          >
            <Child />
          </ConnectedPagination>
        </Provider>
      ), div)
  });

});
