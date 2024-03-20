"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { EventClickArg } from "@fullcalendar/core/index.js";

export default function CalendarPage() {
  const [visible, setVisible] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState({
    title: "" as string,
  });

  const handleEventClick = (evento: EventClickArg) => {
    console.log(evento);
    setEventInfo({
      title: evento.event.title,
    });
    setVisible(true);
  };
  return (
    <>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={"es"}
          eventClick={(e: EventClickArg) => handleEventClick(e)}
          events={[
            { title: "event 1", date: "2024-03-01" },
            { title: "event 2", date: "2024-03-02" },
          ]}
        />
      </div>
      <Dialog
        header={eventInfo.title}
        visible={visible}
        onHide={() => setVisible(false)}
        resizable={false}
      >
        <h1>Evento en modal</h1>
      </Dialog>
    </>
  );
}
