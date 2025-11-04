import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const BookingDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/bookings/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const formatted = res.data.map(b => ({
          id: b.id,
          title: `Booking: ${b.student_id} with ${b.instructor_id}`,
          start: b.start_time,
          end: b.end_time,
          // Color by aircraft/sim
        }));
        setEvents(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelected(selectInfo);
    // Show modal/form to book
  };

  const handleBook = async (formData) => {  // formData: instructor_id, aircraft_id or sim_id, estimated_hours
    try {
      await axios.post('http://localhost:5000/bookings', {
        ...formData,
        start_time: selected.startStr,
        end_time: selected.endStr
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Refresh events
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      select={handleDateSelect}
      events={events}
    />
    // Add modal for booking form when selected
  );
};

export default BookingDashboard;