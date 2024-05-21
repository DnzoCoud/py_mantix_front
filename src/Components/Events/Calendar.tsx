"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { EventClickArg } from "@fullcalendar/core/index.js";
import DialogEvent from "@/Components/Events/DialogEvent";
import { IEvent } from "@/interfaces/IEvent";
import interactionPlugin from "@fullcalendar/interaction";
import DialogEventList from "./DialogEventList";
import EventContent from "./EventContent";

function Calendar() {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDate, setVisibleDate] = useState<boolean>(false);

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

  const handleDateClick = () => {
    setVisibleDate(true);
    console.log("Date Click");
  };

  const handleEventClose = () => setVisible(false);
  const handleDateClose = () => setVisibleDate(false);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={"es"}
        nowIndicator
        eventClick={(e: EventClickArg) => handleEventClick(e)}
        events={[
          { title: "event 1", date: "2024-03-01" },
          { title: "event 2", date: "2024-03-02" },
        ]}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,today,next'
        }}
      />

      <DialogEvent
        eventInfo={eventInfo}
        visible={visible}
        onClose={handleEventClose}
      />

      <DialogEventList visible={visibleDate} onClose={handleDateClose} />
    </>
  );
}

export default Calendar;
