import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storageAvailable } from '../utils/storage';
import { fetchContributors } from './reducer-contributors';
import { fetchSubscribers } from './reducer-subscribers';
import styled from 'styled-components';

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
  background-color: #d6b142;
  color: #602a1e;
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
    background-color: #c99836;
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
  background-color: #d84d38;
  color: #fff2bf;
  
  &:nth-child(4n) {
    background-color: #b2112f;
  }
  
  &:nth-child(7n) {
    background-color: #e07f23;
  }
  
  @media (min-width: 1200px) {
    padding: 6px 10px;
  }
`;

const propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
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

  render() {
    let { data, type } = this.props;
    let content;

    if (data.length === 0) {
      content = 'Fetching data';
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
