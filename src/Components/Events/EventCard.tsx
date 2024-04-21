"use client";
import { Card } from "primereact/card";
import {
  Panel,
  PanelFooterTemplateOptions,
  PanelHeaderTemplateOptions,
} from "primereact/panel";
import React, { useRef } from "react";
import EventStepper from "./EventList/EventStepper";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { getColorEvents } from "@/Utils/ColorEvents";
import { Tag } from "primereact/tag";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";

export default function EventCard() {
  const configMenu = useRef<HTMLElement | null>(null);
  const eventColor = getColorEvents(2);
  const menuRight = useRef<Menu>(null);
  const headerTemplate = (options: PanelHeaderTemplateOptions) => {
    const className = `${options.className} justify-between ${eventColor.background} px-2 items-center p-4 rounded-tl-md rounded-tr-md`;
    const menuPopup: MenuItem[] = [
      {
        label: "Opciones",
        items: [
          {
            label: "Sugerir reprogramacion",
            icon: "pi pi-refresh",
          },
        ],
      },
    ];
    return (
      <div className={className} onClick={(e) => configMenu?.current?.toggle(e)}>
        <Menu
          model={menuPopup}
          popup
          ref={menuRight}
          id="popup_menu_right"
          popupAlignment="right"
        />
        <div className="flex items-center gap-2 ">
          <span className="font-bold dark:text-black">
            Maquina de Lavado Culinary
          </span>
          <Tag severity="warning" value="A" data-pr-tooltip="Turno" />
        </div>
        <div>
          <button
            className="p-panel-header-icon p-link mr-2"
            onClick={(e) => configMenu?.current?.toggle(e)}
          >
            <span
              className="pi pi-cog dark:text-black"
              onClick={(event) => menuRight.current?.toggle(event)}
              aria-controls="popup_menu_right"
              aria-haspopup
            ></span>
          </button>
          {options.togglerElement}
        </div>
      </div>
    );
  };

  const footerTemplate = (options: PanelFooterTemplateOptions) => {
    const className = `${options.className} flex flex-wrap items-center justify-between gap-3 p-2 ${eventColor.light_background} rounded-bl-md rounded-br-md`;

    return (
      <div className={className}>
        <div className="flex items-center gap-2">
          <span className="dark:text-black font-bold">
            Daniel Esteban Rodriguez Velasco
          </span>

          <div className="flex items-center justify-start ml-4">
            <div
              className={`${eventColor.background} w-2 h-2 rounded-full  mr-1`}
            ></div>
            <span className="dark:text-black">
              Estado actual del mantenimiento
            </span>
          </div>
        </div>
        <Button
          label="Reprogramar mantenimiento"
          severity="warning"
          outlined
          size="small"
        />
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
            className: "!w-full !shadow-md " + eventColor.shadow,
          },
        }}
        collapsed={true}

      >
        <EventStepper />
      </Panel>
    </>
  );
}
