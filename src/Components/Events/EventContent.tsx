"use client";
import { EventContentArg } from "@fullcalendar/core/index.js";
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
      <div className="bg-blue-500 shadow-lg shadow-blue-800 border-none cursor-pointer transition-all hover:bg-blue-600">
        <div className="flex justify-center items-center">
          {eventInfo.event.title}
        </div>
        <div className="p-2 text-wrap">
          <span>Daniel Esteban Rodriguez</span>
        </div>
      </div>
    </>
  );
}
