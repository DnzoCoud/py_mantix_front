"use client";
import { Image } from "primereact/image";
import React, { useRef, useState } from "react";
import ImagenLogoEnterprise from "@/Components/Preferences/Company/Logo.png";
import { InputText } from "primereact/inputtext";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import Label from "@/Components/Globals/Label";
import { Messages } from "primereact/messages";
export default function CompanyForm() {
  const [company, setCompany] = useState<ICompany>({
    name: "",
    nit: "",
    phone: 0,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompany>();
  const onSubmit: SubmitHandler<ICompany> = (data) => console.log(data);
  return (
    <>
      <form
        className="flex flex-col justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 ">
            <Image src={ImagenLogoEnterprise.src} preview alt="Logo Empresa"/>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 ">
            <Label text="Nombre de la empresa" isObligatory={true} />
            <InputText
              {...register("name", {
                required: "Este Campo es obligatorio",
                maxLength: 40,
              })}
              maxLength={40}
              tooltip="Nombre de la empresa"
              tooltipOptions={{ position: "top" }}
              pt={{ root: { className: "!w-full" } }}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 ">
            <Label text="Nit" isObligatory={true} />
            <InputText
              {...register("nit", {
                required: "Este Campo es obligatorio",
                maxLength: 9,
              })}
              maxLength={9}
              tooltip="Nombre de la empresa"
              pt={{ root: { className: "!w-full" } }}
              tooltipOptions={{ position: "top" }}
            />
            {errors.nit && <span>{errors.nit.message}</span>}
          </div>
          <div className="col-span-12 mt-4">
            <div className="w-full flex justify-center items-center">
              <Button
                label="Guardar Cambios"
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
