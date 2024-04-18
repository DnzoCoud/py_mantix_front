import { IEventFormChange } from "@/interfaces/Props/IEventFormChange";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import React from "react";

export default function EventFormExecute({
  setActiveIndex,
  activeIndex,
}: IEventFormChange) {
  return (
    <>
      <div className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <Button
            label="Atras"
            size="small"
            outlined
            icon={PrimeIcons.ARROW_LEFT}
            severity="secondary"
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
          <div className="flex itemss-center justify-center">
            <div className="h-3 w-3 bg-blue-400 rounded-full mr-2"></div>
            <span>Mantenimiento en ejecución</span>
          </div>
          <Button
            label="Completar Mantenimiento"
            size="small"
            outlined
            icon={PrimeIcons.ARROW_RIGHT}
            severity="success"
            onClick={() => setActiveIndex(activeIndex + 1)}
          />
        </div>
      </div>
    </>
  );
}
