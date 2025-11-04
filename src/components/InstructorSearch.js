import React, { useState } from 'react';
import axios from 'axios';

const InstructorSearch = () => {
  const [criteria, setCriteria] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [instructors, setInstructors] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/instructors/search?criteria=${criteria}&available_from=${from}&available_to=${to}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setInstructors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input value={criteria} onChange={(e) => setCriteria(e.target.value)} placeholder="Criteria" />
      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {instructors.map(inst => <li key={inst.id}>{inst.name} {inst.surname}</li>)}
      </ul>
    </div>
  );
};

export default InstructorSearch;