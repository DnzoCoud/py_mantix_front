"use client";
import Headers from "@/Components/Globals/Headers";
import Loader from "@/Components/Globals/Loader/Loader";
import LocationDatatable from "@/Components/Locations/LocationDatatable";
import LocationForm from "@/Components/Locations/LocationForm";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

export default function LocationPage() {
  const [activateAdd, setActivateAdd] = useState<boolean>(false);
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Headers
          title="Locaciones"
          subtitle="Gestion de las locaciones de la empresa"
          icon={PrimeIcons.TH_LARGE}
        />
        <Button
          label="Agregar Locacion"
          icon={PrimeIcons.PLUS}
          size="small"
          severity="success"
          onClick={() => setActivateAdd(true)}
        />
      </div>
      <div className="w-full h-auto flex items-center justify-end p-1"></div>
      <LocationDatatable />

      <Dialog
        header="Agregar Locacion"
        visible={activateAdd}
        onHide={() => setActivateAdd(false)}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
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
        <LocationForm />
      </Dialog>
    </>
  );
}
