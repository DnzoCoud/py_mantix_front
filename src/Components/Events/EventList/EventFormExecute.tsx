import React, { useState } from "react";
import { IEventFormChange } from "@/interfaces/Props/IEventFormChange";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import ActivityForm, { TechnicianActivities } from "../ActivityForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { IWorkOrder } from "@/interfaces/IWorkOrder";
import { useUpdateEventMutation } from "@/redux/services/eventService";
import { allowedEjecuteRoles, EVENT_STATE } from "@/Utils/constants";
import { useDispatch } from "react-redux";
import {
  useFindWorkOrderByEventIdQuery,
  useUpdateWorkOrderMutation,
} from "@/redux/services/workOrderService";
import { skipToken } from "@reduxjs/toolkit/query";
import { setUpdateEvent } from "@/redux/features/eventSlice";
import { setUpdateWorkOrder } from "@/redux/features/workOrderSlice";
import { FloatLabel } from "primereact/floatlabel";
import { useUpdateMachineMutation } from "@/redux/services/machineService";
import { transformToTechnicianActivities } from "@/Utils/useComposables";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

export default function EventFormExecute({
  setActiveIndex,
  activeIndex,
  event,
}: IEventFormChange) {
  const [submitLoad, setSubmitLoad] = useState<boolean>(false);
  const [activity, setActivity] = useState<TechnicianActivities[] | []>([]);
  const [isActivitiesModified, setIsActivitiesModified] =
    useState<boolean>(false);
  const [existWorkOrder, setExistWorkOrder] = useState<IWorkOrder>();
  const { data: fetchWorkOrder } = useFindWorkOrderByEventIdQuery(
    event.id ? { eventId: event.id } : skipToken
  );
  const [updateMachine] = useUpdateMachineMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [updateWorkOrder] = useUpdateWorkOrderMutation();
  const dispatch = useDispatch();
  const authUser = useAppSelector((state) => state.auth.authUser);

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
    if (
      !data.cause?.trim() ||
      !data.observation?.trim() ||
      activity.length === 0
    ) {
      toast.error("Debe ingresar una causa y observación.");

      return;
    }
    if (data.observation && data.cause) {
      if (isActivitiesModified) {
        setSubmitLoad(true);
        const updatedWorkOrder = await updateWorkOrder({
          id: existWorkOrder?.id,
          observation,
          cause,
        }).unwrap();
        dispatch(setUpdateWorkOrder(updatedWorkOrder));
        const updatedEvent = await updateEvent({
          id: event.id,
          activity_data: activity,
        }).unwrap();
        dispatch(setUpdateEvent(updatedEvent));
        setIsActivitiesModified(false);
        setSubmitLoad(false);
      } else {
        await saveEjecution(data.observation.trim(), data.cause.trim());
      }
    }
  };

  const saveEjecution = async (observation: string, cause: string) => {
    setSubmitLoad(true);
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

      await updateMachine({
        id: event.machine_detail.id,
        last_maintenance: new Date(),
      });
      setActiveIndex(activeIndex + 1);
    } catch (error) {
      console.error("Error saving execution:", error);
      toast.error("Error al completar el mantenimiento");
    } finally {
      setSubmitLoad(false);
    }
  };
  React.useEffect(() => {
    register("cause", { required: "Este campo es obligatorio" });
    register("observation", { required: "Este campo es obligatorio" });

    if (fetchWorkOrder) {
      setExistWorkOrder(fetchWorkOrder);
      if (fetchWorkOrder.cause) setValue("cause", fetchWorkOrder.cause);
      if (fetchWorkOrder.observation)
        setValue("observation", fetchWorkOrder.observation);
    }
  }, [fetchWorkOrder, register, setValue]);

  const [activities, setActivities] = useState<TechnicianActivities[]>(
    transformToTechnicianActivities(event.activities)
  );

  const handleActivitiesChange = (newActivities: TechnicianActivities[]) => {
    setActivity(newActivities);
  };

  return (
    <>
      <form
        className="flex flex-col justify-start relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-1">
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
          {allowedEjecuteRoles.includes(authUser?.user.role_detail.id ?? 0) && (
            <Button
              label={
                isActivitiesModified
                  ? "Guardar Cambios"
                  : "Completar Mantenimiento"
              }
              size="small"
              outlined
              icon={PrimeIcons.ARROW_RIGHT}
              severity="success"
              type="submit"
              loading={submitLoad}
              // onClick={() => setActiveIndex(activeIndex + 1)}
              disabled={
                !cause?.trim() || !observation?.trim() || activity.length === 0
              }
              className="disabled:border-green-300 disabled:text-green-300"
            />
          )}
        </div>

        {allowedEjecuteRoles.includes(authUser?.user.role_detail.id ?? 0) && (
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12">
              {existWorkOrder && <p>{existWorkOrder.diagnosis}</p>}
            </div>
            <div className="col-span-12">
              <div className="w-full flex flex-col">
                <ActivityForm
                  setActivities={handleActivitiesChange}
                  initialTasks={activities}
                  setChange={setIsActivitiesModified}
                />
              </div>
            </div>
            <div className="col-span-12">
              <div className="w-full flex flex-col mt-2">
                <FloatLabel>
                  <InputTextarea
                    value={cause ?? ""}
                    autoResize
                    rows={2}
                    cols={30}
                    pt={{
                      root: {
                        className: "w-full",
                      },
                    }}
                    disabled={
                      event.status_detail.id !== EVENT_STATE.EN_EJECUCION &&
                      event.history_status?.previous_state.id !==
                        EVENT_STATE.EN_EJECUCION
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
                {errors.cause && (
                  <span className="text-red-500">{errors.cause.message}</span>
                )}
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
                    value={observation ?? ""}
                    autoResize
                    rows={2}
                    cols={30}
                    pt={{
                      root: {
                        className: "w-full",
                      },
                    }}
                    disabled={
                      event.status_detail.id !== EVENT_STATE.EN_EJECUCION &&
                      event.history_status?.previous_state.id !==
                        EVENT_STATE.EN_EJECUCION
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
                {errors.observation && (
                  <span className="text-red-500">
                    {errors.observation.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
