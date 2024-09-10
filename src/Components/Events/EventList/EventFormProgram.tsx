"use client";
import React, { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { IEventFormChange } from "@/interfaces/Props/IEventFormChange";
import { FloatLabel } from "primereact/floatlabel";
import ActivityForm, { TechnicianActivities } from "../ActivityForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { IWorkOrder } from "@/interfaces/IWorkOrder";
import {
  useAddWorkOrderMutation,
  useFindWorkOrderByEventIdQuery,
} from "@/redux/services/workOrderService";
import { useDispatch } from "react-redux";
import { setWorkOrder } from "@/redux/features/workOrderSlice";
import { useUpdateEventMutation } from "@/redux/services/eventService";
import { setUpdateEvent } from "@/redux/features/eventSlice";
import { allowedEjecuteRoles, EVENT_STATE } from "@/Utils/constants";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

export default function EventFormProgram({
  setActiveIndex,
  activeIndex,
  event,
}: IEventFormChange) {
  const [submitLoad, setSubmitLoad] = useState<boolean>(false);
  const [activity, setActivity] = useState<TechnicianActivities[] | []>([]);
  const [addWorkOrder] = useAddWorkOrderMutation();
  const [updateEvent] = useUpdateEventMutation();
  const { data: fetchWorkOrder } = useFindWorkOrderByEventIdQuery(
    event.id ? { eventId: event.id } : skipToken
  );

  const dispatch = useDispatch();
  const authUser = useAppSelector((state) => state.auth.authUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IWorkOrder>();
  const diagnosis = watch("diagnosis", "");
  // const existWorkOrder = useAppSelector(state => state.workOrder.workOrders.find(order => order.event === event.id)  || null)

  const onSubmit: SubmitHandler<IWorkOrder> = async (data) => {
    // Validación: Si no hay diagnóstico o actividades
    if (!data.diagnosis.trim() || activity.length === 0) {
      toast.error("Debe ingresar un diagnóstico y al menos una actividad.");

      return;
    }
    try {
      if (
        event.status_detail.id === EVENT_STATE.PROGRAMADO ||
        event.history_status?.previous_state.id === EVENT_STATE.PROGRAMADO
      ) {
        await ejecutionEvent(data.diagnosis.trim(), event.id);
        setActiveIndex(activeIndex + 1);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      // Manejar errores aquí, tal vez establecer un mensaje de error en el estado
    }
  };

  const ejecutionEvent = async (
    diagnosis: string,
    eventId: number
    // technicalId: number
  ) => {
    try {
      console.log(activity);
      setSubmitLoad(true);
      const saveWorkOrder = await addWorkOrder({
        diagnosis,
        event: eventId,
        observation: null,
        cause: null,
      }).unwrap();
      dispatch(setWorkOrder(saveWorkOrder));

      const updatedEvent = await updateEvent({
        id: eventId,
        init_time: new Date().toLocaleTimeString(),
        // technical: technicalId,
        status: EVENT_STATE.EN_EJECUCION,
        activity_data: activity,
      }).unwrap();
      dispatch(setUpdateEvent(updatedEvent));
    } catch (error) {
      toast.error("Error al empezar el mantenimiento");
    } finally {
      setSubmitLoad(false);
    }
  };

  useEffect(() => {
    register("diagnosis", { required: "Este campo es obligatorio" });
    if (fetchWorkOrder) {
      if (fetchWorkOrder.diagnosis)
        setValue("diagnosis", fetchWorkOrder.diagnosis);
    }
  }, [fetchWorkOrder, register, setValue]);

  const handleActivitiesChange = (newActivities: TechnicianActivities[]) => {
    setActivity(newActivities);
  };

  return (
    <>
      <form
        className="flex flex-col justify-start relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between sticky top-0 bg-white z-10 mb-2">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-800 rounded-full mr-2"></div>
            <span>Mantenimiento Programado</span>
          </div>
          {allowedEjecuteRoles.includes(authUser?.user.role_detail.id ?? 0) && (
            <Button
              label={
                event.status_detail.id === EVENT_STATE.PROGRAMADO ||
                event.history_status?.previous_state.id ===
                  EVENT_STATE.PROGRAMADO
                  ? "Empezar ejecucion"
                  : "Siguiente"
              }
              icon={PrimeIcons.ARROW_RIGHT}
              size="small"
              outlined
              type="submit"
              loading={submitLoad}
              disabled={!diagnosis.trim() || activity.length === 0}
              // onClick={handleExecute}
            />
          )}
        </div>
        {allowedEjecuteRoles.includes(authUser?.user.role_detail.id ?? 0) && (
          <>
            <div className="grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-12">
                <div className="w-full flex flex-col">
                  <FloatLabel>
                    <InputTextarea
                      value={diagnosis}
                      autoResize
                      rows={2}
                      cols={30}
                      pt={{
                        root: {
                          className: "w-full",
                        },
                      }}
                      disabled={
                        event.status_detail.id !== EVENT_STATE.PROGRAMADO &&
                        event.history_status?.previous_state.id !==
                          EVENT_STATE.PROGRAMADO
                      }
                      onChange={(e) => setValue("diagnosis", e.target.value)}
                    />
                    <label
                      htmlFor="diagnosis"
                      style={{ left: "3%", transition: "all .2s ease" }}
                    >
                      Diagnostico
                    </label>
                  </FloatLabel>
                  {errors.diagnosis && (
                    <span className="text-red-500">
                      {errors.diagnosis.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-12">
                <div className="w-full flex flex-col">
                  <ActivityForm setActivities={handleActivitiesChange} />
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}
