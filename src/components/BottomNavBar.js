// src/components/BottomNavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomNavBar.css';

function BottomNavBar() {
  const location = useLocation();

  return (
    <div className="bottom-nav-bar">
      <Link to="/stats" className={location.pathname === "/stats" ? "active" : ""}>Statistiques</Link>
      <Link to="/damage" className={location.pathname === "/damage" ? "active" : ""}>Dégâts</Link>
      <Link to="/skills" className={location.pathname === "/skills" ? "active" : ""}>Compétences</Link>
      <Link to="/inventory" className={location.pathname === "/inventory" ? "active" : ""}>Inventaire</Link>
      <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>Profile</Link>
    </div>
  );
}

export default BottomNavBar;
