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
import { Skeleton } from "primereact/skeleton";
import { classNames } from "primereact/utils";

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
  const {
    data: fetchEventsByDay,
    isLoading: eventsByDayLoading,
    refetch,
  } = useFindEventsByDayQuery(
    dateSelected ? { date: dateSelected.toString() } : skipToken
  );

  useEffect(() => {
    if (fetchEventsByDay) {
      dispatch(setEventsByDay(fetchEventsByDay));
    }
  }, [fetchEventsByDay, dispatch]);

  useEffect(() => {
    // Forzar refetch cada vez que el componente se monta
    if (visible) {
      refetch();
    }
  }, [visible, dateSelected]);

  const eventsByDay = useAppSelector((state) => state.event.eventsByDay);

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
            {eventsByDayLoading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <div
                    className="col-span-12 md:col-span-6 lg:col-span-6"
                    key={index}
                  >
                    <Skeleton
                      width="100%"
                      height="100px"
                      pt={{
                        root: ({ props }: { props: any }) => ({
                          className: classNames(
                            "overflow-hidden",
                            "!mb-2",
                            "bg-gray-300 dark:bg-gray-800",
                            "after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-blue-100 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse",
                            {
                              "rounded-md": props.shape !== "circle",
                            }
                          ),
                        }),
                      }}
                    ></Skeleton>
                  </div>
                ))}
              </>
            ) : (
              <>
                {eventsByDay &&
                  eventsByDay.map((event, index) => (
                    <div
                      className="col-span-12 md:col-span-6 lg:col-span-6"
                      key={index}
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
