import React, { useCallback, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const CalendarData = (props) => {
    console.log("CalendarData(子)コンポーネントがレンダーされました");

    return (
        <FullCalendar
            height="100vh"
            plugins={[dayGridPlugin, interactionPlugin]}
            // initialView="dayGridMonth"
            // initialView="dayGridWeek"
            initialView={props.initialView}
            locale="ja"
            // 登録済みのイベントの配列
            events={props.recipeSchedules}
            // イベントクリック時のリスナー
            eventClick={props.clickEvent}
            editable="true"
            eventDrop={props.moveEvent}
            selectable="true"
            select={props.selectDate}
        />
    );
};
export default CalendarData;
