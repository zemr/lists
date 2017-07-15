import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils/storage';
import { fetchContributors } from '../people/contributors-reducer';
import { fetchSubscribers } from '../people/subscribers-reducer';

const propTypes = {
  type: PropTypes.string.isRequired,
  contributors: PropTypes.array.isRequired,
  subscribers: PropTypes.array.isRequired,
  fetchContributors: PropTypes.func.isRequired,
  fetchSubscribers: PropTypes.func.isRequired
};

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

    if (type === "contributors") {
      if (contributors.length === 0) {
        content = 'Fetching data';
      } else {
        content = (
          <div>
            {
              contributors.map(person => (
                <div className="person" key={person.id}>{person.login}</div>
              ))
            }
          </div>
        );
      }
    } else if (type === "subscribers") {
      if (subscribers.length === 0) {
        content = 'Fetching data';
      } else {
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
    }

    return (
    <div className="people">
      {content}
    </div>
    )
  }
}

People.propTypes = propTypes;

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
