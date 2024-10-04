import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCreateAccount.css'; // Import the CSS file for styling

const AdminCreateAccount = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    jobId: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleBackToLoginClick = () => {
    navigate('/login');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imageUrl = `http://localhost:3000/images/${formData.image.name}`;

    const response = await fetch('http://localhost:3000/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        jobId: formData.jobId,
        imageUrl: imageUrl,
      }),
    });

    if (response.ok) {
      alert('User information uploaded successfully!');
    }
  };

  return (
    <div className="form-container">
      <h2>Register Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Job ID:</label>
          <input
            type="text"
            name="jobId"
            value={formData.jobId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Upload Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        {previewImage && (
          <div className="image-preview">
            <h3>Image Preview:</h3>
            <img src={previewImage} alt="Preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">Submit</button>
        <button onClick={handleBackToLoginClick} className="back-btn">Back to Login</button>
      </form>
    </div>
  );
};

export default AdminCreateAccount;
