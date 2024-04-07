"use client";
import React, { useState } from "react";
import Calendar from "@/Components/Events/Calendar";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { Dialog } from "primereact/dialog";
import EventForm from "@/Components/Events/EventForm";
import Headers from "@/Components/Globals/Headers";
export default function CalendarPage() {
  const [activateAdd, setActivateAdd] = useState<boolean>(false);

  return (
    <>
      <div>
        <div className="flex items-center justify-between my-4 px-4">
          <Headers
            title="Programa de mantenimientos Preventivos"
            subtitle="Mantenimientos programados"
            icon={PrimeIcons.CALENDAR}
          />
          <Button
            label="Agregar Mantenimiento"
            icon={PrimeIcons.PLUS}
            size="small"
            severity="success"
            onClick={() => setActivateAdd(true)}
          />
        </div>
        <Calendar />
      </div>
      <Dialog
        header="Agregar Mantenimiento"
        visible={activateAdd}
        onHide={() => setActivateAdd(false)}
        style={{ width: "70vw" }}
        pt={{
          content: {
            className: "max-h-[40rem]",
          },
          root: {
            className: "dark:bg-dark_medium_bg",
          },
        }}
      >
        <EventForm />
      </Dialog>
    </>
  );
}
