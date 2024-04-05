"use client";
import React, { useRef } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import CompanyForm from "@/Components/Preferences/Company/CompanyForm";
import RoleForm from "@/Components/Preferences/Role/RoleForm";
import Headers from "@/Components/Globals/Headers";
import { PrimeIcons } from "primereact/api";
export default function PreferencesPage() {
  const stepperRef = useRef(null);
  return (
    <>
      <div>
        <Headers
          title="Configuracion del Sistema"
          icon={PrimeIcons.COG}
          subtitle="Configuracion de parametros del sistema"
        />
        <TabView
          pt={{
            inkbar: {
              className:
                "transition-all absolute border border-blue-400 dark:border-green-400 bottom-0",
            },
          }}
        >
          <TabPanel
            pt={{
              header: {
                className:
                  "cursor-pointer  hover:text-blue-400 dark:hover:text-green-400 m-2",
              },
              headerAction: {
                className:
                  "aria-selected:text-blue-400 dark:aria-selected:text-green-400 ",
              },
              content: { className: "p-4" },
            }}
            header="Empresa"
            leftIcon="pi pi-calendar mr-2"
          >
            <CompanyForm />
          </TabPanel>
          <TabPanel
            pt={{
              header: {
                className:
                  "cursor-pointer focus:text-blue-400 hover:text-blue-400 dark:hover:text-green-400 m-2",
              },
              headerAction: {
                className:
                  "aria-selected:text-blue-400 dark:aria-selected:text-green-400",
              },
              content: { className: "p-4" },
            }}
            header="Roles"
            leftIcon="pi pi-user mr-2"
          >
            <RoleForm />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
}
