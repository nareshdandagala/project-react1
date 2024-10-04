import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AdminSideBar.css'
const AdminProfile = () => {
  const location = useLocation();
  const user = location.state.user;

  return (
    <div className='profile-card'>
      <h2>Admin Portal</h2>
      <h2>Welcome, {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Job ID:</strong> {user.jobId}</p>
      <p><strong>Address:</strong> {user.address}</p>
      {user.imageUrl && <img src={user.imageUrl} alt="Profile" style={{ width: '300px' }} />}
      <nav>
        <ul>
          <li><Link to="/create-quiz">Create Quiz</Link></li>
          <li><Link to="/view-results">View Results</Link></li>
          <li><Link to="/login">Log Out</Link></li> 
        </ul>
      </nav>
    </div>
  );
};

export default AdminProfile;
