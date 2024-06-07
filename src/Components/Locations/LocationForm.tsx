import React, { useEffect, useState } from "react";
import Label from "../Globals/Label";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILocation } from "@/interfaces/ILocation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { IUser } from "@/interfaces/IUser";
import { useFetchManagersQuery } from "@/redux/services/userService";
import { useFetchAreasQuery } from "@/redux/services/areaService";
import { IArea } from "@/interfaces/IArea";
import { useAddLocationMutation, useFindLocationByIdQuery } from "@/redux/services/locationService";
import { useAppDispatch } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setLocation } from "@/redux/features/locationSlice";
import { skipToken } from "@reduxjs/toolkit/query";

export default function LocationForm({ id }: { id?: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILocation>();
  const [managers, setManagers] = useState<IUser[] | []>([]);
  const [manager, setManager] = useState<IUser | null>();
  const [areas, setAreas] = useState<IArea[] | []>([]);
  const [area, setArea] = useState<IArea | null>();
  const [saveLoad, setSaveLoad] = useState<boolean>(false);

  const { data: fetchManagers, isLoading: managersLoading } =
    useFetchManagersQuery();
  const { data: fetchAreas, isLoading: areasLoading } = useFetchAreasQuery();
  const [addLocation] = useAddLocationMutation();
  const dispatch = useDispatch();
  const {data:location, isLoading:locationLoading} = useFindLocationByIdQuery(id ? { id } : skipToken)

  useEffect(() => {
    if (fetchManagers) setManagers(fetchManagers);
    if (fetchAreas) setAreas(fetchAreas);

    if(location){
      setValue("name", location.name);
      setManager(location.manager_detail);
      setArea(location.area_detail)
    }
  }, [fetchManagers, fetchAreas, location]);

  const handleAreaChange = (event: IArea | null) => {
    setArea(event);
  };
  const handleManagerChange = (event: IUser | null) => {
    setManager(event);
  };

  const onSubmit: SubmitHandler<ILocation> = async (data) => {
    if (manager) {
      if (area) await saveLocation(data.name, manager.id, area.id);
    }
  };
  const saveLocation = async (name: string, manager: number, area: number) => {
    setSaveLoad(true);
    const savedLocation = await addLocation({
      name,
      area,
      manager,
    });
    if (savedLocation.data) dispatch(setLocation(savedLocation.data));

    setSaveLoad(false);
  };

  return (
    <>
      <form
        className="flex flex-col justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  {...register("name", {
                    required: "Este Campo es obligatorio",
                    maxLength: 30,
                  })}
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Nombre de la locacion
                </label>
              </FloatLabel>
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <Dropdown
                  value={area}
                  options={areas}
                  optionLabel="name"
                  dataKey="id"
                  filter
                  pt={{
                    root: {
                      className: "selectMaquina",
                    },
                  }}
                  loading={areasLoading || locationLoading}
                  onChange={(e: DropdownChangeEvent) =>
                    handleAreaChange(e.value)
                  }
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Area de ubicacion
                </label>
              </FloatLabel>
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <Dropdown
                  value={manager}
                  options={managers}
                  optionLabel="username"
                  dataKey="id"
                  filter
                  pt={{
                    root: {
                      className: "selectMaquina",
                    },
                  }}
                  loading={managersLoading || locationLoading}
                  onChange={(e: DropdownChangeEvent) =>
                    handleManagerChange(e.value)
                  }
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Lider de locacion
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
