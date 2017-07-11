import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div style={{ width: '25%', backgroundColor: 'PapayaWhip' }}>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contributors">Contributors</Link></li>
      <li><Link to="/subscribers">Subscribers</Link></li>
    </ul>
  </div>
);

export default Sidebar
