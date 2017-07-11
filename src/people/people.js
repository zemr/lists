import React from 'react';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils/storage';
import { fetchContributors } from '../people/contributors-reducer';
import { fetchSubscribers } from '../people/subscribers-reducer';

export class People extends React.Component {
  componentWillMount() {
    let url, date, fnName;
    if (this.props.type === "contributors") {
      url = 'https://api.github.com/repos/reactjs/react-redux/contributors';
      date = 'contributorsDate';
      fnName = 'fetchContributors';
    } else if (this.props.type === "subscribers") {
      url = 'https://api.github.com/repos/reactjs/react-redux/subscribers';
      date = 'subscribersDate';
      fnName = 'fetchSubscribers';
    }

    if (storageAvailable()) {
      if (!localStorage.getItem('state') || !localStorage.getItem(date)) {
        this.props[fnName](url);
      } else if (localStorage.getItem(date)) {
        const modified = JSON.parse(localStorage.getItem(date));
        this.props[fnName](url, modified);
      }
    } else {
      this.props[fnName](url);
    }
  }

  render() {
    const { contributors, subscribers, type } = this.props;
    let content;

    if (contributors.length === 0) {
      content = 'Fetching data';
    } else if (type === "contributors") {
      content = (
        <div>
          {
            contributors.map(person => (
              <div className="person" key={person.id}>{person.login}</div>
            ))
          }
        </div>
      );
    } else if (type === "subscribers") {
      content = (
        <div>
          <h2>Subscribers</h2>
          {
            subscribers.map(person => (
              <div className="person" key={person.id}>{person.login}</div>
            ))
          }
        </div>
      );
    }

    return (
    <div className="people">
      {content}
    </div>
    )
  }
}

export default connect(
  state => ({
    contributors: state.contributors.data,
    subscribers: state.subscribers.data
  }),
  dispatch => ({
    fetchContributors: (url, modified) => dispatch(fetchContributors(url, modified)),
    fetchSubscribers: (url, modified) => dispatch(fetchSubscribers(url, modified))
  })
)(People)
