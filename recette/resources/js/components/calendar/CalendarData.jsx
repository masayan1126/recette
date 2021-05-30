import React, { useCallback, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const CalendarData = (props) => {
    return (
        <FullCalendar
            height="100vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ja"
            // 登録済みのイベントの配列
            events={props.allEvents}
            // イベントクリック時のリスナー
            eventClick={props.clickEvent}
            editable="true"
            eventDrop={props.eventDrop}
        />
    );
};
export default CalendarData;
