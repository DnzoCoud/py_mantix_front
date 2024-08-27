import { Skeleton } from "primereact/skeleton";
import React from "react";

export default function CalendarSkeleton() {
  return (
    <>
      <div className="flex justify-evenly items-center gap-4 p-2 m-4">
        <Skeleton className="p-2 w-1/4" />
        <Skeleton className="p-2 w-1/4" />
        <Skeleton className="p-2 w-1/4" />
        <Skeleton className="p-2 w-1/4" />
      </div>
      <div className="grid grid-cols-7 gap-8">
        {Array.from({ length: 14 }, (_, index) => (
          <Skeleton className="p-12 rounded-md col-span-1" key={index} />
        ))}
      </div>
    </>
  );
}
