"use client";
import React, { useState } from "react";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { PrimeIcons } from "primereact/api";
import EventFormProgram from "./EventFormProgram";
import EventFormExecute from "./EventFormExecute";
import EventFormComplete from "./EventFormComplete";
import { EVENT_STATE } from "@/Utils/constants";
import { IEvent } from "@/interfaces/IEvent";
import EventRequest from "./EventRquest";

export default function EventStepper({ event }: { event: IEvent }) {
  const eventStates = EVENT_STATE;
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (
      event.status_detail.id === EVENT_STATE.REPROGRAMADO &&
      event.history_status
    ) {
      return event.history_status.previous_state.id;
    } else {
      return event.status_detail.id;
    }
  });

  const itemRenderer = (item: MenuItem, itemIndex: number) => {
    const isActiveItem = activeIndex === itemIndex;
    const isCompletedItem = itemIndex < activeIndex;
    let backgroundColor = isActiveItem
      ? ""
      : isCompletedItem
      ? "bg-blue-200"
      : "bg-gray-200"; // Color de fondo predeterminado para los ítems no activos
    // console.log(activeIndex);
    if (isActiveItem) {
      switch (activeIndex) {
        case eventStates.PROGRAMADO:
          backgroundColor = "bg-gray-300"; // Color para el primer ítem activo
          break;
        case eventStates.EN_EJECUCION:
          backgroundColor = "bg-blue-300"; // Color para el segundo ítem activo
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
      ? "text-white dark:text-black"
      : isCompletedItem
      ? "text-blue-600"
      : "text-gray-400";

    return (
      <div className="flex flex-col items-center justify-center">
        <span
          className={`inline-flex justify-center items-center border rounded-full h-12 w-12 z-10 cursor-pointer ${textColor} ${backgroundColor} pointer-events-none`}
          onClick={() => setActiveIndex(itemIndex)}
        >
          <i className={`${icon} text-xl`} />
        </span>
        <small className="text-zinc-300 ">{item.label}</small>
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
            className: "before:!top-[50%]",
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
