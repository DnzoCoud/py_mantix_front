import { IEvent } from "@/interfaces/IEvent";
import { Dialog } from "primereact/dialog";
import React from "react";
import EventCard from "./EventCard";

export default function DialogEventList({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Dialog
        visible={visible}
        onHide={onClose}
        draggable={false}
        header="Mantenimientos Programados"
        style={{ width: "80vw" }}
      >
        <span>Listado de Eventos</span>
        <div className="flex flex-col justify-evenly">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
              <EventCard />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
              <EventCard />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
