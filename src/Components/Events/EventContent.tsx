"use client";
import { getColorEvents } from "@/Utils/ColorEvents";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Tag } from "primereact/tag";
import React, { useEffect } from "react";

interface EventContentProps {
  eventInfo: EventContentArg;
}
export default function EventContent({ eventInfo }: EventContentProps) {
  useEffect(() => {
    console.log(eventInfo);
    console.log("HOLAAAA")
  },[eventInfo]);
  const eventColor = getColorEvents(eventInfo.event.extendedProps.status.id)
  return (
    <>
      <div className={`p-2 flex flex-col items-start ${eventColor.background} dark:bg-dark_medium_bg cursor-pointer rounded-md transition-all hover:${eventColor.hover_background} w-full`}>
        <div className="flex items-center w-full mb-2">
          <i className="pi pi-wrench mr-2 text-black dark:text-white"></i>
          <h2 className="font-bold text-md text-black dark:text-white text-wrap">{eventInfo.event.title}</h2>
        </div>
        <Tag className={`${eventColor.badges}`}>
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${eventColor.badge_mark}`}></div>
                <span className="text-xs font-light">{eventInfo.event.extendedProps.status.name}</span>
            </div>
        </Tag>
      </div>
    </>
  );
}
