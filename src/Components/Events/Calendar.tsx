"use client";
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import {
  DatesSetArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import { IEvent } from "@/interfaces/IEvent";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import DialogEventList from "./DialogEventList";
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
import dynamic from "next/dynamic";
import { Skeleton } from "primereact/skeleton";
import esLocale from "@fullcalendar/core/locales/es";
import listPlugin from "@fullcalendar/list";

const DialogEvent = dynamic(() => import("@/Components/Events/DialogEvent"), {
  loading: () => (
    <div className="flex justify-evenly items-center gap-4 p-2 m-4">
      <Skeleton className="p-2 w-full" />
    </div>
  ),
});
const EventCount = dynamic(() => import("./EventCount"), {
  loading: () => (
    <div className="flex justify-evenly items-center gap-4 p-2 m-4">
      <Skeleton className="p-2 w-1/4" />
      <Skeleton className="p-2 w-1/4" />
      <Skeleton className="p-2 w-1/4" />
      <Skeleton className="p-2 w-1/4" />
    </div>
  ),
});
const EventContent = dynamic(() => import("./EventContent"), {
  loading: () => <Skeleton className="p-12" />,
});

function Calendar() {
  const authUser = useAppSelector((state) => state.auth.authUser);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
  const [visible, setVisible] = useState<{
    event_id?: number;
    open: boolean;
  }>({
    open: false,
  });
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
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/events/`
    );
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
    const eventId = parseInt(evento.event._def.publicId);
    setLoadingEventId(evento.event.id);
    setVisible({
      open: true,
      event_id: eventId,
    });

    setTimeout(() => {
      setLoadingEventId(null); // Desactiva el estado de carga después de 2 segundos.
      // Aquí puedes agregar cualquier otra lógica después de que la carga finalice.
    }, 2000);
    // <EventCard event={event} refetch={refetch} />
    // return (

    // );
  };

  const handleDateClick = (info: DateClickArg) => {
    setVisibleDate(true);
    setDateSelect(info.dateStr);
  };

  const handleEventClose = () =>
    setVisible({
      open: false,
      event_id: undefined,
    });
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

  const eventClassNames = (eventInfo: EventContentArg) => {
    // Si el evento tiene el atributo `day.close`, añade una clase personalizada
    if (eventInfo.event.extendedProps.day?.close) {
      return ["event-closed"]; // Clase que se añadirá a los eventos cerrados
    }
    return ["event-open"]; // Clase por defecto para eventos abiertos
  };

  return (
    <>
      {!eventsLoading && <EventCount />}

      <FullCalendar
        ref={calendarRef}
        datesSet={handleDatesSet}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        // locale={"es"}
        nowIndicator
        nowIndicatorClassNames={"bg-red-500"}
        eventClick={(e: EventClickArg) => handleEventClick(e)}
        events={eventsForFullCalendar}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => (
          <EventContent
            eventInfo={eventInfo}
            isLoad={loadingEventId === eventInfo.event.id}
          />
        )}
        headerToolbar={{
          left: "title",
          center: "dayGridMonth,dayGridWeek,listWeek",
          right: "prev,today,next",
        }}
        timeZone="local"
        locale={esLocale}
      />

      <DialogEvent
        eventInfo={visible.event_id}
        visible={visible.open}
        onClose={handleEventClose}
      />

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
