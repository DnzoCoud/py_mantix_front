import { Maintenancehistory } from "@/interfaces/IEvent";
import { IUser } from "@/interfaces/IUser";
import { useGetHistoryForMachineQuery } from "@/redux/services/eventService";
import { getColorEvents, getSolidColorEvents } from "@/Utils/ColorEvents";
import { skipToken } from "@reduxjs/toolkit/query";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Timeline } from "primereact/timeline";
import React, { useEffect, useState } from "react";

interface TimelineEvent {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  user: IUser;
}

export default function MachineHistory({ id }: { id: number }) {
  const [machineHistory, setMachineHistory] = useState<Maintenancehistory[]>(
    []
  );
  const { data, isLoading } = useGetHistoryForMachineQuery({
    machine: id,
  });
  useEffect(() => {
    if (data) setMachineHistory(data);
  }, [id, data]);

  function formatDateToSpanish(dateStr: string): string {
    // Convierte la cadena a un objeto Date
    const date = new Date(dateStr);

    // Configuración de opciones para formatear la fecha
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long", // 'long' para el nombre completo del mes, 'short' para abreviado
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    // Formatea la fecha en español
    return date.toLocaleDateString("es-ES", options);
  }

  const events: TimelineEvent[] = machineHistory.map((history) => ({
    status: history.description,
    date: formatDateToSpanish(history.maintenance_date),
    icon: history.status.icon,
    color: getSolidColorEvents(history.status.id),
    user: history.performed_by,
  }));
  // {
  //   status: "Ordered",
  //   date: "15/10/2020 10:30",
  //   icon: "pi pi-shopping-cart",
  //   color: "#9C27B0",
  //   image: "game-controller.jpg",
  // },
  // {
  //   status: "Processing",
  //   date: "15/10/2020 14:00",
  //   icon: "pi pi-cog",
  //   color: "#673AB7",
  // },
  // {
  //   status: "Shipped",
  //   date: "15/10/2020 16:15",
  //   icon: "pi pi-shopping-cart",
  //   color: "#FF9800",
  // },
  // {
  //   status: "Delivered",
  //   date: "16/10/2020 10:00",
  //   icon: "pi pi-check",
  //   color: "#607D8B",
  // },
  const customizedMarker = (item: TimelineEvent) => {
    return (
      <span
        className={`flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1 p-2 rounded-full ${item.color}`}
      >
        <i className={item.icon}></i>
      </span>
    );
  };
  const customizedContent = (item: TimelineEvent) => {
    return (
      <Card title={item.status} subTitle={item.date}>
        {item.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${item.image}`}
            alt={item.image}
            width={200}
            className="shadow-1"
          />
        )}
        <span>
          {item.user.first_name} {item.user.last_name}
        </span>
      </Card>
    );
  };
  return (
    <div className="flex w-full flex-col">
      {isLoading && (
        <div className="flex w-full items-center justify-around gap-4">
          <Skeleton className="p-4 w-1/2" />
          <Skeleton className="p-4 w-1/2" />
        </div>
      )}
      {!isLoading && (
        <Timeline
          value={events}
          align="alternate"
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
        />
      )}
      {!isLoading && machineHistory.length <= 0 && (
        <p className="inline-block p-2 bg-purple-200">
          Aun no se registra historial para esta maquina
        </p>
      )}
    </div>
  );
}
