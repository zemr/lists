/* eslint-disable no-unused-expressions */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import Sidebar from './sidebar/sidebar';
import People from './people/people';

// language=SCSS prefix=dummy{ suffix=}
injectGlobal`
  body {
    margin: 8px;
    background-color: #fffff2;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.3;
   
    @media (min-width: 800px) {
      font-size: 18px;
    }

    @media (min-width: 1200px) {
      font-size: 20px;
      line-height: 1.4;
    }
  }
`;

const StyledApp = styled.div`
  display: flex;  
  overflow: hidden;
  
  @media (max-width: 649px) {
    flex-direction: column; 
  }  
  
  @media (min-width: 650px) {
    height: 760px;
  }
`;

const Main = styled.div`
  flex: 1;
`;

const Home = styled.h2`
  color: #c7813d;
`;

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <StyledApp>
          <Sidebar />

          <Main>
            <Route exact path="/" component={() => <Home>Home</Home>} />
            <Route path="/contributors" render={() => <People type="contributors" />} />
            <Route path="/subscribers" render={() => <People type="subscribers" />} />
          </Main>
        </StyledApp>
      </BrowserRouter>
    );
  }
}

export default App
