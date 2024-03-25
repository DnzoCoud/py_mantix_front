import { IEvent } from "@/interfaces/IEvent";
import { Dialog } from "primereact/dialog";
import React from "react";

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
      >
        <span>Listado de Eventos</span>
      </Dialog>
    </>
  );
}
