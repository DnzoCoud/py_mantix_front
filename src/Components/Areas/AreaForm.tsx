import React, { useCallback, useEffect, useState } from "react";
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
import { fetchErrors } from "@/Utils/manageError";
import {
  useAddAreaMutation,
  useFindAreaByIdQuery,
  useUpdateAreaMutation,
  useUploadAreasMutation,
} from "@/redux/services/areaService";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { setArea, setUpdateArea } from "@/redux/features/areaSlice";
import { Fieldset } from "primereact/fieldset";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { getBase64 } from "@/Utils/useComposables";
import LoaderComponents from "../Globals/Loader/LoaderComponents";
import UploadErrors from "../Globals/UploadErrors";

export default function AreaForm({ id }: { id?: number }) {
  const [director, setDirector] = useState<IUser | null>();
  // const [area, setArea] = useState<IArea|null>(null)
  // const areaStore = useAreaStore();
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const [uploadErrors, setUploadErrors] = useState<
    { fila: number; columna: string; message: string }[]
  >([]);

  const toastStore = useToastStore();
  const dispatch = useDispatch();
  const [uploadAreas] = useUploadAreasMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IArea>();

  const [addArea] = useAddAreaMutation();
  const [updateArea] = useUpdateAreaMutation();
  const { data: area, isLoading } = useFindAreaByIdQuery(
    id ? { id } : skipToken
  );

  const onSubmit: SubmitHandler<IArea> = async (data) => {
    if (director) {
      await saveArea(data.name, director.id);
    }
  };

  const saveArea = async (name: string, director: number) => {
    setSaveLoad(true);
    try {
      if (!id) {
        const areaSaved = await addArea({
          name,
          director,
        });
        if (areaSaved.data) dispatch(setArea(areaSaved.data));
      } else {
        const areaUpdated = await updateArea({
          id,
          name,
          director,
        }).unwrap();
        if (areaUpdated) dispatch(setUpdateArea(areaUpdated));
      }
      toastStore.setMessage(
        id ? "Area actualizada correctamente" : "Area registrada correctamente",
        toastStore.SUCCES_TOAST
      );
    } catch (error: any) {
      console.log(error);
      toastStore.setMessage(error.message, toastStore.ERROR_TOAST);
    } finally {
      setSaveLoad(false);
    }
  };

  // const findAreaById = useCallback(async (id:number) => {
  //   const area = await areaStore.getArea(id)
  //   console.log(area)
  //   if(area){
  //     setValue("name", area.name);
  //     setDirector(area.director_detail)
  //   }
  // }, [areaStore, setValue])

  useEffect(() => {
    if (area) {
      setValue("name", area.name);
      setDirector(area.director_detail);
      console.log("Rebuild area");
    }
  }, [area, setValue]);

  const onUpload = async (event: FileUploadHandlerEvent) => {
    const files = event.files;
    if (files.length > 0) {
      setSaveLoad(true);
      try {
        const base64File = await getBase64(files[0]);
        const newAreas = await uploadAreas({
          excel_base64: base64File,
        }).unwrap();
        newAreas.map((area) => {
          dispatch(setArea(area));
        });
        toastStore.setMessage("Cargue exitoso", toastStore.SUCCES_TOAST);
        // await uploadFile({ file: base64File });
        // console.log('File uploaded successfully', base64File);
      } catch (error: any) {
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
              <SelectDirectors value={director} onChange={setDirector} />
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
