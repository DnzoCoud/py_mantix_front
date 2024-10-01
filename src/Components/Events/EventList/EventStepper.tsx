"use client";
import React, { useEffect, useState } from "react";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { PrimeIcons } from "primereact/api";
import { EVENT_STATE } from "@/Utils/constants";
import { IEvent } from "@/interfaces/IEvent";
import EventRequest from "./EventRquest";
import dynamic from "next/dynamic";
import { Skeleton } from "primereact/skeleton";

const EventFormProgram = dynamic(() => import("./EventFormProgram"), {
  loading: () => <Skeleton height="12rem" />,
});
const EventFormExecute = dynamic(() => import("./EventFormExecute"), {
  loading: () => <Skeleton height="12rem" />,
});
const EventFormComplete = dynamic(() => import("./EventFormComplete"), {
  loading: () => <Skeleton height="12rem" />,
});

export default function EventStepper({ event }: { event: IEvent }) {
  const eventStates = EVENT_STATE;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Actualiza el activeIndex cuando event cambia
  useEffect(() => {
    if (
      event.status_detail.id === EVENT_STATE.REPROGRAMADO &&
      event.history_status
    ) {
      setActiveIndex(event.history_status.previous_state.id);
    } else {
      setActiveIndex(event.status_detail.id);
    }
  }, [event]);

  const itemRenderer = (item: MenuItem, itemIndex: number) => {
    const isActiveItem = activeIndex === itemIndex;
    const isCompletedItem = itemIndex < activeIndex;
    let backgroundColor = isActiveItem
      ? ""
      : isCompletedItem
      ? "bg-black"
      : "bg-gray-200"; // Color de fondo predeterminado para los ítems no activos
    // console.log(activeIndex);
    if (isActiveItem) {
      switch (activeIndex) {
        case eventStates.PROGRAMADO:
          backgroundColor = "bg-gray-300"; // Color para el primer ítem activo
          break;
        case eventStates.EN_EJECUCION:
          backgroundColor = "bg-white border-2 border-black"; // Color para el segundo ítem activo
          break;
        case eventStates.COMPLETADO:
          backgroundColor = "bg-green-300"; // Color para el cuarto ítem activo
          break;
        case eventStates.REPROGRAMADO:
          backgroundColor = "bg-yellow-300"; // Color para el quinto ítem activo
          break;
        case eventStates.PETICION_REPROGRAMADO:
          backgroundColor = "bg-purple-500"; // Color para el quinto ítem activo
          break;
        default:
          backgroundColor = ""; // Otros ítems activos no tendrán un color de fondo
          break;
      }
    }
    const icon = isCompletedItem ? PrimeIcons.CHECK : item.icon;

    const textColor = isActiveItem
      ? "text-black dark:text-black"
      : isCompletedItem
      ? "text-white"
      : "text-gray-400";

    return (
      <div className="flex flex-col items-center justify-center">
        <span
          className={`inline-flex justify-center items-center border rounded-full h-12 w-12 z-10 cursor-pointer ${textColor} ${backgroundColor} pointer-events-none`}
        >
          <i className={`${icon} text-xl`} />
        </span>
        <small
          className={` ${isCompletedItem ? "text-zinc-300 " : "text-black"}`}
        >
          {item.label}
        </small>
      </div>
    );
  };

  const items: MenuItem[] = [
    {
      label: "Programado",
      icon: PrimeIcons.CLOCK,
      template: (item) => itemRenderer(item, eventStates.PROGRAMADO),
    },
    {
      label: "En Ejecucion",
      icon: PrimeIcons.STEP_BACKWARD,
      template: (item) => itemRenderer(item, eventStates.EN_EJECUCION),
    },
    {
      label: "Completado",
      icon: PrimeIcons.DOWNLOAD,
      template: (item) => itemRenderer(item, eventStates.COMPLETADO),
    },
    {
      label: "Reprogramado",
      icon: PrimeIcons.CALENDAR_MINUS,
      template: (item) => itemRenderer(item, eventStates.REPROGRAMADO),
    },
    {
      label: "Petición",
      icon: PrimeIcons.CALENDAR_TIMES,
      template: (item) => itemRenderer(item, eventStates.PETICION_REPROGRAMADO),
    },
  ];

  return (
    <>
      <Steps
        model={items}
        activeIndex={activeIndex}
        pt={{
          menuitem: {
            className: "before:!top-[40%]",
          },
        }}
      />
      <div className="mt-4 w-full flex flex-col tr">
        {activeIndex === eventStates.PROGRAMADO && (
          <EventFormProgram
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            event={event}
          />
        )}

        {activeIndex === eventStates.EN_EJECUCION && (
          <EventFormExecute
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            event={event}
          />
        )}

        {activeIndex === eventStates.COMPLETADO && (
          <EventFormComplete event={event} />
        )}

        {activeIndex === eventStates.PETICION_REPROGRAMADO && (
          <EventRequest event={event} />
        )}
      </div>
    </>
  );
}
