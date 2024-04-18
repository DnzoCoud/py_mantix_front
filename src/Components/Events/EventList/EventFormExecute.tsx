import Label from "@/Components/Globals/Label";
import { IEventFormChange } from "@/interfaces/Props/IEventFormChange";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
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

        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12">
            <div className="w-full flex flex-col">
              <Label text="Actividades" isObligatory={true} idFor="" />
              <InputTextarea
                autoResize
                rows={2}
                cols={30}
              />
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col">
              <Label text="Causas" isObligatory={true} idFor="" />
              <InputTextarea
                autoResize
                rows={2}
                cols={30}
              />
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col">
              <Label text="Observaciones" isObligatory={true} idFor="" />
              <InputTextarea
                autoResize
                rows={2}
                cols={30}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
