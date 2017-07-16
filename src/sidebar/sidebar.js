import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSidebar = styled.div` 
  padding: 10px;  
  margin-bottom: 5px;
  background-color: #ffdc78;
  
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
`;

const StyledLink = styled(Link)`
  color: #a52929;
  font-weight: bold;
  text-decoration: none;  
`;

const Sidebar = () => (
  <StyledSidebar>
    <List>
      <li><StyledLink to="/">Home</StyledLink></li>
      <li><StyledLink to="/contributors">Contributors</StyledLink></li>
      <li><StyledLink to="/subscribers">Subscribers</StyledLink></li>
    </List>
  </StyledSidebar>
);

export default Sidebar
