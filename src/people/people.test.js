import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { peopleData, store } from '../utils/test-helpers';
import ConnectedPeople, { People } from './people';

describe('people', () => {

  it('prepares data (flattens two-dimensional array)', () => {
    const peopleList = TestUtils.renderIntoDocument(
        <People
          contributors={[]}
          subscribers={[]}
          type="contributors"
          fetchContributors={() => {}}
          fetchSubscribers={() => {}}
        />
    );
    const toFlatten = [[{id: 7, login: 'seven'}, {id: 8, login: 'eight'}], [{id: 9, login: 'nine'}]];
    const flat = peopleList.flattenArrays(toFlatten);
    expect(flat).toEqual([{id: 7, login: 'seven'}, {id: 8, login: 'eight'}, {id: 9, login: 'nine'}]);
  });

  it('renders without crashing (connected)', () => {
    TestUtils.renderIntoDocument(
      (
        <Provider store={store}>
          <ConnectedPeople
            contributors={peopleData}
            subscribers={[]}
            type="contributors"
            fetchContributors={() => {}}
            fetchSubscribers={() => {}}
          />
        </Provider>
      )
    );

    TestUtils.renderIntoDocument(
      (
        <Provider store={store}>
          <ConnectedPeople
            contributors={[]}
            subscribers={peopleData}
            type="subscribers"
            fetchContributors={() => {}}
            fetchSubscribers={() => {}}
          />
        </Provider>
      )
    );
  });

});
