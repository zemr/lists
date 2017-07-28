import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
 
  @media (max-width: 649px) {
    flex-direction: column;
  }
`;

const Page = styled.div`
  width: 20px;
  height: 20px;
  margin: 3px;
  background-color: #ffdc78;
  border-radius: 50%;

  &[aria-selected=true] {
    background-color: #aa3838;
  }   
`;

const Pages = styled.div`
  display: flex;
  
  @media (max-width: 649px) {
    flex-flow: row wrap;
    margin-bottom: 5px;
  }
  
  @media (min-width: 650px) {
    flex-flow: column wrap;
    order: 2;
    margin-top: 5px;
  }
`;

const propTypes = {
  type: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  contributors: PropTypes.array.isRequired,
  subscribers: PropTypes.array.isRequired
};

export class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: null,
      currentPage: 1
    };
  }

  componentWillMount() {
    this.setPageCount()
  }

  componentDidUpdate() {
    this.setPageCount()
  }

  flattenArrays(array) {
    return [].concat.apply([], array);
  }

  setPageCount() {
    const data = this.flattenArrays(this.props[this.props.type]);
    const perPage = this.props.perPage;
    let pages = data.length / perPage;
    if (data.length % perPage > 0) {
      pages = Math.ceil(pages);
    }
    if (this.state.pages !== pages) {
      this.setState({
        pages: pages
      });
    }
  }

  setCurrentPage(n) {
    this.setState({
      currentPage: n
    });
  }

  createSwitches() {
    let pages = [];
    const pageCount = this.state.pages;
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <Page
          onClick={() => this.setCurrentPage(i)}
          aria-label={i}
          aria-selected={i === this.state.currentPage}
          key={i}
        />
      );
    }
    return pages;
  }

  createDataChunk() {
    const data = this.flattenArrays(this.props[this.props.type]);
    const perPage = this.props.perPage;
    const currentPage = this.state.currentPage;
    const endValue = currentPage * perPage;
    return data.slice((endValue - perPage), endValue);
  }

  render() {
    const props = {};
    props['type'] = this.props.type;
    props['data'] = this.createDataChunk();
    props['url'] = this.props.url;

    return (
      <PaginationWrapper>
        <Pages>{this.createSwitches()}</Pages>
        {React.cloneElement(this.props.children, props)}
      </PaginationWrapper>
    );
  }
}

Pagination.propTypes = propTypes;

export default connect(
  state => ({
    contributors: state.contributors.data,
    subscribers: state.subscribers.data,
    issues: state.issues.data,
    url: state.repository.url
  })
)(Pagination)
