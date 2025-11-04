import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', user.name);
    data.append('surname', user.surname);
    data.append('pilot_license_number', user.pilot_license_number);
    if (file) data.append('profile_picture', file);

    try {
      await axios.put(`http://localhost:5000/users/${id}`, data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
      });
      // Refresh
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const addCriteria = async () => {
    try {
      await axios.post(`http://localhost:5000/instructors/${id}/criteria`, { criteria }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{user.name} {user.surname}</h1>
      <img src={user.profile_picture_url} alt="Profile" />
      <p>License: {user.pilot_license_number}</p>
      <form onSubmit={handleUpdate}>
        {/* Inputs for name, surname, license */}
        <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>Update Picture<input {...getInputProps()} /></div>
          )}
        </Dropzone>
        <button type="submit">Update</button>
      </form>
      {user.role === 'instructor' && (
        <div>
          <select multiple onChange={(e) => setCriteria([...e.target.selectedOptions].map(o => o.value))}>
            <option value="Grade 3">Grade 3</option>
            {/* Add all criteria options */}
          </select>
          <button onClick={addCriteria}>Add Criteria</button>
        </div>
      )}
    </div>
  );
};

export default Profile;