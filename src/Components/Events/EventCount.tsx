"use client";
import { countEventsByStatus } from "@/redux/features/eventSlice";
import { useAppSelector } from "@/redux/hooks";
import { EVENT_STATE } from "@/Utils/constants";
import { Badge } from "primereact/badge";
import React from "react";
export default function EventCount() {
  const events = useAppSelector((state) => state.event.events);

  return (
    <div className="w-full p-4 flex items-center justify-evenly">
      <div className="flex items-center justify-start gap-4">
        <span>Programados</span>
        <Badge
          value={countEventsByStatus(events, EVENT_STATE.PROGRAMADO)}
          className="flex p-4 items-center bg-gray-500"
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <span>En ejecución</span>
        <Badge
          value={countEventsByStatus(events, EVENT_STATE.EN_EJECUCION)}
          className="flex p-4 items-center"
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <span>Completados</span>
        <Badge
          value={countEventsByStatus(events, EVENT_STATE.COMPLETADO)}
          className="flex p-4 items-center bg-green-400"
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <span>Reprogramados</span>
        <Badge
          value={countEventsByStatus(events, EVENT_STATE.REPROGRAMADO)}
          className="flex p-4 items-center bg-yellow-400"
        />
      </div>
    </div>
  );
}
