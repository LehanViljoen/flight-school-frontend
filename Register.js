import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', surname: '', pilot_license_number: '', role: 'student', email: '', password: ''
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('profile_picture', file);

    try {
      await axios.post('http://localhost:5000/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Redirect to login
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" />
      <input name="pilot_license_number" value={formData.pilot_license_number} onChange={handleChange} placeholder="License Number" />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        <option value="admin">Admin</option>
      </select>
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />
      <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>Drop profile picture here<input {...getInputProps()} /></div>
        )}
      </Dropzone>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;