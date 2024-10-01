"use client";
import { getColorEvents } from "@/Utils/ColorEvents";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Tag } from "primereact/tag";
import React from "react";

interface EventContentProps {
  eventInfo: EventContentArg;
  isLoad?: boolean;
}
export default function EventContent({ eventInfo, isLoad }: EventContentProps) {
  const eventColor = getColorEvents(eventInfo.event.extendedProps.status.id);
  return (
    <>
      <div
        className={`relative flex flex-col items-start ${eventColor.border} bg-white dark:bg-dark_medium_bg rounded-2xl overflow-hidden mb-4 transition-all ${eventColor.hover_background} w-full `}
      >
        {isLoad && (
          <div className="absolute w-full h-full bg-zinc-200 backdrop-blur-sm bg-opacity-45 flex items-center justify-center">
            <i className={`pi pi-spinner animate-spin text-4xl text-black`} />
          </div>
        )}
        <div
          className={`flex items-center justify-between font-bold w-full px-4 py-2  rounded-tl-2xl rounded-tr-2xl`}
        >
          <div className={`flex items-center `}>
            <i className="pi pi-hashtag text-black mr-1"></i>
            <span className="text-black">
              {eventInfo.event.extendedProps.code}
            </span>
          </div>
          <span className="px-2 rounded-md bg-orange-400 font-light">
            {eventInfo.event.extendedProps.shift}
          </span>
        </div>
        <div className="flex items-center w-full mb-8 transition-all px-3">
          <i
            className={`${eventColor.icon} mr-2 p-2 rounded ${eventColor.textColor} dark:text-white ${eventColor.background}`}
          ></i>
          <h2
            className={`font-bold text-md text-black dark:text-white text-wrap ${eventColor.textColor}`}
          >
            {eventInfo.event.title}
          </h2>
        </div>
        <div className="px-3 mb-2">
          <Tag
            pt={{
              root: {
                className: `${eventColor.badges}`,
              },
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${eventColor.badge_mark}`}
              ></div>
              <span className="text-xs font-light text-black text-wrap">
                {eventInfo.event.extendedProps.status.name}
              </span>
            </div>
          </Tag>
        </div>
      </div>
    </>
  );
}
