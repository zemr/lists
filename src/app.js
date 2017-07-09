import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from './people/people-reducer';
import { storageAvailable } from './utils/storage';
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
      <div>
        <People />
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    fetchPeople: (url, modified) => dispatch(fetchPeople(url, modified))
  })
)(App)
