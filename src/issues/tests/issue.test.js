import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { issueDetails } from '../../utils/test-helpers';
import Issue from '../issue';

describe('issue', () => {

  it('renders properly', () => {
    const issue = TestUtils.renderIntoDocument(<Issue details={issueDetails} />);

    const spans = TestUtils.scryRenderedDOMComponentsWithTag(issue, 'span');
    expect(spans.length).toBe(3);
    expect(spans[0].textContent).toBe('20-06-2017');
    expect(spans[1].textContent).toBe(' | ');
    expect(spans[2].textContent).toBe('author');

    const divs = TestUtils.scryRenderedDOMComponentsWithTag(issue, 'div');
    expect(divs.length).toBe(4);
    expect(divs[2].textContent).toBe('issue title');
    expect(divs[3].textContent).toBe('');
  });

  it('toggles issue content', () => {
    const issue = TestUtils.renderIntoDocument(<Issue details={issueDetails} />);
    const divs1 = TestUtils.scryRenderedDOMComponentsWithTag(issue, 'div');
    expect(divs1[3].textContent).toBe('');

    TestUtils.Simulate.click(divs1[0]);
    const divs2 = TestUtils.scryRenderedDOMComponentsWithTag(issue, 'div');
    expect(divs2[3].textContent).toBe('issue body');

    TestUtils.Simulate.click(divs2[0]);
    const divs3 = TestUtils.scryRenderedDOMComponentsWithTag(issue, 'div');
    expect(divs3[3].textContent).toBe('');
  });

  it('toggles state value', () => {
    const div = document.createElement('div');
    document.documentElement.appendChild(div);
    const instance = ReactDOM.render(<Issue details={issueDetails} />, div);

    expect(instance.state.showContent).toBeFalsy();
    instance.toggleContent();
    expect(instance.state.showContent).toBeTruthy();
    instance.toggleContent();
    expect(instance.state.showContent).toBeFalsy();
  });

});
