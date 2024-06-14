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
import {
  useAddLocationMutation,
  useFindLocationByIdQuery,
  useUpdateLocationMutation,
  useUploadLocationsMutation,
} from "@/redux/services/locationService";
import { useAppDispatch } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { setLocation, setUpdateLocation } from "@/redux/features/locationSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import LoaderComponents from "../Globals/Loader/LoaderComponents";
import { Fieldset } from "primereact/fieldset";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { getBase64 } from "@/Utils/useComposables";
import { useToastStore } from "@/stores/useToastStore";
import UploadErrors from "../Globals/UploadErrors";

export default function LocationForm({ id }: { id?: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILocation>();
  const [uploadErrors, setUploadErrors] = useState<
    { fila: number; columna: string; message: string }[]
  >([]);
  const [managers, setManagers] = useState<IUser[] | []>([]);
  const [manager, setManager] = useState<IUser | null>();
  const [areas, setAreas] = useState<IArea[] | []>([]);
  const [area, setArea] = useState<IArea | null>();
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const toastStore = useToastStore();
  const [uploadLocations] = useUploadLocationsMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const { data: fetchManagers, isLoading: managersLoading } =
    useFetchManagersQuery();
  const { data: fetchAreas, isLoading: areasLoading } = useFetchAreasQuery();
  const [addLocation] = useAddLocationMutation();
  const dispatch = useDispatch();
  const { data: location, isLoading: locationLoading } =
    useFindLocationByIdQuery(id ? { id } : skipToken);

  useEffect(() => {
    if (fetchManagers) setManagers(fetchManagers);
    if (fetchAreas) setAreas(fetchAreas);

    if (location) {
      setValue("name", location.name);
      setManager(location.manager_detail);
      setArea(location.area_detail);
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
    try {
      if (!id) {
        const savedLocation = await addLocation({
          name,
          area,
          manager,
        });
        if (savedLocation.data) dispatch(setLocation(savedLocation.data));
      } else {
        const locationUpdated = await updateLocation({
          name,
          area,
          manager,
        }).unwrap();
        if (locationUpdated) dispatch(setUpdateLocation(locationUpdated));
      }

      toastStore.setMessage(
        id
          ? "Locativo actualizado correctamente"
          : "Locativo registrado correctamente",
        toastStore.SUCCES_TOAST
      );
    } catch (error: any) {
      console.log(error);
      toastStore.setMessage(error.message, toastStore.ERROR_TOAST);
    } finally {
      setSaveLoad(false);
    }
  };

  const onUpload = async (event: FileUploadHandlerEvent) => {
    const files = event.files;
    if (files.length > 0) {
      setSaveLoad(true);
      try {
        const base64File = await getBase64(files[0]);
        const newLocations = await uploadLocations({
          excel_base64: base64File,
        }).unwrap();
        newLocations.map((locations) => {
          dispatch(setLocation(locations));
        });
        toastStore.setMessage("Cargue exitoso", toastStore.SUCCES_TOAST);
        // await uploadFile({ file: base64File });
        // console.log('File uploaded successfully', base64File);
      } catch (error:any) {
        setUploadErrors(error.data?.error || []);
        toastStore.setMessage(
          "Error durante el cargue",
          toastStore.ERROR_TOAST
        );
      } finally {
        setSaveLoad(false);
      }
    }
  };

  return (
    <>
      <form
        className="flex flex-col justify-evenly relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LoaderComponents isLoad={saveLoad} />

        <div className="grid grid-cols-12 gap-4 mt-4">
          {!id && (
            <div className="col-span-12 mb-4">
              <Fieldset legend="Cargue Masivo" toggleable>
                {uploadErrors.length > 0 && (
                  <UploadErrors errors={uploadErrors} />
                )}
                <FileUpload
                  uploadLabel="Subir Archivo"
                  chooseLabel="Cargue Masivo"
                  cancelLabel="Cancelar"
                  mode="advanced"
                  name="demo[]"
                  accept=".xls,.xlsx"
                  maxFileSize={1000000}
                  customUpload
                  uploadHandler={onUpload}
                  emptyTemplate={
                    <p className="m-0">Arrastra y suelta el archivo a subir.</p>
                  }
                  pt={{
                    chooseButton: {
                      className: "!bg-green-400",
                    },
                    progressbar: {
                      root: {
                        className: "hidden",
                      },
                    },
                    badge: {
                      root: {
                        className: "hidden",
                      },
                    },
                  }}
                />
              </Fieldset>
            </div>
          )}
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
