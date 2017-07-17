import React from 'react';
import styled from 'styled-components';

const StyledHome = styled.div`
  max-width: 360px;
  height: 180px;
  padding: 20px;
  background-color: #c15347;
 
  @media (max-width: 649px) {
    margin-right: auto;
    margin-left: auto;
  }
  
  @media (min-width: 650px) {
    margin-top: 5px;
  }
`;

const HomeContent = styled.div`
  width: 100%;
  font-weight: bold;
  color: #fffcdd;
`;

const HR = styled.div`
    height: 10px;
    margin-top: 30px;
    background-color: #fffcdd;

    &:nth-of-type(1) {
      width: 45%;
    }

    &:nth-of-type(2) {
      width: 100%;
    }

    &:nth-of-type(3) {
      width: 75%;
    }
`;

const Home = () => (
  <StyledHome>
    <HomeContent>
      Repository Data
      <HR />
      <HR />
      <HR />
    </HomeContent>
  </StyledHome>
);

export default Home
