import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchPeople } from './people/people-reducer';
import { storageAvailable } from './utils/storage';
import Sidebar from './sidebar/sidebar';
import People from './people/people';

export class App extends React.Component {
  componentWillMount() {
    const url = 'https://api.github.com/repos/reactjs/react-redux/contributors';
    if (storageAvailable()) {
      if (!localStorage.getItem('state')) {
        this.props.fetchPeople(url);
      } else if (localStorage.getItem('date')) {
        const modified = JSON.parse(localStorage.getItem('date'));
        this.props.fetchPeople(url, modified);
      }
    } else {
      this.props.fetchPeople(url);
    }
  }

  render() {
    return (
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />

          <div style={{ flex: 1, backgroundColor: 'PeachPuff' }}>
            <Route exact path="/" component={() => <h2>Home</h2>} />
            <Route path="/people" component={People} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    fetchPeople: (url, modified) => dispatch(fetchPeople(url, modified))
  })
)(App)
