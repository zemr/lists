import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { Wrapper, peopleData, store } from '../utils/test-helpers';
import ConnectedPeople, { People } from './people';

describe('people', () => {

  it('renders list', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <Wrapper>
        <People people={peopleData} />
      </Wrapper>
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(peopleList, 'person');
    expect(divs.length).toBe(3);
  });

  it('doesn\'t render list when there is no data', () => {
    const peopleList = TestUtils.renderIntoDocument(
      <Wrapper>
        <People people={[]} />
      </Wrapper>
    );

    const mainDiv = TestUtils.scryRenderedDOMComponentsWithTag(peopleList, 'div');
    const divs = TestUtils.scryRenderedDOMComponentsWithClass(peopleList, 'person');
    expect(mainDiv.length).toBe(1);
    expect(divs.length).toBe(0);
  });

  it('renders without crashing (connected)', () => {
    TestUtils.renderIntoDocument(
      (
        <Provider store={store}>
          <ConnectedPeople />
        </Provider>
      )
    )
  });

});
