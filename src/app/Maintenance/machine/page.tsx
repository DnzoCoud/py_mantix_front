"use client";
import Headers from "@/Components/Globals/Headers";
import MachinaDatatable from "@/Components/Machine/MachinaDatatable";
import MachineForm from "@/Components/Machine/MachineForm";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

export default function MachinePage() {
  const [activateAdd, setActivateAdd] = useState<boolean>(false);
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Headers
          title="Maquinas"
          subtitle="Gestion de las maquinas de la empresa"
          icon={"pi pi-truck"}
        />
        <Button
          label="Agregar Maquina"
          icon={PrimeIcons.PLUS}
          size="small"
          severity="success"
          onClick={() => setActivateAdd(true)}
        />
      </div>
        <MachinaDatatable/>
      <Dialog
        header="Agregar Maquina"
        visible={activateAdd}
        onHide={() => setActivateAdd(false)}
        style={{ width: '52rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        draggable={false}
        pt={{
          content: {
            className: "max-h-[40rem]",
          },
          root: {
            className: "dark:bg-dark_medium_bg",
          },
        }}
      >
         <MachineForm/>
      </Dialog>
    </>
  );
}
