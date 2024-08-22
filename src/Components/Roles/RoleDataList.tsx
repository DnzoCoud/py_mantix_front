"use client";
import React, { useEffect, useState } from "react";
import RoleCard from "./RoleCard";
import {
  useFetchRolesQuery,
  useUpdateRoleMenusMutation,
} from "@/redux/services/userService";
import { IRole, Menu } from "@/interfaces/IRole";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import Loader from "../Globals/Loader/Loader";
import { useToastStore } from "@/stores/useToastStore";

export interface RoleChange {
  roleId: number;
  menus: Menu[];
}

export default function RoleDataList() {
  const toastStore = useToastStore();
  const [roles, setRoles] = useState<IRole[]>([]);
  const { data: fetchRoles } = useFetchRolesQuery();
  useEffect(() => {
    if (fetchRoles) setRoles(fetchRoles);
  }, [fetchRoles]);

  const [updateRoleMenus, { isLoading }] = useUpdateRoleMenusMutation();
  const [roleChanges, setRoleChanges] = useState<RoleChange[]>([]);

  const saveChanges = async () => {
    try {
      if (roleChanges.length === 0) {
        toastStore.setMessage(
          "Debe haber al menos un menú asociado al rol.",
          toastStore.ERROR_TOAST
        );
        return;
      }
      // Realizar la actualización en el backend
      await updateRoleMenus(roleChanges);
      // Notificar la actualización (si es necesario)
      toastStore.setMessage(
        "Cambios guardados correctamente",
        toastStore.SUCCES_TOAST
      );
      setRoleChanges([]);
    } catch (error: any) {
      console.error("Error updating role menus:", error);
      toastStore.setMessage(error.message, toastStore.ERROR_TOAST);
    }
  };

  const handleRoleChange = (roleId: number, updatedMenus: Menu[]) => {
    setRoleChanges((prevChanges) => {
      // Busca si ya hay un cambio para este rol
      const existingChange = prevChanges.find(
        (change) => change.roleId === roleId
      );
      if (existingChange) {
        // Actualiza los menús del rol existente
        return prevChanges.map((change) =>
          change.roleId === roleId ? { ...change, menus: updatedMenus } : change
        );
      } else {
        // Agrega un nuevo cambio
        return [...prevChanges, { roleId, menus: updatedMenus }];
      }
    });
  };

  return (
    <>
      <Loader isLoad={isLoading} />

      <div className="w-full p-2 flex flex-col justify-center h-full relative">
        <div className="flex w-full items-end justify-end p-4 z-20 sticky top-0 bg-white">
          <Button
            label="Guardar cambios"
            icon={PrimeIcons.PENCIL}
            size="small"
            severity="success"
            disabled={roleChanges.length <= 0}
            onClick={saveChanges}
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          {roles.map((rol) => (
            <div className="col-span-12" key={rol.id}>
              <RoleCard role={rol} onRoleChange={handleRoleChange} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
