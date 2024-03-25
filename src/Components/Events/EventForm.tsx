import { IMaquina } from "@/interfaces/IMaquina";
import { PrimeIcons, addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import SelectMaquina from "../Globals/Selects/SelectsMaquina";
import { DropdownChangeEvent } from "primereact/dropdown";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import Label from "../Globals/Label";
import { Button } from "primereact/button";

export default function EventForm() {
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });
  const [selectMaquina, setSelectMaquina] = useState<IMaquina | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  const handleMachineChange = (value: IMaquina | null) => {
    setSelectMaquina(value);
    console.log(value);
  };
  return (
    <>
      <div className="flex flex-col justify-evenly">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <div className="w-full flex flex-col">
              <Label text="Fecha inicio" isObligatory={true} idFor="" />
              <Calendar
                placeholder="Fecha Inicial"
                locale="es"
                pt={{
                  root: {
                    className: "inputCalendar",
                  },
                }}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <div className="w-full flex flex-col">
              <Label text="Fecha fin" isObligatory={true} idFor="" />
              <Calendar
                placeholder="Fecha Final"
                locale="es"
                pt={{
                  root: {
                    className: "inputCalendar",
                  },
                }}
              />
            </div>
          </div>
          <div className="col-span-12 ">
            <div className="w-full flex flex-col">
              <Label text="Descripcion" isObligatory={true} idFor="" />
              <InputTextarea
                autoResize
                placeholder="Descripcion del mantenimiento"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <div className="w-full flex flex-col">
              <Label text="Maquina" isObligatory={true} idFor="" />
              <SelectMaquina
                value={selectMaquina}
                onChange={handleMachineChange}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <div className="w-full flex flex-col">
              <label htmlFor="" className="mb-1"></label>
              <Label
                text="Sera realizado por un tercero?"
                isObligatory={true}
                idFor=""
              />
              <InputSwitch
                checked={checked}
                onChange={(e: InputSwitchChangeEvent) => setChecked(e.value)}
              />
            </div>
          </div>
          <div className="col-span-12 mt-4">
            <div className="w-full flex justify-center items-center">
              <Button
                label="Agregar Mantenimiento"
                icon={PrimeIcons.SAVE}
                size="small"
                severity="success"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
