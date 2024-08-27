"use client";
import { countEventsByStatus } from "@/redux/features/eventSlice";
import { useAppSelector } from "@/redux/hooks";
import { allowedEjecuteRoles, EVENT_STATE } from "@/Utils/constants";
import { Badge } from "primereact/badge";
import React from "react";
import AnimatedCounter from "../Globals/AnimatedCont";
export default function EventCount() {
  const eventsByStatus = useAppSelector((state) => state.event.eventsByStatus);
  const authUser = useAppSelector((state) => state.auth.authUser);

  return (
    <div className="w-full p-4 flex items-center justify-evenly">
      <div className="flex items-center justify-start gap-4">
        <span>Programados</span>
        <Badge
          value={eventsByStatus["PROGRAMADO"] ?? 0}
          className="flex p-4 items-center bg-gray-500"
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <span>En ejecución</span>
        <Badge
          value={eventsByStatus["EN_EJECUCION"] ?? 0}
          className="flex p-4 items-center"
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <span>Completados</span>
        <Badge
          value={eventsByStatus["COMPLETADO"] ?? 0}
          className="flex p-4 items-center bg-green-400"
        />
      </div>
      <div className="flex items-center justify-start gap-4">
        <span>Reprogramados</span>
        <AnimatedCounter
          targetNumber={eventsByStatus["REPROGRAMADO"] ?? 0}
          duration={900}
          className="flex p-4 items-center bg-yellow-400"
        />
      </div>
      {allowedEjecuteRoles.includes(authUser?.user.role_detail.id ?? 0) && (
        <div className="flex items-center justify-start gap-4">
          <span>Sugeridos por reprogramar</span>
          <Badge
            value={eventsByStatus["PETICION_REPROGRAMADO"] ?? 0}
            className="flex p-4 items-center bg-purple-500"
          />
        </div>
      )}
    </div>
  );
}
