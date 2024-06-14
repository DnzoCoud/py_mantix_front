import { ILocation } from "@/interfaces/ILocation";
import { IMaquina } from "@/interfaces/IMaquina";
import { setMachine, setUpdateMachine } from "@/redux/features/machineSlice";
import { useFetchLocationsQuery } from "@/redux/services/locationService";
import {
  useAddMachineMutation,
  useFindMachineByIdQuery,
  useUpdateMachineMutation,
  useUploadMachinesMutation,
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
import LoaderComponents from "../Globals/Loader/LoaderComponents";
import { Fieldset } from "primereact/fieldset";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { useToastStore } from "@/stores/useToastStore";
import { getBase64 } from "@/Utils/useComposables";
import UploadErrors from "../Globals/UploadErrors";

export default function MachineForm({ id }: { id?: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IMaquina>();
  const name = watch("name", "");
  const model = watch("model", "");
  const serial = watch("serial", "");

  const toastStore = useToastStore();
  const [uploadMachines] = useUploadMachinesMutation();
  const [updateMachine] = useUpdateMachineMutation();
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
  const [uploadErrors, setUploadErrors] = useState<
  { fila: number; columna: string; message: string }[]
  >([]);

  useEffect(() => {
    register("name", { required: "Este campo es obligatorio" });
    register("model", { required: "Este campo es obligatorio" });
    register("serial", { required: "Este campo es obligatorio" });

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
    try {
      if (!id) {
        const savedMachine = await addMachine({
          name,
          model,
          serial,
          location,
        });
        if (savedMachine.data) dispatch(setMachine(savedMachine.data));
      } else {
        const machineUpdated = await updateMachine({
          id,
          name,
          model,
          serial,
          location,
        }).unwrap();
        if (machineUpdated) dispatch(setUpdateMachine(machineUpdated));
      }

      toastStore.setMessage(
        id
          ? "Maquina actualizada correctamente"
          : "Maquina registrada correctamente",
        toastStore.SUCCES_TOAST
      );
    } catch (error: any) {
      console.log(error);
      toastStore.setMessage(error.message, toastStore.ERROR_TOAST);
    } finally {
      setSaveLoad(false);
    }
    setSaveLoad(false);
  };
  const onUpload = async (event: FileUploadHandlerEvent) => {
    const files = event.files;
    if (files.length > 0) {
      setSaveLoad(true);
      try {
        const base64File = await getBase64(files[0]);
        const newMachines = await uploadMachines({
          excel_base64: base64File,
        }).unwrap();
        newMachines.map((machine) => {
          dispatch(setMachine(machine));
        });
        toastStore.setMessage("Cargue exitoso", toastStore.SUCCES_TOAST);
        // await uploadFile({ file: base64File });
        // console.log('File uploaded successfully', base64File);
      } catch (error:any) {
        console.error("Error uploading file:", error);
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
        className="flex flex-col justify-evenly"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LoaderComponents isLoad={saveLoad} />

        <div className="grid grid-cols-12 gap-4 mt-4">
          {!id && (
            <div className="col-span-12 mb-4">
              <Fieldset legend="Cargue Masivo" toggleable>
              {uploadErrors.length > 0 && <UploadErrors errors={uploadErrors} />}
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
