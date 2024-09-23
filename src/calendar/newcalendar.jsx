import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';

const Scheduler = () => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, resourceTimelinePlugin]}
      initialView="resourceTimelineWeek"
      resources={[
        { id: 'a', title: 'Room A' },
        { id: 'b', title: 'Room B' },
      ]}
      events={[
        { id: '1', resourceId: 'a', start: '2024-09-23T10:00:00', end: '2024-09-23T12:00:00', title: 'Meeting' },
        { id: '2', resourceId: 'b', start: '2024-09-23T13:00:00', end: '2024-09-23T15:00:00', title: 'Conference' }
      ]}
    />
  );
};

export default Scheduler;
