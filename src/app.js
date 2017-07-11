import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import People from './people/people';

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <Sidebar />

          <div style={{ flex: 1, backgroundColor: 'PeachPuff' }}>
            <Route exact path="/" component={() => <h2>Home</h2>} />
            <Route path="/contributors" render={() => <People type="contributors" />} />
            <Route path="/subscribers" render={() => <People type="subscribers" />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
