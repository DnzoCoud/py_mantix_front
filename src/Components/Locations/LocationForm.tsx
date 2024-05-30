import React from "react";
import Label from "../Globals/Label";
import { useForm } from "react-hook-form";
import { ILocation } from "@/interfaces/ILocation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";

export default function LocationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILocation>();
  return (
    <>
      <form className="flex flex-col justify-evenly">
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 md:col-span-6 ">
            <div className="w-full flex flex-col">
              <Label text="Nombre del area" isObligatory={true} idFor="" />
              <InputText
                {...register("name", {
                  required: "Este Campo es obligatorio",
                  maxLength: 30,
                })}
                maxLength={30}
                placeholder="Nombre de la locacion"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <div className="col-span-12 mt-4">
            <div className="w-full flex justify-center items-center">
              <Button
                label="Guardar"
                icon={PrimeIcons.SAVE}
                size="small"
                severity="success"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
