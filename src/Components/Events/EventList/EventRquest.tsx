import { IEvent } from "@/interfaces/IEvent";
import { setUpdateEvent } from "@/redux/features/eventSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useReprogramRequestMutation } from "@/redux/services/eventService";
import { useToastStore } from "@/stores/useToastStore";
import { Button } from "primereact/button";
import React from "react";

export default function EventRequest({ event }: { event: IEvent }) {
  const authuser = useAppSelector((state) => state.auth.authUser);
  const [reprogramRequest, { isLoading }] = useReprogramRequestMutation();
  const toast = useToastStore();
  const dispatch = useAppDispatch();

  const handleSubmit = async (action: boolean) => {
    try {
      const updatedEvent = await reprogramRequest({
        event: event.id,
        action,
      }).unwrap();
      dispatch(setUpdateEvent(updatedEvent));
      toast.setMessage("Registro exitoso", toast.SUCCES_TOAST);
    } catch (error: any) {
      toast.setMessage("Error durante el cargue", toast.ERROR_TOAST);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-start">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
          <span>Peticion de reprogramar</span>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12">
            {authuser?.user.role_detail.id === 7 &&
              authuser?.user.id === event.request_user.id && (
                <p className="p-2 text-purple-600 bg-purple-200 rounded-md inline-block">
                  Has enviado la peticion para reprogramar, porfavor espera a la
                  respuesta de un Jefe de mantenimiento.
                </p>
              )}

            {authuser?.user.role_detail.id !== 7 && (
              <div className="flex flex-col flex-1">
                <span className="flex gap-1 items-center">
                  El director
                  <p className="bg-purple-100 p-1 rounded-md px-2">
                    {event.request_user.first_name}{" "}
                    {event.request_user.last_name}
                  </p>
                  sugiere esta reprogramación.
                </span>
                <form className="flex items-center justify-end gap-4 flex-wrap mt-4">
                  <Button
                    label="Aceptar"
                    size="small"
                    severity="help"
                    outlined
                    loading={isLoading}
                    onClick={() => handleSubmit(true)}
                  />
                  <Button
                    label="Rechazar"
                    size="small"
                    severity="secondary"
                    outlined
                    loading={isLoading}
                    onClick={() => handleSubmit(false)}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
