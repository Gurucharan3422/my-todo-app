import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout done!');
    navigate('/');
  };

  return (
    <nav className="navbar">
      {!token ? (
        <div className="nav-links">
          <Link to="/" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;