"use client";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { useFindEventByIdQuery } from "@/redux/services/eventService";
import { skipToken } from "@reduxjs/toolkit/query";
import { Skeleton } from "primereact/skeleton";
import dynamic from "next/dynamic";
const EventStepper = dynamic(() => import("./EventList/EventStepper"), {
  loading: () => <Skeleton height="12rem" />,
});
export default function DialogEvent({
  eventInfo,
  visible,
  onClose,
}: {
  eventInfo?: number;
  visible: boolean;
  onClose: () => void;
}) {
  const { data, refetch, isLoading } = useFindEventByIdQuery(
    eventInfo ? { id: eventInfo } : skipToken
  );

  // Refetch the data when eventInfo changes
  useEffect(() => {
    if (eventInfo) {
      refetch();
    }
  }, [eventInfo, refetch]);
  return (
    <>
      <Dialog
        header={!data ? "Mantenimiento" : `Mantenimiento #${data.code}`}
        visible={visible}
        onHide={onClose}
        draggable={false}
      >
        {isLoading ? (
          <Skeleton height="12rem" />
        ) : (
          <>{!isLoading && data && <EventStepper event={data} />}</>
        )}
      </Dialog>
    </>
  );
}
