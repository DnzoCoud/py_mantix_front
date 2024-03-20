import NavBar from "@/Components/Globals/NavBar";
import SideBar from "@/Components/Globals/SideBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex gap-4 p-2 w-full h-full">
        <SideBar />
        <main className="flex flex-col w-full h-full overflow-auto">
          <NavBar />
          <div className="bg-dark_bg mt-4 p-4 rounded-md">{children}</div>
        </main>
      </div>
    </>
  );
}
