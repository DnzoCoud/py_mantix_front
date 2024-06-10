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
import { useAddEventMutation } from "@/redux/services/eventService";
import { setEvent } from "@/redux/features/eventSlice";
export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<IEvent>();
  const start = watch("start", new Date())
  const end = watch("end", new Date())
  const [saveLoad, setSaveLoad] = useState<boolean>(false)
  const [machines, setMachines] = useState<IMaquina[] | []>([])
  const [machine, setMachine] = useState<IMaquina |null>()
  const dispatch = useDispatch()
  const {data:fetchMachines, isLoading:machinesLoading}= useFetchMachinesQuery()
  const [addEvent] = useAddEventMutation()

  useEffect(()=>{
    register("start", {required:"Este campo es obligatorio"})
    register("end", {required:"Este campo es obligatorio"})
    console.log("Entro FORM")
    if(fetchMachines) setMachines(fetchMachines)
  },[fetchMachines, dispatch])

  const handleMachineChange = (event: IMaquina | null) =>{
    console.log("change maquina")
    setMachine(event)}

  const onSubmit: SubmitHandler<IEvent> = async (data) => {
    console.log("Entro")
    if (machine) {
      await saveEvent(formatDate(data.start), formatDate(data.end), machine.id);
    }
  };
  const saveEvent = async (
    start: string,
    end: string,
    machine: number
  ) => {
    setSaveLoad(true);
    const savedEvent = await addEvent({
      start,
      end,
      machine,
      status: 1
    });
    if (savedEvent.data) dispatch(setEvent(savedEvent.data));

    setSaveLoad(false);
  };

  //UTIL
  const formatDate = (date: Date) => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  return (
    <>
      <form className="flex flex-col justify-evenly" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4 mt-4">
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
              {/* <Label text="Fecha fin" isObligatory={true} idFor="" />
              <Calendar
                placeholder="Fecha Final"
                locale="es"
                pt={{
                  root: {
                    className: "inputCalendar",
                  },
                }}
              /> */}

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
          {/* <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
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
          </div> */}
          <div className="col-span-12 mt-4">
            <div className="w-full flex justify-center items-center">
              <Button
                label="Agregar Mantenimiento"
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
