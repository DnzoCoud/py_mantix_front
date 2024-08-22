import Headers from "@/Components/Globals/Headers";
import RoleDataList from "@/Components/Roles/RoleDataList";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import React from "react";

export default function RolePage() {
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Headers
          title="Roles"
          subtitle="Gestion de los roles usados en el sistema"
          icon={"pi pi-minus-circle"}
        />
        {/* <Button
          label="Agregar Maquina"
          icon={PrimeIcons.PLUS}
          size="small"
          severity="success"
          onClick={() => setActivateAdd(true)}
        /> */}
      </div>
      <RoleDataList />
    </>
  );
}
