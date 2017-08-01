import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils/storage';
import { fetchIssues } from './reducer-issues';
import Loader from '../shared/loader';
import Filler from '../shared/filler';
import Issue from './issue';
import styled from 'styled-components';

const IssuesList = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const propTypes = {
  data: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  etag: PropTypes.string.isRequired,
  result: PropTypes.bool.isRequired,
  fetchIssues: PropTypes.func.isRequired
};

export class Issues extends React.Component {
  componentWillMount() {
    const etag = this.props.etag;
    let url;
    if (this.props.url.length > 0) {
      url = this.props.url + 'issues';
    } else {
      url = 'https://api.github.com/repos/reactjs/react-redux/issues';
    }
    if (storageAvailable()) {
      if (localStorage.getItem('state')) {
        this.props.fetchIssues(url, etag);
      } else {
        this.props.fetchIssues(url);
      }
    } else {
      this.props.fetchIssues(url);
    }
  }

  render() {
    const { data, result } = this.props;

    return (
      <div>
        {
          data.length === 0
            ?
            result
              ?
              <Loader />
              :
              <Filler type="issues" />
            :
            <IssuesList>
              {
                data.map(issue => (
                  <Issue details={issue} key={issue.number} />
                ))
              }
            </IssuesList>
        }
      </div>
    );
  }
}

Issues.propTypes = propTypes;

export default connect(
  state => ({}),
  dispatch => ({
    fetchIssues: (url, etag) => dispatch(fetchIssues(url, etag))
  })
)(Issues)
