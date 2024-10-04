import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCreateAccount.css';  // Import the CSS for styles

const UserCreateAccount = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleBackToLoginClick = () => {
    navigate('/user-login');
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
  
    // Simulate the image being stored in the /uploads/ folder in the public directory
    const imageUrl = `http://localhost:3000/images/${formData.image.name}`;
  
    // Prepare the data to send
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('address', formData.address);
    if (formData.image) {
      form.append('image', formData.image);
    }
  
    // Post request to fake server
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        imageUrl: imageUrl,
      }),
    });
  
    if (response.ok) {
      alert('User information uploaded successfully!');
    }
  };

  return (
    <div className="create-account-container">
      <h2 className="create-account-title">Register User</h2>
      <form onSubmit={handleSubmit} className="create-account-form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Upload Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-input"
          />
        </div>

        {previewImage && (
          <div className="preview-container">
            <h3 className="preview-title">Image Preview:</h3>
            <img src={previewImage} alt="Preview" className="preview-image" />
          </div>
        )}

        <div className="button-container">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="back-to-login-button" onClick={handleBackToLoginClick}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreateAccount;
