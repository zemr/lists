import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { sidebarPalette } from '../utils/colors';

const StyledSidebar = styled.div` 
  margin-bottom: 5px;
  background-color: ${sidebarPalette.yellowA};
  
  @media (max-width: 649px) {
    flex: 1;
  }
  
  @media (min-width: 650px) {
    width: 20%;
    max-width: 200px;
    margin-top: 5px;
    margin-right: 5px;
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 0;  
  list-style-type: none;
  
  li {            
    @media (max-width: 649px) {
      border-bottom: 2px solid ${sidebarPalette.yellowB};
          
      &:last-of-type {
        border-bottom-width: 0; 
      }
    }
 
    @media (min-width: 650px) {
      border-bottom: 4px solid ${sidebarPalette.yellowB};
    }  
  }
`;

const StyledLink = styled(NavLink)`
  display: block;
  color: ${sidebarPalette.redA};
  font-weight: bold;
  text-decoration: none; 
   
  &.active {
    background-color: ${sidebarPalette.redB};
    color: ${sidebarPalette.yellowC};
  } 
  
  @media (max-width: 649px) {
    padding: 6px 6px 6px 12px;
  }
  
  @media (min-width: 650px) {
    padding: 10px 10px 10px 20px;
  }
`;

const Sidebar = () => (
  <StyledSidebar>
    <List>
      <li><StyledLink exact to="/">Home</StyledLink></li>
      <li><StyledLink to="/contributors">Contributors</StyledLink></li>
      <li><StyledLink to="/subscribers">Subscribers</StyledLink></li>
      <li><StyledLink to="/issues">Issues</StyledLink></li>
    </List>
  </StyledSidebar>
);

export default Sidebar
