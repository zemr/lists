import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { Home } from '../home';

describe('home', () => {
  const mockFn = jest.fn();
  const div = document.createElement('div');
  document.documentElement.appendChild(div);
  const instance = ReactDOM.render(<Home repo="" setRepository={mockFn} />, div);

  it('handles input changes', () => {
    expect(instance.state).toEqual({
      owner: '',
      repo: '',
      login: '',
      password: ''
    });

    instance.handleChange({
      target: { name: 'owner', value: 'one' }
    });

    instance.handleChange({
      target: { name: 'repo', value: 'two' }
    });

    instance.handleChange({
      target: { name: 'login', value: 'three' }
    });

    instance.handleChange({
      target: { name: 'password', value: 'four' }
    });

    expect(instance.state).toEqual({
      owner: 'one',
      repo: 'two',
      login: 'three',
      password: 'four'
    });
  });

  it('handles submit event', () => {
    instance.handleSubmit({ preventDefault: () => {}});
    expect(mockFn.mock.calls[0][0]).toBe('https://api.github.com/repos/one/two/');
    expect(mockFn.mock.calls[0][1]).toBe('dGhyZWU6Zm91cg==');
    expect(mockFn.mock.calls[0][2]).toBe('https://github.com/one/two');

    expect(instance.state).toEqual({
      owner: '',
      repo: '',
      login: '',
      password: ''
    });
  });

  it('generates inputs', () => {
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
    expect(inputs.length).toBe(5);
  });

  it('displays default repository url', () => {
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    expect(divs[3].textContent).toBe('Default repository: github.com/reactjs/react-redux');
  });

  it('displays setted repository url', () => {
    const home = TestUtils.renderIntoDocument(
      <Home repo="https://path" setRepository={() => {}} />
    );
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(home, 'div');
    expect(divs[3].textContent).toBe('Setted repository: https://path');
  });

});
