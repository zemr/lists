import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './utils/test-helpers';
import ConnectedApp from './app';

describe('app', () => {

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
