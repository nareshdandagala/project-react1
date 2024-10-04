import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the new CSS file for styling

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Are You Admin or User?</h1>
      <div className="button-container">
        <Link to="/admin-login">
          <button className="role-button">Admin</button>
        </Link>
        <Link to="/user-login">
          <button className="role-button">User</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
