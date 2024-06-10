"use client";
import Label from "@/Components/Globals/Label";
import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { IEventFormChange } from "@/interfaces/Props/IEventFormChange";

export default function EventFormProgram({
  setActiveIndex,
  activeIndex,
  idEvent
}: IEventFormChange) {
  const [text, setText] = useState<string>("");

  const handleExecute = (): void => {
    setActiveIndex(activeIndex + 1);
  };
  return (
    <>
      <div className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-800 rounded-full mr-2"></div>
            <span>Mantenimiento Programado</span>
          </div>
          <Button
            label="Empezar ejecucion"
            icon={PrimeIcons.ARROW_RIGHT}
            size="small"
            outlined
            onClick={handleExecute}
          />
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12">
            <div className="w-full flex flex-col">
              <Label text="Diagnostico" isObligatory={true} idFor="" />
              <InputTextarea
                autoResize
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
                rows={2}
                cols={30}
              />
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col">
              <Label text="Trabajo a realizar" isObligatory={true} idFor="" />
              <InputTextarea
                autoResize
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
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
