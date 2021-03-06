/* eslint-disable no-unused-expressions */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './sidebar/sidebar';
import Home from './home/home';
import People from './people/people';
import Issues from './issues/issues';
import Pagination from './shared/pagination';
import styled, { injectGlobal } from 'styled-components';
import { appPalette } from './utils/colors';

injectGlobal`
  body {
    margin: 8px;
    background-color: ${appPalette.yellow};
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
  
  @media (max-width: 649px) {
    flex-direction: column; 
  }  
  
  @media (min-width: 650px) {
    min-height: 760px;
  }
`;

const Main = styled.div`
  flex: 1;
  max-width: 1080px;
`;

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <StyledApp>
          <Sidebar />

          <Main>
            <Route exact path="/" component={Home} />
            <Route
              path="/contributors"
              render={() => <Pagination type="contributors" perPage={40}><People /></Pagination>}
            />
            <Route
              path="/subscribers"
              render={() => <Pagination type="subscribers" perPage={110}><People /></Pagination>}
            />
            <Route
              path="/issues"
              render={() => <Pagination type="issues" perPage={10}><Issues /></Pagination>}
            />
          </Main>
        </StyledApp>
      </BrowserRouter>
    );
  }
}

export default App
