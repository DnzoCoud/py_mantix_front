import React, { useEffect, useState } from "react";
import Label from "../Globals/Label";
import { InputText } from "primereact/inputtext";
import SelectDirectors from "../Globals/Selects/SelectDirectors";
import { IUser } from "@/interfaces/IUser";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { IArea } from "@/interfaces/IArea";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { useAreaStore } from "@/stores/useAreaStore";
import { useToastStore } from "@/stores/useToastStore";

export default function AreaForm({id}:{id?:number}) {
  const [director, setDirector] = useState<IUser | null>();
  const [area, setArea] = useState<IArea|null>(null)
  const areaStore = useAreaStore()
  const toastStore = useToastStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IArea>();
  const onSubmit: SubmitHandler<IArea> = async (data) => {
    if(director){
      await saveArea(data.name, director.id)
    }
  };

  const saveArea = async (name:string, director:number) => {
    try {
        await areaStore.saveArea(name, director)
        toastStore.setMessage("Area registrada correctamente", 2)
    } catch (error:any) {
        toastStore.setMessage("error.name", 1)
    }
  }

  const findAreaById = async (id:number) => {
    const area = await areaStore.getArea(id)
    console.log(area)
    if(area){
      setValue("name", area.name);
      setDirector(area.director_detail)
    }
  }

  useEffect(() => {
    if(id){
      findAreaById(id)
    }
  }, [id])
  return (
    <>
      <form
        className="flex flex-col justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
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
                placeholder="Nombre del area"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="w-full flex flex-col">
              <Label text="Director de area" isObligatory={true} idFor="" />
              <SelectDirectors
                value={director}
                onChange={setDirector}
              />
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
