import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './UserSidebar.css';  // Make sure to import the CSS

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  const handleQuestions = () => {
    // Navigate to page to select technology to create quiz
    navigate(`/instruction-popup`);
  };

  return (
    <div className="user-profile-container">
      <h2 className="user-portal-heading">User Portal</h2>
      <h2 className="user-welcome-heading">Welcome, {user.name}</h2>
      <p className="user-info"><strong>Email:</strong> {user.email}</p>
      <p className="user-info"><strong>Address:</strong> {user.address}</p>
      {user.imageUrl && (
        <img className="user-profile-image" src={user.imageUrl} alt="Profile" />
      )}
      <nav className="user-nav">
        <ul>
          <li>
            <button className="user-quiz-button" onClick={handleQuestions}>
              Enter Quiz
            </button>
          </li>
          <li>
            <Link className="user-logout-link" to="/user-login">
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserProfile;
