import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // For week and day views
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import './calendar.css'; // Make sure the path is correct based on your project structure

const CalendarComponent = () => {
    const [calendarEvents, setCalendarEvents] = useState([{ title: 'Check in with Sys Admin', start: new Date() }]);

    const handleDateClick = (arg) => {
        // Prompt for event title
        const eventTitle = prompt('Enter Event Title:');
        if (eventTitle) {
            const newEvent = {
                title: eventTitle,
                start: arg.date,
                allDay: arg.allDay
            };
            setCalendarEvents([...calendarEvents, newEvent]);
        }
    };

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={calendarEvents}
                dateClick={handleDateClick}
                eventContent={renderEventContent} // Custom render function
            />
        </div>
    );
};

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}

export default CalendarComponent;

