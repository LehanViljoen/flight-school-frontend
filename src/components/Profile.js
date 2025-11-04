import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/users/${id}`).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name} {user.surname}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {user.profile_picture_url && <img src={`${API_URL}${user.profile_picture_url}`} alt="Profile" width="100" />}
    </div>
  );
}

export default Profile;