"use client";
import { IMenuSidebar } from "@/interfaces/IMenuSidebar";
import { PrimeIcons } from "primereact/api";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import React from "react";
import MenuSidebar from "./MenuSidebar";
import { useRouter } from "next/navigation";
import useSidebarStore from "@/stores/useSidebarStore";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFirstTwoLetters } from "@/Utils/useComposables";
import { useLogoutMutation } from "@/redux/services/authService";
import { clearAuthUser } from "@/redux/features/auth/authSlice";
import { signOut } from "next-auth/react";

function SideBar() {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(state => state.auth.authUser)

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
        {
          label: "Usuarios",
          icon: PrimeIcons.USERS,
          link: "/Maintenance/users",
          tooltip: "Usuarios",
        },
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

  const handleLogout = async () => {
    // await authData.logout();
    await logout().unwrap()
    await signOut({ callbackUrl: "/Login" });
    dispatch(clearAuthUser())
    localStorage.removeItem('serverToken');
  };

  const sidebarStore = useSidebarStore();
  return (
    <>
      <aside
        className={`${
          sidebarStore.isOpen ? "w-[20%]" : "w-[5%]"
        } relative dark:bg-dark_bg bg-white_medium_bg rounded-md p-2 shadow-md dark:shadow-dark_medium_bg transition-all `}
      >
        <div className={`flex items-center w-full my-4 ${sidebarStore.isOpen ? "justify-start " : "justify-center"} transition-all`}>
          <Avatar
            label={getFirstTwoLetters(authUser?.user.username)}
            style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
            size="large"
          />
          <div className={`flex flex-col items-start justify-center ml-2 ${sidebarStore.isOpen ? "" : "hidden"}`}>
            <span className="font-bold">{authUser?.user.username}</span>
            <small className="text-slate-600">{authUser?.user.first_name} {authUser?.user.last_name}</small>
            <span className="font-bold">{authUser?.user.role_detail.name}</span>

          </div>
        </div>
        <div className="overflow-x-auto">
          <MenuSidebar items={items} />
        </div>
        <span
          onClick={() => sidebarStore.handleOpen()}
          className={`${
            sidebarStore.isOpen ? PrimeIcons.ANGLE_LEFT : PrimeIcons.ANGLE_RIGHT
          } absolute top-4 -right-4 p-2 rounded-full shadow-md bg-white_medium_bg dark:bg-dark_bg cursor-pointer hover:bg-gray-200 transition-all`}
        ></span>
        <div className="w-full absolute bottom-2 flex  justify-center items-center">
          <Button
            label={sidebarStore.isOpen ?"Cerrar Sesion" : undefined}
            size="small"
            icon={"pi pi-sign-out"}
            outlined
            onClick={handleLogout}
          />
        </div>
      </aside>
    </>
  );
}

export default SideBar;
