import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFiller = styled.div`
  padding: 5px 10px;
  background-color: #ffdc78;
  color: #a52929;
  
  @media (max-width: 649px) {
    margin-top: -5px;
  }

  @media (min-width: 650px) {
    margin-top: 5px;
    margin-left: 5px;
  }
`;

const propTypes = {
  type: PropTypes.string
};

const Filler = ({ type }) => (
  <StyledFiller>
    {
      type === 'issues'
      ?
        <span>There aren't any open issues for this repository.</span>
      :
        type === 'subscribers'
        ?
          <span>No one's subscribing this repository.</span>
        :
          <span>No data available.</span>

    }
  </StyledFiller>
);

Filler.propTypes = propTypes;

export default Filler
