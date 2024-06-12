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
    // {
    //   title: "Home",
    //   items: [
    //     {
    //       label: "Dashboard",
    //       icon: PrimeIcons.CHART_BAR,
    //       link: "/Maintenance",
    //       badge: 3,
    //       tooltip: "Dashboard",
    //     },
    //   ],
    //   icon: PrimeIcons.HOME,
    // },
    {
      title: "Funciones",
      items: [
        {
          label: "Calendario",
          icon: PrimeIcons.CALENDAR,
          link: "/Maintenance/calendar",
          tooltip: "Calendario",
        },
        {
          label: "Maquinas",
          icon: "pi pi-truck",
          link: "/Maintenance/machine",
          tooltip: "Maquina",
        },
        // {
        //   label: "Usuarios",
        //   icon: PrimeIcons.USERS,
        //   link: "/Maintenance/users",
        //   tooltip: "Usuarios",
        // },
        {
          label: "Locaciones",
          icon: PrimeIcons.USERS,
          link: "/Maintenance/locations",
          tooltip: "Locaciones",
        },
        {
          label: "Areas",
          icon: PrimeIcons.BOOKMARK,
          link: "/Maintenance/areas",
          tooltip: "Areas",
        },
      ],
      icon: PrimeIcons.HOME,
    },
    // {
    //   title: "Preferencias",
    //   items: [
    //     {
    //       label: "Configuracion",
    //       icon: PrimeIcons.BUILDING,
    //       link: "/Maintenance/preferences",
    //       tooltip: "Configuracion",
    //     },
    //   ],
    //   icon: PrimeIcons.COG,
    // },
    
  ];

  const sidebarStore = useSidebarStore();

  return (
    <>
      <aside
        className={`${
          sidebarStore.isOpen ? "w-[20%]" : "w-[5%]"
        } relative dark:bg-dark_bg bg-white_medium_bg rounded-md p-2 shadow-md dark:shadow-dark_medium_bg transition-all `}
      >
        <div className="overflow-x-auto">
          <MenuSidebar items={items} />
        </div>
        <span
          onClick={() => sidebarStore.handleOpen()}
          className={`${
            sidebarStore.isOpen ? PrimeIcons.ANGLE_LEFT : PrimeIcons.ANGLE_RIGHT
          } absolute top-4 -right-4 p-2 rounded-full shadow-md bg-white_medium_bg dark:bg-dark_bg cursor-pointer hover:bg-gray-200 transition-all`}
        ></span>
      </aside>
    </>
  );
}

export default SideBar;
