import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils/storage';
import { fetchIssues } from './reducer-issues';
import Loader from '../shared/loader';
import Issue from './issue';
import styled from 'styled-components';

const IssuesList = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const propTypes = {
  data: PropTypes.array.isRequired,
  fetchIssues: PropTypes.func.isRequired
};

export class Issues extends React.Component {
  componentWillMount() {
    const url = 'https://api.github.com/repos/reactjs/react-redux/issues';
    if (storageAvailable()) {
      if (!localStorage.getItem('state') || !localStorage.getItem('etagIssues')) {
        this.props.fetchIssues(url);
      } else if (localStorage.getItem('etagIssues')) {
        const etag = JSON.parse(localStorage.getItem('etagIssues'));
        this.props.fetchIssues(url, etag[0]);
      }
    } else {
      this.props.fetchIssues(url);
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        {
          data.length === 0
            ?
            <Loader />
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
