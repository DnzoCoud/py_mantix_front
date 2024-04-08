"use client";
import { IEvent } from "@/interfaces/IEvent";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";
import EventStepper from "./EventList/EventStepper";

export default function DialogEvent({
  eventInfo,
  visible,
  onClose,
}: {
  eventInfo: IEvent;
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Dialog
        header={eventInfo.title}
        visible={visible}
        onHide={onClose}
        draggable={false}
      >
        <EventStepper />
      </Dialog>
    </>
  );
}
