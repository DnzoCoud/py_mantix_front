"use client";
import { getColorEvents } from "@/Utils/ColorEvents";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Tag } from "primereact/tag";
import React, { useEffect } from "react";

interface EventContentProps {
  eventInfo: EventContentArg;
}
export default function EventContent({ eventInfo }: EventContentProps) {
  const eventColor = getColorEvents(eventInfo.event.extendedProps.status.id);
  return (
    <>
      <div
        className={` flex flex-col items-start ${eventColor.border} bg-white dark:bg-dark_medium_bg rounded-2xl mb-4 transition-all ${eventColor.hover_background} w-full `}
      >
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
              <span className="text-xs font-light text-black">
                {eventInfo.event.extendedProps.status.name}
              </span>
            </div>
          </Tag>
        </div>
        {/* <div className="flex items-center justify-between mx-4">
          <AvatarGroup
            pt={{
              root: {
                className: "w-full flex justify-center items-center mt-4",
              },
            }}
          >
            <Avatar
              label="AR"
              size="large"
              shape="circle"
              pt={{
                root: {
                  className: "w-[2rem] h-[2rem]",
                },
              }}
            />
          </AvatarGroup>
        </div> */}
      </div>
    </>
  );
}
