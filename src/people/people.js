import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils/storage';
import { fetchContributors } from './reducer-contributors';
import { fetchSubscribers } from './reducer-subscribers';
import Loader from '../shared/loader';
import Filler from '../shared/filler';
import styled from 'styled-components';
import { contributorsPalette, subscribersPalette } from '../utils/colors';

const PersonList = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const PersonListCenter = styled(PersonList)`
  @media (max-width: 649px) {
    display: flex;
    justify-content: center;
  }
`;

const Contributor = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  height: 50px;
  padding: 7px 7px 5px;
  margin: 5px;
  background-color: ${contributorsPalette.yellowA};
  color: ${contributorsPalette.brown};
  word-break: break-all;
    
  @media (max-width: 349px) {
    width: 125px;
  }
  
  @media (min-width: 350px) and (max-width: 649px) {
   width: 145px;
  }
  
  @media (min-width: 650px) {
    width: 180px;
    height: 70px;
    padding: 10px 10px 5px;
  }
  
  span:nth-child(2) {
    display: inline-block;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 50%;
    background-color: ${contributorsPalette.yellowB};
    line-height: 30px;
    text-align: center;
    
    @media (min-width: 650px) {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
  }
`;

const Subscriber = styled.div`
  padding: 5px 10px;
  margin: 5px;  
  background-color: ${subscribersPalette.redA};
  color: ${subscribersPalette.yellow};
  
  &:nth-child(4n) {
    background-color: ${subscribersPalette.redB};
  }
  
  &:nth-child(7n) {
    background-color: ${subscribersPalette.orange};
  }
  
  @media (min-width: 1200px) {
    padding: 6px 10px;
  }
`;

const propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  etag: PropTypes.string.isRequired,
  result: PropTypes.bool.isRequired,
  fetchContributors: PropTypes.func.isRequired,
  fetchSubscribers: PropTypes.func.isRequired
};

export class People extends React.Component {
  componentWillMount() {
    const etag = this.props.etag;
    let url, fnName;
    if (this.props.type === "contributors") {
      if (this.props.url.length > 0) {
        url = this.props.url + 'contributors';
      } else {
        url = 'https://api.github.com/repos/reactjs/react-redux/contributors';
      }
      fnName = 'fetchContributors';
    } else if (this.props.type === "subscribers") {
      if (this.props.url.length > 0) {
        url = this.props.url + 'subscribers';
      } else {
        url = 'https://api.github.com/repos/reactjs/react-redux/subscribers';
      }
      fnName = 'fetchSubscribers';
    }

    if (storageAvailable()) {
      if (localStorage.getItem('state')) {
        this.props[fnName](url, etag);
      } else {
        this.props[fnName](url);
      }
    } else {
      this.props[fnName](url);
    }
  }

  render() {
    const { data, type, result } = this.props;
    let content;

    if (data.length === 0) {
      if (result) {
        content = <Loader />;
      } else {
        content = <Filler type={type} />;
      }
    } else {
      if (type === "contributors") {
        content = (
          <PersonListCenter>
            {
              data.map(person => (
                <Contributor key={person.id}>
                  <span>{person.login}</span>
                  <span>{person.contributions}</span>
                </Contributor>
              ))
            }
          </PersonListCenter>
        );
      } else if (type === "subscribers") {
        content = (
          <PersonList>
            {
              data.map(person => (
                <Subscriber key={person.id}>{person.login}</Subscriber>
              ))
            }
          </PersonList>
        );
      }
    }

    return (
    <div>
      {content}
    </div>
    )
  }
}

People.propTypes = propTypes;

export default connect(
  state => ({}),
  dispatch => ({
    fetchContributors: (url, etag) => dispatch(fetchContributors(url, etag)),
    fetchSubscribers: (url, etag) => dispatch(fetchSubscribers(url, etag))
  })
)(People)
