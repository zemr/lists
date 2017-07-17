import React from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  width: 25px;
  height: 220px;
  
  @media (max-width: 649px) {
    margin-top: -5px;
  }
  
  @media (min-width: 650px) {
    margin-top: 5px;
  }
`;

const LoaderItem = styled.div`
  width: 25px;
  height: 50px;
  margin-bottom: 5px;
  background-color: #d6b142;
  animation: pulse 2s infinite;
 
  &:nth-of-type(2) {
    animation-delay: .5s;
  }

  &:nth-of-type(3) {
    animation-delay: 1s;
  }

  &:nth-of-type(4) {
    animation-delay: 1.5s;
  }

  @keyframes pulse {
    0% {
      background-color: #d6b142;
    }
    25% {
      background-color: #c99836;
    }
    50% {
      background-color: #d6b142;
    }
  }
`;

const Loader = () => (
  <StyledLoader aria-label="Fetching data">
    <LoaderItem />
    <LoaderItem />
    <LoaderItem />
    <LoaderItem />
  </StyledLoader>
);

export default Loader;
