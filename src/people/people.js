import React from 'react';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils/storage';
import { fetchContributors } from '../people/contributors-reducer';
import { fetchSubscribers } from '../people/subscribers-reducer';

export class People extends React.Component {
  componentWillMount() {
    let url, etags, fnName;
    if (this.props.type === "contributors") {
      url = 'https://api.github.com/repos/reactjs/react-redux/contributors';
      etags = 'etagContributors';
      fnName = 'fetchContributors';
    } else if (this.props.type === "subscribers") {
      url = 'https://api.github.com/repos/reactjs/react-redux/subscribers';
      etags = 'etagSubscribers';
      fnName = 'fetchSubscribers';
    }

    if (storageAvailable()) {
      if (!localStorage.getItem('state') || !localStorage.getItem(etags)) {
        this.props[fnName](url);
      } else if (localStorage.getItem(etags)) {
        const etag = JSON.parse(localStorage.getItem(etags));
        this.props[fnName](url, etag[0]);
      }
    } else {
      this.props[fnName](url);
    }
  }

  flattenArrays(array) {
    return [].concat.apply([], array);
  }

  render() {
    let { contributors, subscribers, type } = this.props;
    let content;

    contributors = this.flattenArrays(contributors);
    subscribers = this.flattenArrays(subscribers);

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
    fetchContributors: (url, etag) => dispatch(fetchContributors(url, etag)),
    fetchSubscribers: (url, etag) => dispatch(fetchSubscribers(url, etag))
  })
)(People)
