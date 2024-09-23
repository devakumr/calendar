import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyCalendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: 'Event 1', date: '2024-09-23' },
        { title: 'Event 2', date: '2024-09-24' }
      ]}
    />
  );
};

export default MyCalendar;
