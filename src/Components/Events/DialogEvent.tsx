"use client";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import EventStepper from "./EventList/EventStepper";
import { useFindEventByIdQuery } from "@/redux/services/eventService";
import { skipToken } from "@reduxjs/toolkit/query";

export default function DialogEvent({
  eventInfo,
  visible,
  onClose,
}: {
  eventInfo?: number;
  visible: boolean;
  onClose: () => void;
}) {
  const { data, refetch } = useFindEventByIdQuery(
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
        header={"Evento"}
        visible={visible}
        onHide={onClose}
        draggable={false}
      >
        {data && <EventStepper event={data} />}
      </Dialog>
    </>
  );
}
