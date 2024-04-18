'use client'
import Headers from "@/Components/Globals/Headers";
import UserSkeleton from "@/Components/Globals/Skeleton/UserSkeleton";
import dynamic from "next/dynamic";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import React, { useState } from "react";
const UserCards = dynamic(() => import("@/Components/Users/UserCards"), {
  loading: () => <UserSkeleton />,
});
export default function UserPage() {
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
      <div className="grid grid-cols-4 gap-2">
        <UserCards />
      </div>
    </>
  );
}
