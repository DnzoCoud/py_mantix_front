import { IMaquina } from "@/interfaces/IMaquina";
import { PrimeIcons, addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useRef, useState } from "react";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import Label from "../Globals/Label";
import { Button } from "primereact/button";
import { useToastStore } from "@/stores/useToastStore";
import { FloatLabel } from "primereact/floatlabel";
import { SubmitHandler, useForm } from "react-hook-form";
import { IEvent } from "@/interfaces/IEvent";
import { useFetchMachinesQuery } from "@/redux/services/machineService";
import { useDispatch } from "react-redux";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import {
  useAddEventMutation,
  useUploadEventsMutation,
} from "@/redux/services/eventService";
import { setEvent } from "@/redux/features/eventSlice";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Fieldset } from "primereact/fieldset";
import { EVENT_STATE } from "@/Utils/constants";
import { getBase64 } from "@/Utils/useComposables";
import LoaderComponents from "../Globals/Loader/LoaderComponents";
import UploadErrors from "../Globals/UploadErrors";
export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IEvent>();
  const toast = useToastStore();
  const start = watch("start", new Date());
  const end = watch("end", new Date());
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const [machines, setMachines] = useState<IMaquina[] | []>([]);
  const [machine, setMachine] = useState<IMaquina | null>();
  const dispatch = useDispatch();
  const { data: fetchMachines, isLoading: machinesLoading } =
    useFetchMachinesQuery();
  const [addEvent] = useAddEventMutation();
  const [uploadEvents] = useUploadEventsMutation();
  const [uploadErrors, setUploadErrors] = useState<
    { fila: number; columna: string; message: string }[]
  >([]);
  useEffect(() => {
    register("start", { required: "Este campo es obligatorio" });
    register("end", { required: "Este campo es obligatorio" });
    if (fetchMachines) setMachines(fetchMachines);
  }, [fetchMachines, dispatch]);

  const handleMachineChange = (event: IMaquina | null) => {
    setMachine(event);
  };

  const onSubmit: SubmitHandler<IEvent> = async (data) => {
    console.log("Entro");
    if (machine) {
      await saveEvent(formatDate(data.start), formatDate(data.end), machine.id);
    }
  };
  const saveEvent = async (start: string, end: string, machine: number) => {
    setSaveLoad(true);
    try {
      const savedEvent = await addEvent({
        start,
        end,
        machine,
        status: EVENT_STATE.PROGRAMADO,
      });
      if (savedEvent.data) dispatch(setEvent(savedEvent.data));
      toast.setMessage("Registro exitoso", toast.SUCCES_TOAST);
    } catch (error) {
      toast.setMessage("Error durante el cargue", toast.ERROR_TOAST);
    } finally {
      setSaveLoad(false);
    }
  };

  //UTIL
  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  const onUpload = async (event: FileUploadHandlerEvent) => {
    const files = event.files;
    if (files.length > 0) {
      setSaveLoad(true);
      try {
        const base64File = await getBase64(files[0]);
        const newEvents = await uploadEvents({
          excel_base64: base64File,
        }).unwrap();
        newEvents.map((event) => {
          dispatch(setEvent(event));
        });
        toast.setMessage("Cargue exitoso", toast.SUCCES_TOAST);
        // await uploadFile({ file: base64File });
      } catch (error: any) {
        setUploadErrors(error.data?.error || []);
        toast.setMessage("Error durante el cargue", toast.ERROR_TOAST);
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
          <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={formatDate(start)}
                  type="date"
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  onChange={(e) => setValue("start", parseDate(e.target.value))}
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Fecha Inicio
                </label>
              </FloatLabel>
              {errors.start && <span>{errors.start.message}</span>}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputText
                  value={formatDate(end)}
                  type="date"
                  maxLength={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  onChange={(e) => setValue("end", parseDate(e.target.value))}
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Fecha Fin
                </label>
              </FloatLabel>
              {errors.end && <span>{errors.end.message}</span>}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <Dropdown
                  value={machine}
                  options={machines}
                  optionLabel="name"
                  dataKey="id"
                  filter
                  pt={{
                    root: {
                      className: "selectMaquina",
                    },
                  }}
                  loading={machinesLoading}
                  onChange={(e: DropdownChangeEvent) =>
                    handleMachineChange(e.value)
                  }
                />
                <label
                  htmlFor="username"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Maquina
                </label>
              </FloatLabel>
            </div>
          </div>
          <div className="col-span-12 mt-4">
            <div className="w-full flex justify-center items-center">
              <Button
                label="Agregar Mantenimiento"
                icon={PrimeIcons.SAVE}
                size="small"
                severity="success"
                loading={saveLoad}
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
