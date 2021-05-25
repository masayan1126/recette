import React, { useCallback, useState, useEffect } from "react";
import CalendarData from "./CalendarData";

const Calendar = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "event 1",
            start: "2021-05-22",
            end: "2021-05-22",
            memo: "memo1",
        },
        {
            id: 2,
            title: "event 2",
            start: "2021-05-23 10:00:00",
            end: "2021-05-23 11:00:00",
            memo: "memo2",
        },
    ]);

    const inputEvents = useCallback(() => {
        setEvents(events);
    }, [setEvents]);

    const convertDateFormat = useCallback((info) => {
        const dt = info.event.start;
        const y = dt.getFullYear();
        const m = ("00" + (dt.getMonth() + 1)).slice(-2);
        const d = ("00" + dt.getDate()).slice(-2);
        const result = y + "/" + m + "/" + d;
        return result;
    }, []);

    const clickEvent = (info) => {
        const newDate = convertDateFormat(info);
        console.log(newDate);
    };

    return (
        <CalendarData
            events={events}
            clickEvent={clickEvent}
            inputEvents={inputEvents}
        />
    );
};
export default Calendar;
