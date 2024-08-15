"use client";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import {
  DatesSetArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import DialogEvent from "@/Components/Events/DialogEvent";
import { IEvent } from "@/interfaces/IEvent";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import DialogEventList from "./DialogEventList";
import EventContent from "./EventContent";
import { useFetchEventsQuery } from "@/redux/services/eventService";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import {
  countEventsByStatusForMonth,
  getCurrentMonthYear,
  setEvent,
  setEvents,
  setUpdateEvent,
} from "@/redux/features/eventSlice";
import EventCount from "./EventCount";

function Calendar() {
  const authUser = useAppSelector((state) => state.auth.authUser);

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
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    refetch(); // Realiza el fetch de las áreas cada vez que se monta o actualiza el componente
  }, [refetch]);

  useEffect(() => {
    if (fetchEvents) dispatch(setEvents(fetchEvents));
  }, [fetchEvents, dispatch]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/events/");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const eventData: IEvent = data.event_data;

      if (data.type === "event_created") {
        // Actualizar el estado de Redux con el nuevo evento
        if (authUser?.user.role_detail.id === 7) {
          if (
            eventData?.machine_detail?.location_detail?.area_detail
              ?.director_detail?.id === authUser.user.id
          ) {
            dispatch(setEvent(eventData));
          }
        } else {
          dispatch(setEvent(eventData));
        }
      } else if (data.type === "event_updated") {
        if (authUser?.user.role_detail.id === 7) {
          if (
            eventData?.machine_detail?.location_detail?.area_detail
              ?.director_detail?.id === authUser.user.id
          ) {
            dispatch(setUpdateEvent(eventData));
          }
        } else {
          dispatch(setUpdateEvent(eventData));
        }
      }
    };
  }, [authUser, dispatch]);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const currentDate = calendarApi.getDate();
      dispatch(
        countEventsByStatusForMonth({
          month: currentDate.getMonth(),
          year: currentDate.getFullYear(),
        })
      );
    }
  }, [dispatch]);
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
      code: event.code,
      shift: event.shift,
    };
  };

  const eventsForFullCalendar: EventInput[] = convertToEventInputs(events);

  const handleDatesSet = (arg: DatesSetArg) => {
    const { month, year } = getCurrentMonthYear(arg);
    dispatch(countEventsByStatusForMonth({ month, year }));
  };
  return (
    <>
      {!eventsLoading && <EventCount />}

      <FullCalendar
        ref={calendarRef}
        datesSet={handleDatesSet}
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
