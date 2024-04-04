import UserCardSkeleton from "@/Components/Users/Skeleton/UserCardSkeleton";
import { Skeleton } from "primereact/skeleton";
import React from "react";

export default function UserPage() {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className="dark:text-white font-extrabold text-xl">
          Usuarios del Sistema
        </h1>
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
