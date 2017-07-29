import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { peopleData, store } from '../../utils/test-helpers';
import ConnectedPeople from '../people';

describe('people', () => {

  it('renders without crashing (connected)', () => {
    TestUtils.renderIntoDocument(
      (
        <Provider store={store}>
          <ConnectedPeople
            data={peopleData}
            type="contributors"
            url=""
            etag=""
          />
        </Provider>
      )
    );

    TestUtils.renderIntoDocument(
      (
        <Provider store={store}>
          <ConnectedPeople
            data={peopleData}
            type="subscribers"
            url=""
            etag=""
          />
        </Provider>
      )
    );
  });

});
