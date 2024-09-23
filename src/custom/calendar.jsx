import React, { useState, useEffect } from "react";


const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const renderCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    // Fill in blank days for the first week
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`blank-${i}`} className="blank"></div>);
    }

    // Fill in the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        year === today.getFullYear() &&
        month === today.getMonth() &&
        day === today.getDate();
      daysArray.push(
        <div key={day} className={`day ${isToday ? "today" : ""}`}>
          {day}
        </div>
      );
    }

    return daysArray;
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calendar-container">
      <header>
        <button onClick={goToPrevMonth}>&lt;</button>
        <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </header>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days-grid">
        {renderCalendar(currentMonth, currentYear)}
      </div>
    </div>
  );
};

export default Calendar;
