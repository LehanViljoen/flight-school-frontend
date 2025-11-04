import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import InstructorSearch from './components/InstructorSearch';
import Fleet from './components/Fleet';
import BookingDashboard from './components/BookingDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/instructors/search" element={<InstructorSearch />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/bookings" element={<BookingDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;