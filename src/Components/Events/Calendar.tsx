"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import DialogEvent from "@/Components/Events/DialogEvent";
import { IEvent } from "@/interfaces/IEvent";
import interactionPlugin from "@fullcalendar/interaction";
import DialogEventList from "./DialogEventList";
import EventContent from "./EventContent";
import { useFetchEventsQuery } from "@/redux/services/eventService";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { setEvent, setEvents } from "@/redux/features/eventSlice";

function Calendar() {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDate, setVisibleDate] = useState<boolean>(false);
  const {data:fetchEvents, isLoading:eventsLoading} = useFetchEventsQuery()
  const dispatch = useDispatch()
  const events = useAppSelector(state => state.event.events)

  useEffect(() => {
    if(fetchEvents) dispatch(setEvents(fetchEvents))
  }, [fetchEvents, dispatch])

  const handleEventClick = (evento: EventClickArg) => {

    setVisible(true);
  };

  const handleDateClick = () => {
    setVisibleDate(true);
    console.log("Date Click");
  };

  const handleEventClose = () => setVisible(false);
  const handleDateClose = () => setVisibleDate(false);

  const convertToEventInputs = (events: IEvent[]): EventInput[] => {
    return events.map(event => convertToEventInput(event));
  }

  const convertToEventInput = (event: IEvent): EventInput => {
    const start = event.start instanceof Date ? event.start.toISOString() : new Date(event.start);
    const end = event.end instanceof Date ? event.end.toISOString() : new Date(event.end);
    return {
      id: event.id.toString(), // Convertir el id a string
      title: event.machine_detail.name, // Opcional: usar un campo de maquina_detail como título
      start: start, // Convertir la fecha a string en formato ISO 8601
      end: end, // Convertir la fecha a string en formato ISO 8601
      // Otras propiedades según sea necesario
      status: event.status_detail
    };
  }

  const eventsForFullCalendar: EventInput[] = convertToEventInputs(events);
  console.log(eventsForFullCalendar)

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={"es"}
        nowIndicator
        eventClick={(e: EventClickArg) => handleEventClick(e)}
        events={eventsForFullCalendar}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,today,next'
        }}
      />

      {/* <DialogEvent
        eventInfo={eventInfo}
        visible={visible}
        onClose={handleEventClose}
      /> */}

      <DialogEventList visible={visibleDate} onClose={handleDateClose} />
    </>
  );
}

export default Calendar;
