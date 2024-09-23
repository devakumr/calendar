// Calendar.js
import React, { useState } from 'react';


const Scheduler = () => {
  // Date setup (for September 2024)
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 8, 1)); // September 2024
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateDays = () => {
    const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    const daysArray = [];
    let day = 1;

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
    }

    // Fill in the days of the month
    for (let i = startDay; i < startDay + daysInMonth; i++) {
      daysArray.push(
        <div className="calendar-day" key={i}>
          <span className="day-number">{day}</span>
          {/* Add custom event rendering here */}
          <div className="events">
            {day === 1 && <div className="event">All Day Event</div>}
            {day === 9 && <div className="event">Repeating Event at 4pm</div>}
            {day === 23 && (
              <>
                <div className="event">Meeting at 10:30am</div>
                <div className="event">Lunch at 12pm</div>
                <div className="event">Meeting at 2:30pm</div>
                <div className="event">Birthday Party at 7am</div>
              </>
            )}
          </div>
          {day++}
        </div>
      );
    }
    return daysArray;
  };

  return (
    <div className="calendar-container">
      {/* Calendar Header (Days of the Week) */}
      <div className="calendar-header">
        {daysInWeek.map((day, idx) => (
          <div key={idx} className="calendar-header-day">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="calendar-grid">{generateDays()}</div>
    </div>
  );
};

export default Scheduler;
