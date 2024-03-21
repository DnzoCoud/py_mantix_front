"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { EventClickArg } from "@fullcalendar/core/index.js";
import DialogEvent from "./DIalogEvent";
import { IEvent } from "@/interfaces/IEvent";

function Calendar() {
  const [visible, setVisible] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<IEvent>({
    title: "",
    start: new Date(),
    end: new Date(),
    maquina: {
      name: "",
      code: 0,
    },
  });

  const handleEventClick = (evento: EventClickArg) => {
    setEventInfo({
      title: evento.event.title,
      start: evento.event.start,
      end: evento.event.end,
      maquina: {
        name: "",
        code: 0,
      },
    });
    setVisible(true);
  };
  return (
    <>
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

      <DialogEvent eventInfo={eventInfo} visibleProps={visible} />
    </>
  );
}

export default Calendar;
