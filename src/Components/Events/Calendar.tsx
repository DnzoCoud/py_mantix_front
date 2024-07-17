"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import DialogEvent from "@/Components/Events/DialogEvent";
import { IEvent } from "@/interfaces/IEvent";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import DialogEventList from "./DialogEventList";
import EventContent from "./EventContent";
import { useFetchEventsQuery } from "@/redux/services/eventService";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { setEvent, setEvents } from "@/redux/features/eventSlice";

function Calendar() {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDate, setVisibleDate] = useState<boolean>(false);
  const [dateSelect, setDateSelect] = useState<Date | string>("");
  const {
    data: fetchEvents,
    isLoading: eventsLoading,
    refetch,
  } = useFetchEventsQuery();
  const dispatch = useDispatch();
  const events = useAppSelector((state) => state.event.events);

  useEffect(() => {
    refetch(); // Realiza el fetch de las áreas cada vez que se monta o actualiza el componente
  }, [refetch]);
  useEffect(() => {
    if (fetchEvents) dispatch(setEvents(fetchEvents));
  }, [fetchEvents, dispatch]);

  const handleEventClick = (evento: EventClickArg) => {
    setVisible(true);
  };

  const handleDateClick = (info: DateClickArg) => {
    setVisibleDate(true);
    console.log("Date Click");
    setDateSelect(info.dateStr);
  };

  const handleEventClose = () => setVisible(false);
  const handleDateClose = () => setVisibleDate(false);

  const convertToEventInputs = (events: IEvent[]): EventInput[] => {
    return events.map((event) => convertToEventInput(event));
  };

  const convertToEventInput = (event: IEvent): EventInput => {
    // const start = event.start instanceof Date ? event.start.toISOString() : new Date(event.start);
    // const end = event.end instanceof Date ? event.end.toISOString() : new Date(event.end);
    return {
      id: event.id.toString(), // Convertir el id a string
      title: event.machine_detail.name, // Opcional: usar un campo de maquina_detail como título
      start: event.start, // Mantener la fecha en formato "yyyy-MM-dd"
      end: event.end, // Mantener la fecha en formato "yyyy-MM-dd"ss
      // Otras propiedades según sea necesario
      status: event.status_detail,
    };
  };

  const eventsForFullCalendar: EventInput[] = convertToEventInputs(events);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        // locale={"es"}
        nowIndicator
        eventClick={(e: EventClickArg) => handleEventClick(e)}
        events={eventsForFullCalendar}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,today,next",
        }}
        timeZone="local"
      />

      {/* <DialogEvent
        eventInfo={eventInfo}
        visible={visible}
        onClose={handleEventClose}
      /> */}

      {dateSelect && (
        <DialogEventList
          visible={visibleDate}
          onClose={handleDateClose}
          dateSelected={dateSelect}
        />
      )}
    </>
  );
}

export default Calendar;
