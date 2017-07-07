import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from './people/people-reducer';
import People from './people/people';

class App extends React.Component {
  componentWillMount() {
    if (!localStorage.getItem('state')) {
      this.props.fetchPeople('https://api.github.com/repos/reactjs/react-redux/contributors');
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
    fetchPeople: (url) => dispatch(fetchPeople(url))
  })
)(App)
