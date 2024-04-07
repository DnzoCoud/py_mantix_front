"use client";
import { IMenuSidebar } from "@/interfaces/IMenuSidebar";
import { PrimeIcons } from "primereact/api";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import React from "react";
import MenuSidebar from "./MenuSidebar";
import { useRouter } from "next/navigation";
import useSidebarStore from "@/stores/useSidebarStore";

function SideBar() {
  const router = useRouter();

  const items: IMenuSidebar[] = [
    {
      title: "Home",
      items: [
        {
          label: "Dashboard",
          icon: PrimeIcons.CHART_BAR,
          link: "/Dashboard",
          badge: 3,
          tooltip: "Dashboard",
        },
      ],
      icon: PrimeIcons.HOME,
    },
    {
      title: "Funciones",
      items: [
        {
          label: "Calendario",
          icon: PrimeIcons.CALENDAR,
          link: "/Dashboard/calendar",
          tooltip: "Calendario",
        },
        {
          label: "Usuarios",
          icon: PrimeIcons.USERS,
          link: "/Dashboard/users",
          tooltip: "Usuarios",
        },
      ],
      icon: PrimeIcons.HOME,
    },
    {
      title: "Preferencias",
      items: [
        {
          label: "Configuracion",
          icon: PrimeIcons.BUILDING,
          link: "/Dashboard/preferences",
          tooltip: "Configuracion",
        },
      ],
      icon: PrimeIcons.COG,
    },
  ];

  const sidebarStore = useSidebarStore();

  return (
    <>
      <div
        className={`${
          sidebarStore.isOpen ? "w-[20%]" : "w-[5%]"
        } relative dark:bg-dark_bg bg-white_medium_bg rounded-md p-2 shadow-md dark:shadow-dark_medium_bg transition-all`}
      >
        SideBar
        <MenuSidebar items={items} />
        <span
          onClick={() => sidebarStore.handleOpen()}
          className={`${
            sidebarStore.isOpen ? PrimeIcons.ANGLE_LEFT : PrimeIcons.ANGLE_RIGHT
          } absolute top-4 -right-4 p-2 rounded-full shadow-md bg-white_medium_bg dark:bg-dark_bg cursor-pointer hover:bg-gray-200 transition-all`}
        ></span>
      </div>
    </>
  );
}

export default SideBar;
