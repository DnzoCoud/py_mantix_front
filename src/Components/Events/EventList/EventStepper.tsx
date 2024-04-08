"use client";
import React, { useRef, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Steps } from "primereact/steps";
import { MenuItem } from "primereact/menuitem";
import { PrimeIcons } from "primereact/api";
import EventFormProgram from "./EventFormProgram";
import EventFormExecute from "./EventFormExecute";
import EventFormComplete from "./EventFormComplete";
export default function EventStepper() {
  const items: MenuItem[] = [
    {
      label: "Programado",
      icon: PrimeIcons.CLOCK,
      template: (item) => itemRenderer(item, 0),
    },
    {
      label: "En Ejecucion",
      icon: PrimeIcons.STEP_BACKWARD,
      template: (item) => itemRenderer(item, 1),
    },
    {
      label: "Completado",
      icon: PrimeIcons.DOWNLOAD,
      template: (item) => itemRenderer(item, 2),
    },
    {
      label: "Reprogramado",
      icon: PrimeIcons.CALENDAR_MINUS,
      template: (item) => itemRenderer(item, 3),
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

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const itemRenderer = (item: MenuItem, itemIndex: number) => {
    const isActiveItem = activeIndex === itemIndex;
    let backgroundColor = isActiveItem ? "" : "bg-gray-200"; // Color de fondo predeterminado para los ítems no activos
    console.log(activeIndex);
    if (isActiveItem) {
      switch (activeIndex) {
        case 0:
          backgroundColor = "bg-gray-300"; // Color para el primer ítem activo
          break;
        case 1:
          backgroundColor = "bg-blue-300"; // Color para el segundo ítem activo
          break;
        case 2:
          backgroundColor = "bg-green-300"; // Color para el cuarto ítem activo
          break;
        case 3:
          backgroundColor = "bg-yellow-300"; // Color para el quinto ítem activo
          break;
        default:
          backgroundColor = ""; // Otros ítems activos no tendrán un color de fondo
          break;
      }
    }
    const textColor = isActiveItem
      ? "text-white dark:text-black"
      : "text-gray-400";

    return (
      <span
        className={`  inline-flex justify-center items-center border rounded-full h-12 w-12 z-10 cursor-pointer ${textColor} ${backgroundColor}`}
        onClick={() => setActiveIndex(itemIndex)}
      >
        <i className={`${item.icon} text-xl`} />
      </span>
    );
  };
  return (
    <>
      <Steps
        model={items}
        activeIndex={activeIndex}
        pt={{
          menuitem: {
            className: "before:!top-[50%]",
          },
        }}
      />
      <div className="mt-4 w-11/12 flex flex-col tr">
        {activeIndex == 0 && <EventFormProgram />}
        {activeIndex == 1 && <EventFormExecute />}
        {activeIndex == 2 && <EventFormComplete />}
        {/* <Dropdown
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
                className: "dark:bg-dark_bg bg-white",
              },
            },
            item: {
              style: { height: "48px!important" },
              className: "ariaOption",
            },
          }}
        /> */}
      </div>
    </>
  );
}
