"use client";
import Headers from "@/Components/Globals/Headers";
import UserDataSkeleton from "@/Components/Globals/Skeleton/UserDataSkeleton";
import UserSkeleton from "@/Components/Globals/Skeleton/UserSkeleton";
import UserForm from "@/Components/Users/UserForm";
import { useUserStore } from "@/stores/useUserStore";
import dynamic from "next/dynamic";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
const UserCards: React.ComponentType = dynamic(
  () => import("@/Components/Users/UserCards"),
  {
    loading: () => <UserSkeleton />,
  }
);
const UserDataTable: React.ComponentType = dynamic(
  () => import("@/Components/Users/UserDatatable"),
  {
    loading: () => <UserDataSkeleton />,
  }
);
export default function UserPage() {
  const userStore = useUserStore();
  const [activateAdd, setActivateAdd] = useState<boolean>(false);
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Headers
          title="Usuarios del Sistema"
          subtitle="Gestion de los usuairos registrados en el sistema"
          icon={PrimeIcons.USERS}
        />
        <Button
          label="Agregar Usuario"
          icon={PrimeIcons.PLUS}
          size="small"
          severity="success"
          onClick={() => setActivateAdd(true)}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-end p-1">
        <Button
          icon={PrimeIcons.LIST}
          rounded
          outlined
          severity="info"
          aria-label="User"
          className="mr-2"
          size="small"
          onClick={() => userStore.handleChangeDataOption(1)}
        />
        <Button
          icon={PrimeIcons.TH_LARGE}
          rounded
          outlined
          severity="info"
          aria-label="User"
          className="mr-2"
          size="small"
          onClick={() => userStore.handleChangeDataOption(2)}
        />
      </div>
      {userStore.dataOption == 1 && <UserDataTable />}
      {userStore.dataOption == 2 && <UserCards />}

      <Dialog
        visible={activateAdd}
        onHide={() => setActivateAdd(false)}
        draggable={false}
        header="Agregar Usuario"
        style={{ width: "80vw" }}
        maximizable={true}
      >
        <UserForm />
      </Dialog>
    </>
  );
}
