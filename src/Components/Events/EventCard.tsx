"use client";
import { Card } from "primereact/card";
import {
  Panel,
  PanelFooterTemplateOptions,
  PanelHeaderTemplateOptions,
} from "primereact/panel";
import React, { useRef, useState } from "react";
import EventStepper from "./EventList/EventStepper";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { getColorEvents } from "@/Utils/ColorEvents";
import { Tag } from "primereact/tag";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import { IEvent } from "@/interfaces/IEvent";
import { EVENT_STATE } from "@/Utils/constants";
import { OverlayPanel } from "primereact/overlaypanel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IUser } from "@/interfaces/IUser";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useUpdateEventMutation } from "@/redux/services/eventService";
import { formatDate } from "@fullcalendar/core/index.js";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUpdateEvent } from "@/redux/features/eventSlice";
import LoaderComponents from "../Globals/Loader/LoaderComponents";

export default function EventCard({
  event,
  refetch,
}: {
  event: IEvent;
  refetch: any;
}) {
  const today = new Date();

  const authUser = useAppSelector((state) => state.auth.authUser);
  const op = useRef(null);
  const reprogramButtonRef = useRef(null);

  const configMenu = useRef<HTMLElement | null>(null);
  const reprogramMenuRef = useRef<HTMLElement | null>(null);
  const eventColor = getColorEvents(event.status_detail.id);
  const menuRight = useRef<Menu>(null);
  const headerTemplate = (options: PanelHeaderTemplateOptions) => {
    const className = `${options.className} justify-between ${eventColor.border} border-b-0 px-2 items-center p-4 rounded-tl-md rounded-tr-md`;
    const menuPopup: MenuItem[] = [
      {
        label: "Opciones",
        items: [
          {
            label: "Sugerir reprogramacion",
            icon: "pi pi-refresh",
          },
        ],
      },
    ];

    return (
      <header
        className={className}
        onClick={
          //@ts-ignore
          (e) => configMenu?.current?.toggle(e)
        }
      >
        <Menu
          model={menuPopup}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
        <div className="flex items-center gap-2 ">
          <span className={`font-bold ${eventColor.textColor} dark:text-black`}>
            {event.machine_detail.name}
          </span>
          <Tag
            severity="warning"
            value={event.shift.toUpperCase()}
            data-pr-tooltip="Turno"
          />
        </div>
        <div>
          {/* {event.status_detail.id !== EVENT_STATE.COMPLETADO && (
            <button
              className="p-panel-header-icon p-link mr-2"
              onClick={
                //@ts-ignore
                (e) => configMenu?.current?.toggle(e)
              }
            >
              <span
                className="pi pi-cog dark:text-black"
                onClick={
                  //@ts-ignore
                  (event) => menuRight.current?.toggle(event)
                }
                aria-controls="popup_menu_right"
                aria-haspopup
              ></span>
            </button>
          )} */}

          {authUser?.user.role_detail.id !== 3 && options.togglerElement}
        </div>
      </header>
    );
  };

  const ReprogramForm = (): React.ReactNode => {
    const formatDateToYYYYMMDD = (isoDateString: string): string => {
      const date = new Date(isoDateString);
      const year = date.getFullYear();
      let month = "" + (date.getMonth() + 1);
      let day = "" + date.getDate();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      // Formato YYYY-MM-DD HH:mm:ss para asegurar compatibilidad con el servidor
      return [year, month, day].join("-");
    };
    const [updateEvent, { isLoading }] = useUpdateEventMutation();
    const [dates, setDates] = useState({
      start: "", // Assuming event.start is a valid date
      end: "", // Assuming event.end is a valid date
    });

    const adjustedStartDate = new Date(formatDateToYYYYMMDD(dates.start));
    adjustedStartDate.setDate(adjustedStartDate.getDate() + 1); // Sumar un día
    const adjustedEndDate = new Date(formatDateToYYYYMMDD(dates.end));
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // Sumar un día

    const dispatch = useAppDispatch();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const updatedEvent = await updateEvent({
        id: event.id,
        status: EVENT_STATE.REPROGRAMADO,
        start: adjustedStartDate,
        end: adjustedEndDate,
      }).unwrap();
      dispatch(setUpdateEvent(updatedEvent));

      refetch();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDates({
        ...dates,
        [name]: value,
      });
    };
    return (
      <>
        <form
          className="flex flex-col justify-evenly relative w-96"
          onSubmit={(e) => handleSubmit(e)}
        >
          <LoaderComponents isLoad={isLoading} />
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 ">
              <Button
                severity="warning"
                outlined
                label="Reprogramar"
                size="small"
                className="float-right mb-4"
                loading={isLoading}
                type="submit"
              />
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="">Reprogramar para</label>
                <InputText
                  name="start"
                  value={dates.start}
                  type="date"
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full mt-1",
                    },
                  }}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-span-12">
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="">Hasta</label>
                <InputText
                  value={dates.end}
                  type="date"
                  name="end"
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full mt-1",
                    },
                  }}
                  onChange={handleChange}
                  // onChange={(e) => setValue("start", parseDate(e.target.value))}
                />
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };

  const footerTemplate = (options: PanelFooterTemplateOptions) => {
    const isBeforeFriday = (date: Date): boolean => {
      const dayOfWeek = date.getDay();
      return dayOfWeek < 5; // Menor que 5 significa antes del viernes
    };

    const isEventInNextWeek = (eventDate: string): boolean => {
      const today = new Date();

      // Calculamos el inicio de la próxima semana
      const nextWeekStart = new Date(today);
      nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));

      // Calculamos el final de la próxima semana
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 5);

      // Convertimos las fechas a formato YYYY-MM-DD
      const formattedNextWeekStart = nextWeekStart.toISOString().split("T")[0];
      const formattedNextWeekEnd = nextWeekEnd.toISOString().split("T")[0];

      // Verificamos si eventDate está dentro de la próxima semana
      return (
        eventDate >= formattedNextWeekStart && eventDate <= formattedNextWeekEnd
      );
    };
    const canReprogram =
      isBeforeFriday(today) && isEventInNextWeek(event.start.toString());

    const className = `${options.className} flex flex-wrap items-center justify-between gap-3 p-2 ${eventColor.border} border-t-0 rounded-bl-md rounded-br-md`;
    const uniqueTechnicians = event.activities
      .map((activity) => activity.technical_detail)
      .filter(
        (technician, index, self) =>
          technician &&
          index === self.findIndex((t) => t && t.id === technician.id)
      )
      .map((technician) => ({
        id: technician?.id,
        username: `${technician?.first_name} ${technician?.last_name}`,
      }));
    return (
      <footer className={className}>
        <div className="flex items-center gap-2">
          <Button
            outlined
            label="Ver tecnicos asignados"
            size="small"
            severity="help"
            //@ts-ignore
            onClick={(e) => op.current?.toggle(e)}
          />
          <OverlayPanel ref={op}>
            <DataTable
              value={uniqueTechnicians}
              emptyMessage="Aún no tiene tecnicos asignados"
            >
              <Column field="username" header="Nombre" />
            </DataTable>
          </OverlayPanel>
          <OverlayPanel ref={reprogramButtonRef}>
            <ReprogramForm />
          </OverlayPanel>
          <div className="flex items-center justify-start ml-4">
            <div
              className={`${eventColor.badge_mark} w-2 h-2 rounded-full  mr-1`}
            ></div>
            <span className="dark:text-black">{event.status_detail.name}</span>
          </div>
        </div>
        {event.status_detail.id !== EVENT_STATE.COMPLETADO &&
          authUser?.user.role_detail.id !== 3 &&
          canReprogram && (
            <Button
              label="Reprogramar mantenimiento"
              severity="warning"
              outlined
              size="small"
              //@ts-ignore
              onClick={(e) => reprogramButtonRef.current?.toggle(e)}
            />
          )}
      </footer>
    );
  };

  return (
    <>
      <Panel
        headerTemplate={headerTemplate}
        footerTemplate={(e) => footerTemplate(e)}
        toggleable
        pt={{
          root: {
            className: "!w-full !shadow-md ",
          },
        }}
        collapsed={true}
      >
        <EventStepper event={event} />
      </Panel>
    </>
  );
}
