"use client";
import { IEvent } from "@/interfaces/IEvent";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";

export default function DialogEvent({
  eventInfo,
  visible,
  onClose,
}: {
  eventInfo: IEvent;
  visible: boolean;
  onClose: () => void;
}) {
  const items: MenuItem[] = [
    {
      label: "Programado",
    },
    {
      label: "En Ejecucion",
    },
    {
      label: "Completado",
    },
  ];
  interface Country {
    name: string;
    code: string;
  }

  const countries: Country[] = [
    { name: "Autralia", code: "Au" },
    { name: "Colombia", code: "Co" },
    { name: "Peru", code: "Pe" },
  ];
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  return (
    <>
      <Dialog
        header={eventInfo.title}
        visible={visible}
        onHide={onClose}
        draggable={false}
      >
        <Steps model={items} />
        <div className="mt-4 w-11/12 flex flex-col tr">
          <Dropdown
            options={countries}
            filter
            optionLabel="name"
            placeholder="Seleccionar un tecnico"
            onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
            value={selectedCountry}
            showClear
            virtualScrollerOptions={{ itemSize: 38 }}
            pt={{
              virtualScroller: {
                root: {
                  className: "bg-dark_bg",
                },
              },
              item: {
                style: { height: "48px!important" },
                className: "ariaOption",
              },
            }}
          />
        </div>
      </Dialog>
    </>
  );
}
