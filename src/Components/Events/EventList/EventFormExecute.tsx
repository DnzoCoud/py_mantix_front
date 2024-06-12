import React, { useState } from "react";
import { IEventFormChange } from "@/interfaces/Props/IEventFormChange";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import ActivityForm from "../ActivityForm";
import { IActivity } from "@/interfaces/IActivity";
import { SubmitHandler, useForm } from "react-hook-form";
import { IWorkOrder } from "@/interfaces/IWorkOrder";
import { useUpdateEventMutation } from "@/redux/services/eventService";
import { EVENT_STATE } from "@/Utils/constants";
import { useDispatch } from "react-redux";
import {
  useFindWorkOrderByEventIdQuery,
  useUpdateWorkOrderMutation,
} from "@/redux/services/workOrderService";
import { skipToken } from "@reduxjs/toolkit/query";
import { setUpdateEvent } from "@/redux/features/eventSlice";
import { setUpdateWorkOrder } from "@/redux/features/workOrderSlice";
import { FloatLabel } from "primereact/floatlabel";

export default function EventFormExecute({
  setActiveIndex,
  activeIndex,
  event,
}: IEventFormChange) {
  const [submitLoad, setSubmitLoad] = useState<boolean>(false);
  const [activity, setActivity] = useState<IActivity[] | []>([]);
  const [existWorkOrder, setExistWorkOrder] = useState<IWorkOrder>();
  const { data: fetchWorkOrder } = useFindWorkOrderByEventIdQuery(
    event.id ? { eventId: event.id } : skipToken
  );
  const [updateEvent] = useUpdateEventMutation();
  const [updateWorkOrder] = useUpdateWorkOrderMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    } = useForm<IWorkOrder>();
  const cause = watch("cause", "");
  const observation = watch("observation", "");
  const onSubmit: SubmitHandler<IWorkOrder> = async (data) => {
    if (data.observation && data.cause) {
      await saveEjecution(data.observation.trim(), data.cause.trim());
      setActiveIndex(activeIndex + 1);
    }
  };

  const saveEjecution = async (observation: string, cause: string) => {
    setSubmitLoad(true)
    try {
      const updatedWorkOrder = await updateWorkOrder({
        id: existWorkOrder?.id,
        observation,
        cause,
      }).unwrap();
      dispatch(setUpdateWorkOrder(updatedWorkOrder));
      const updatedEvent = await updateEvent({
        id: event.id,
        end_time: new Date().toLocaleTimeString(),
        activity_data: activity,
        status: EVENT_STATE.COMPLETADO,
      }).unwrap();
      dispatch(setUpdateEvent(updatedEvent));
    }
    catch(error) {
      console.error("Error saving execution:", error);
    }finally {
      setSubmitLoad(false)
    }
  };
  React.useEffect(() => {
    register("cause", { required: "Este campo es obligatorio" });
    register("observation", { required: "Este campo es obligatorio" });

    if (fetchWorkOrder) {
      setExistWorkOrder(fetchWorkOrder);
      if (fetchWorkOrder.cause) setValue("cause", fetchWorkOrder.cause);
      if (fetchWorkOrder.observation) setValue("observation", fetchWorkOrder.observation);
    }
  }, [fetchWorkOrder, register, setValue]);
  return (
    <>
      <form
        className="flex flex-col justify-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between">
          <Button
            label="Atras"
            size="small"
            outlined
            icon={PrimeIcons.ARROW_LEFT}
            severity="secondary"
            type="button"
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
          <div className="flex items-center justify-center">
            <div className="h-3 w-3 bg-blue-400 rounded-full mr-2"></div>
            <span>Mantenimiento en ejecución</span>
          </div>
          <Button
            label="Completar Mantenimiento"
            size="small"
            outlined
            icon={PrimeIcons.ARROW_RIGHT}
            severity="success"
            type="submit"
            loading={submitLoad}
            // onClick={() => setActiveIndex(activeIndex + 1)}
          />
        </div>

        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12">
            {existWorkOrder && <p>{existWorkOrder.diagnosis}</p>}
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col">
              <ActivityForm
                setActivities={setActivity}
                initialTasks={
                  event.activities.length > 0 ? event.activities : undefined
                }
              />
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col mt-2">
              <FloatLabel>
                <InputTextarea
                  value={cause ?? ''}
                  autoResize
                  rows={2}
                  cols={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  disabled={
                    event.status_detail.id !== EVENT_STATE.EN_EJECUCION
                  }
                  onChange={(e) => setValue("cause", e.target.value)}
                />
                <label
                  htmlFor="cause"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Causas
                </label>
              </FloatLabel>
              {errors.cause && <span className="text-red-500">{errors.cause.message}</span>}
              {/* <InputTextarea
                autoResize
                rows={2}
                cols={30}
              /> */}
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full flex flex-col">
              {/* <Label text="Observaciones" isObligatory={true} idFor="" />
              <InputTextarea autoResize rows={2} cols={30} /> */}
              <FloatLabel>
                <InputTextarea
                  value={observation ?? ''}
                  autoResize
                  rows={2}
                  cols={30}
                  pt={{
                    root: {
                      className: "w-full",
                    },
                  }}
                  disabled={
                    event.status_detail.id !== EVENT_STATE.EN_EJECUCION
                  }
                  onChange={(e) => setValue("observation", e.target.value)}
                />
                <label
                  htmlFor="observation"
                  style={{ left: "3%", transition: "all .2s ease" }}
                >
                  Observaciones
                </label>
              </FloatLabel>
              {errors.observation && <span className="text-red-500">{errors.observation.message}</span>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
