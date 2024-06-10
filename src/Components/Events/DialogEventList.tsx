"use client";
import { IEvent } from "@/interfaces/IEvent";
import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import EventCard from "./EventCard";
import { skipToken } from "@reduxjs/toolkit/query";
import { useFindEventsByDayQuery } from "@/redux/services/eventService";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { setEventsByDay } from "@/redux/features/eventSlice";

interface DialogEventListProps {
  visible: boolean;
  onClose: () => void;
  dateSelected: Date | string;
}

export default function DialogEventList({
  visible,
  onClose,
  dateSelected,
}: DialogEventListProps) {
  const dispatch = useDispatch();
  const { data: fetchEventsByDay, isLoading: eventsByDayLoading } =
    useFindEventsByDayQuery(
      dateSelected ? { date: dateSelected.toString() } : skipToken
    );
  const eventsByDay = useAppSelector((state) => state.event.eventsByDay);
  useEffect(() => {
    if (fetchEventsByDay) dispatch(setEventsByDay(fetchEventsByDay));
  }, [fetchEventsByDay, dispatch]);
  return (
    <>
      <Dialog
        visible={visible}
        onHide={onClose}
        draggable={false}
        header={`Mantenimientos Programados ${dateSelected.toString()}`}
        style={{ width: "80vw" }}
        maximizable={true}
      >
        <div className="flex flex-col justify-evenly">
          <div className="grid grid-cols-12 gap-4">
            {eventsByDay &&
              eventsByDay.map((event, index) => (
                <>
                  <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
                    <EventCard key={index} event={event} />
                  </div>
                </>
              ))}
          </div>
        </div>
      </Dialog>
    </>
  );
}
