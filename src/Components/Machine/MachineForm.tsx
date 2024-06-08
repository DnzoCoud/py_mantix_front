import { ILocation } from "@/interfaces/ILocation";
import { IMaquina } from "@/interfaces/IMaquina";
import { setMachine } from "@/redux/features/machineSlice";
import { useFetchLocationsQuery } from "@/redux/services/locationService";
import {
  useAddMachineMutation,
  useFindMachineByIdQuery,
} from "@/redux/services/machineService";
import { skipToken } from "@reduxjs/toolkit/query";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { serialize } from "v8";

export default function MachineForm({ id }: { id?: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<IMaquina>();
  const name = watch("name", "")
  const model= watch("model", "")
  const serial = watch("serial", "")



  const [locations, setLocations] = useState<ILocation[]>([]);
  const [location, setLocation] = useState<ILocation | null>();
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const { data: fetchLocations, isLoading: locationLoading } =
    useFetchLocationsQuery();
  const { data: machine, isLoading: machineLoading } = useFindMachineByIdQuery(
    id ? { id } : skipToken
  );
  const dispatch = useDispatch();
  const [addMachine] = useAddMachineMutation();

  useEffect(() => {
    register("name", {required:"Este campo es obligatorio"})
    register("model", {required:"Este campo es obligatorio"})
    register("serial", {required:"Este campo es obligatorio"})


    if (fetchLocations) setLocations(fetchLocations);

    if (machine) {
      setValue("name", machine.name);
      setValue("model", machine.model);
      setValue("serial", machine.serial);
      setLocation(machine.location_detail);
    }
  }, [fetchLocations, machine]);

  const handleLocationChange = (event: ILocation | null) => {
    setLocation(event);
  };

  const onSubmit: SubmitHandler<IMaquina> = async (data) => {
    if (location) {
      await saveMachine(data.name, data.model, data.serial, location.id);
    }
  };
  const saveMachine = async (
    name: string,
    model: string,
    serial: string,
    location: number
  ) => {
    setSaveLoad(true);
    const savedMachine = await addMachine({
      name,
      model,
      serial,
      location,
    });
    if (savedMachine.data) dispatch(setMachine(savedMachine.data));

    setSaveLoad(false);
  };
  return (
    <>
      <form
        className="flex flex-col justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={name}
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  onChange={(e) => setValue("name", e.target.value)}
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Nombre de la maquina
                </label>
              </FloatLabel>
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <div className="col-span-12  md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={model}
                  maxLength={30}
                  onChange={(e) => setValue("model", e.target.value)}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                />
                <label
                  htmlFor="model"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Modelo
                </label>
              </FloatLabel>
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <div className="col-span-12  md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={serial}
                  onChange={(e) => setValue("serial", e.target.value)}
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                />
                <label
                  htmlFor="serial"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Serial
                </label>
              </FloatLabel>
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <div className="col-span-12  md:col-span-6">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <Dropdown
                  value={location}
                  options={locations}
                  optionLabel="name"
                  dataKey="id"
                  filter
                  pt={{
                    root: {
                      className: "selectMaquina",
                    },
                  }}
                  loading={locationLoading}
                  onChange={(e: DropdownChangeEvent) =>
                    handleLocationChange(e.value)
                  }
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Locacion
                </label>
              </FloatLabel>
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
                loading={saveLoad}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
