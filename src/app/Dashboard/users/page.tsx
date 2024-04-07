'use client'
import Headers from "@/Components/Globals/Headers";
import UserCardSkeleton from "@/Components/Users/Skeleton/UserCardSkeleton";
import { PrimeIcons } from "primereact/api";
import { Skeleton } from "primereact/skeleton";
import React from "react";

export default function UserPage() {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <Headers
          title="Usuarios del Sistema"
          subtitle="Gestion de los usuairos registrados en el sistema"
          icon={PrimeIcons.USERS}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
      </div>
    </>
  );
}
