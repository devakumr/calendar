import React, { useState } from "react";
import EventModal from "./EventModal";
import Button from 'react-bootstrap/Button';

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const openModal = (date, event) => {
        setCurrentEvent(event);
        setIsModalOpen(true);
        setSelectedDate(date);
    };

    const openModall = (date, event) => {
        setSelectedDate(date);
        setCurrentEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setCurrentEvent(null);
    };

    const saveEvent = (eventData) => {
        const dateKey = `${eventData.date.getFullYear()}-${eventData.date.getMonth()}-${eventData.date.getDate()}`;

        if (eventData.id) {
            setEvents((prevEvents) => ({
                ...prevEvents,
                [dateKey]: prevEvents[dateKey].map(ev => ev.id === eventData.id ? eventData : ev)
            }));
        } else {
            const newId = Date.now();
            setEvents((prevEvents) => ({
                ...prevEvents,
                [dateKey]: [...(prevEvents[dateKey] || []), { ...eventData, id: newId }]
            }));
        }
    };

    const handleDragStart = (e, event, date) => {
        e.dataTransfer.setData('event', JSON.stringify(event));
        e.dataTransfer.setData('fromDate', date.toISOString());
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetDate) => {
        e.preventDefault();

        const event = JSON.parse(e.dataTransfer.getData('event'));
        const fromDate = new Date(e.dataTransfer.getData('fromDate'));

        const fromDateKey = `${fromDate.getFullYear()}-${fromDate.getMonth()}-${fromDate.getDate()}`;
        const targetDateKey = `${targetDate.getFullYear()}-${targetDate.getMonth()}-${targetDate.getDate()}`;

        setEvents((prevEvents) => {
            const updatedFromEvents = prevEvents[fromDateKey].filter(ev => ev.id !== event.id);
            const updatedToEvents = [...(prevEvents[targetDateKey] || []), event];

            return {
                ...prevEvents,
                [fromDateKey]: updatedFromEvents,
                [targetDateKey]: updatedToEvents
            };
        });
    };

    const renderCalendar = (month, year) => {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = [];

        for (let i = 0; i < firstDay; i++) {
            daysArray.push(<div key={`blank-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${month}-${day}`;
            const dayEvents = events[dateKey] || [];

            daysArray.push(
                <div
                    key={day}
                    className="calendar-day"
                    onClick={() => openModal(new Date(year, month, day))}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, new Date(year, month, day))}
                >
                    {day}
                    {dayEvents.length > 0 && (
                        <ol>
                            {dayEvents.map((event, index) => (
                                <li key={index} style={{ paddingTop: '5px' }}>
                                    <Button
                                        variant="primary"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, event, new Date(year, month, day))}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModall(new Date(year, month, day), event);
                                        }}
                                    >
                                        {event.title}
                                    </Button>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            );
        }

        return daysArray;
    };

    const goToPrevMonth = () => {
        debugger
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const goToNextMonth = () => {
        debugger
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };




    const eventsdelete = (eventId, date) => {
        debugger
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        setEvents((prevEvents) => ({
            ...prevEvents,
            [dateKey]: prevEvents[dateKey].filter(event => event.id !== eventId) // Remove the event by ID
        }));
    };
    

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <button onClick={goToPrevMonth}>&lt; Prev Month</button>
                <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
                <button onClick={goToNextMonth}>Next Month &gt;</button>
            </header>
            <div className="calendar-gridheader">
                <div className="calendar-day-name">Sun</div>
                <div className="calendar-day-name">Mon</div>
                <div className="calendar-day-name">Tue</div>
                <div className="calendar-day-name">Wed</div>
                <div className="calendar-day-name">Thu</div>
                <div className="calendar-day-name">Fri</div>
                <div className="calendar-day-name">Sat</div>
            </div>
            <div className="calendar-grid">{renderCalendar(currentMonth, currentYear)}</div>
            <EventModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={saveEvent}
                selectedDate={selectedDate}
                eventToEdit={currentEvent} // Pass current event to edit
                onDelete={eventsdelete}
            />
        </div>
    );
};

export default Calendar;
