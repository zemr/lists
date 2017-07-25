import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Markdown from 'react-markdown';
import styled from 'styled-components';

const StyledIssue = styled.div`
    width: 100%;
    padding: 5px;
    margin: 5px;
    background-color: #e08a00;
    color: #602a1e;    

    &:nth-child(2n) {
      background-color: #cc7c37;
    }  
  
    > div:nth-child(1) {
      font-size: .7em;
    }
`;

const Content = styled.div`
  margin: 10px;
  font-size: 0.9em;
  word-break: break-word;
  
  code {
    white-space: pre-wrap;
  }
  
  a {
    color: #602a1e;
  }
`;

const propTypes = {
  details: PropTypes.object.isRequired
};

export class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false
    }
  }

  toggleContent() {
    this.state.showContent ? this.setState({ showContent: false }) : this.setState({ showContent: true });
  }

  render() {
    const { details } = this.props;

    return (
      <StyledIssue onClick={() => this.toggleContent()}>
        <div>
          <span>{moment(details.created_at).format("DD-MM-YYYY")}</span>
          <span> | </span>
          <span>{details.user.login}</span>
        </div>
        <div>
          {details.title}
        </div>
        {
          this.state.showContent
          ?
            <Content aria-expanded={true}>
              <Markdown source={details.body} />
            </Content>
          :
            <Content aria-expanded={false} />
        }

      </StyledIssue>
    );
  }
}

Issue.propTypes = propTypes;

export default Issue
