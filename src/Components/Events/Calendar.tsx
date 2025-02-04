"use client";
import { IEvent } from "@/interfaces/IEvent";
import {
  countEventsByStatusForMonth,
  setEvent,
  setEvents,
  setUpdateEvent,
} from "@/redux/features/eventSlice";
import { useAppSelector } from "@/redux/hooks";
import { useFetchEventsQuery } from "@/redux/services/eventService";
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import moment from "moment";
import dynamic from "next/dynamic";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DialogEventList from "./DialogEventList";

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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());
  const [visible, setVisible] = useState<{
    event_id?: number;
    open: boolean;
  }>({
    open: false,
  });
  const [visibleDate, setVisibleDate] = useState<boolean>(false);
  const [dateSelect, setDateSelect] = useState<Date | string>("");
  const { data: fetchEvents, isLoading: eventsLoading } = useFetchEventsQuery(
    {
      month: currentMonth.getMonth() + 1,
      year: currentMonth.getFullYear(),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const dispatch = useDispatch();
  const events = useAppSelector((state) => state.event.events);
  const calendarRef = useRef<FullCalendar>(null);
  useEffect(() => {
    if (fetchEvents) dispatch(setEvents(fetchEvents));
  }, [fetchEvents, eventsLoading, dispatch]);

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
  // useEffect que invoca handleDatesSet
  useEffect(() => {
    // Último día del mes actual

    handleDatesSet();

    dispatch(
      countEventsByStatusForMonth({
        month: currentMonth.getMonth(),
        year: currentMonth.getFullYear(),
      })
    );
  }, [currentMonth, dispatch]);

  const eventsForFullCalendar: EventInput[] = convertToEventInputs(events);

  const handleDatesSet = () => {
    const newdate = calendarRef.current?.getApi().getDate();
    if (
      newdate?.getMonth() !== currentMonth.getMonth() ||
      newdate?.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(newdate ?? new Date());
      // Sumar 2 al mes para que coincida con el formato que espera tu API
      dispatch(
        countEventsByStatusForMonth({
          month: newdate?.getMonth() ?? new Date().getMonth(), // Sumar 2 aquí
          year: newdate?.getFullYear() ?? new Date().getFullYear(),
        })
      );
    }
  };

  const handleYearChange = (event: any) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);

    // Aquí puedes añadir la lógica para actualizar el calendario
  };

  const handleFilterClick = () => {
    const newDate = new Date(selectedYear, 0, 1); // Cambia a enero del año seleccionado
    setCurrentMonth(newDate); // Asegúrate de que se actualice el estado del año seleccionado
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate); // Cambia la fecha en FullCalendar
    }

    // Llama a countEventsByStatusForMonth para obtener eventos del nuevo año
    dispatch(
      countEventsByStatusForMonth({
        month: 1, // Mes de enero
        year: selectedYear, // Cambia a currentYear en lugar de selectedYear
      })
    );
  };

  if (eventsLoading) return <Skeleton className="p-12" />;
  return (
    <>
      {!eventsLoading && <EventCount />}
      <div className="w-1/2 flex items-center justify-start gap-4 my-4">
        <label htmlFor="year">Selecciona un año:</label>
        <InputText
          id="year"
          type="number"
          value={selectedYear.toString()}
          onChange={handleYearChange}
          min={2020} // Cambia esto según tus necesidades
          max={2030} // Cambia esto según tus necesidades
        />
        <Button
          loading={eventsLoading}
          label="Filtrar"
          onClick={handleFilterClick}
          size="small"
        />
        {/* Botón de filtrar */}
      </div>
      {eventsLoading ? (
        <Skeleton className="p-12" />
      ) : (
        <>
          <FullCalendar
            ref={calendarRef}
            datesSet={handleDatesSet}
            plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            // locale={"es"}
            nowIndicator
            nowIndicatorClassNames={"bg-red-500"}
            eventClick={(e: EventClickArg) => handleEventClick(e)}
            events={eventsForFullCalendar ?? []}
            dateClick={handleDateClick}
            eventContent={(eventInfo) => (
              <EventContent
                eventInfo={eventInfo}
                isLoad={loadingEventId === eventInfo.event.id || eventsLoading}
              />
            )}
            headerToolbar={{
              left: "title",
              center: "dayGridMonth,dayGridWeek,listWeek",
              right: "prev,today,next",
            }}
            timeZone="local"
            locale={esLocale}
            visibleRange={(currentDate) => {
              let start = moment(currentDate).startOf("month").toDate();
              let end = moment(currentDate).endOf("month").toDate();
              return {
                start: start,
                end: end,
              };
            }}
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
      )}
    </>
  );
}

export default Calendar;
