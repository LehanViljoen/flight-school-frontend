import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fleet = () => {
  const [aircraft, setAircraft] = useState([]);
  const [formData, setFormData] = useState({ make: '', model: '' });

  useEffect(() => {
    // Fetch aircraft
    const fetchAircraft = async () => {
      try {
        // Assume GET /aircraft all, add endpoint if needed
        const res = await axios.get('http://localhost:5000/aircraft', {  // Add this endpoint in backend if missing
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAircraft(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAircraft();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/aircraft', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
        <input name="make" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} />
        <input name="model" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} />
        <button type="submit">Add Aircraft</button>
      </form>
      <ul>
        {aircraft.map(a => <li key={a.id}>{a.make} {a.model} - Hours: {a.current_hours}/{a.max_hours}</li>)}
      </ul>
      {/* Similar for simulators */}
    </div>
  );
};

export default Fleet;