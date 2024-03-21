"use client";
import { IEvent } from "@/interfaces/IEvent";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";

export default function DialogEvent({
  eventInfo,
  visibleProps,
}: {
  eventInfo: IEvent;
  visibleProps: boolean;
}) {
  const [dialogVisible, setDialogVisible] = useState<boolean>(visibleProps);
  useEffect(() => {
    setDialogVisible(visibleProps);
  }, [visibleProps]);

  return (
    <>
      <Dialog
        header={eventInfo.title}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        resizable={false}
      >
        <h1>Evento en modal</h1>
      </Dialog>
    </>
  );
}
