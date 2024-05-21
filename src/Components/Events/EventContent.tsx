"use client";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Tag } from "primereact/tag";
import React, { useEffect } from "react";

interface EventContentProps {
  eventInfo: EventContentArg;
}
export default function EventContent({ eventInfo }: EventContentProps) {
  useEffect(() => {
    console.log(eventInfo);
  });
  return (
    <>
      <div className="p-2 flex flex-col items-start bg-gray-300 dark:bg-dark_medium_bg cursor-pointer rounded-md transition-all hover:bg-gray-400">
        <div className="flex items-center w-full mb-2">
          <i className="pi pi-wrench mr-2 text-black dark:text-white"></i>
          <h2 className="font-bold text-md text-black dark:text-white">{eventInfo.event.title}</h2>
        </div>
        <Tag className="bg-gray-500">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <span className="text-xs font-light">Programado</span>
            </div>
        </Tag>
      </div>
    </>
  );
}
