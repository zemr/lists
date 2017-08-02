import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fillerPalette } from '../utils/colors';

const StyledFiller = styled.div`
  padding: 5px 10px;
  background-color: ${fillerPalette.yellow};
  color: ${fillerPalette.red};
  
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
