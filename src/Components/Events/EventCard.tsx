"use client";
import { Card } from "primereact/card";
import {
  Panel,
  PanelFooterTemplateOptions,
  PanelHeaderTemplateOptions,
} from "primereact/panel";
import React, { useRef } from "react";
import EventStepper from "./EventList/EventStepper";

export default function EventCard() {
  const configMenu = useRef<HTMLElement | null>(null);

  const headerTemplate = (options: PanelHeaderTemplateOptions) => {
    const className = `${options.className} justify-between bg-green-400 px-2 items-center p-4 rounded-tl-md rounded-tr-md`;

    return (
      <div className={className}>
        <div className="flex align-items-center gap-2 ">
          <span className="font-bold dark:text-black">
            Maquina de Lavado Culinary
          </span>
        </div>
        <div>
          <button
            className="p-panel-header-icon p-link mr-2"
            onClick={(e) => configMenu?.current?.toggle(e)}
          >
            <span className="pi pi-cog dark:text-black"></span>
          </button>
          {options.togglerElement}
        </div>
      </div>
    );
  };

  const footerTemplate = (options: PanelFooterTemplateOptions) => {
    const className = `${options.className} flex flex-wrap items-center justify-between gap-3 p-2 bg-green-200 rounded-bl-md rounded-br-md`;

    return (
      <div className={className}>
        <div className="flex items-center gap-2">
          <span className="dark:text-black">Lorenzo Fernandez</span>

          <div className="flex items-center justify-start ml-4">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
            <span className="dark:text-black">Completado</span>
          </div>
        </div>
        <span className="text-slate-300">Updated 2 hours ago</span>
      </div>
    );
  };
  return (
    <>
      <Panel
        headerTemplate={headerTemplate}
        footerTemplate={(e) => footerTemplate(e)}
        header="Header"
        toggleable
        pt={{
          root: {
            className: "!w-full shadow-md shadow-green-400",
          },
        }}
      >
        <EventStepper />
      </Panel>
    </>
  );
}
