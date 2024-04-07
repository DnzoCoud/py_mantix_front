"use client";
import useThemeStore, { Theme } from "@/stores/themeStore";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { ContextMenu } from "primereact/contextmenu";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { Tag } from "primereact/tag";
import React, { useRef } from "react";

export default function NavBar() {
  const cm = useRef<ContextMenu>(null);
  const contextMenuItems: MenuItem[] = [
    { label: "Perfil", icon: "pi pi-user" },
    { label: "Cerrar Sesion", icon: "pi pi-sign-in" },
  ];
  const router = useRouter();
  const navBarMenuitems: MenuItem[] = [
    {
      label: "Calendar",
      icon: "pi pi-calendar",
      command: () => {
        router.push("/Dashboard/calendar");
      },
    },
    {
      label: "Calendar",
      icon: "pi pi-user",
      command: () => {
        router.push("/Dashboard/users");
      },
    },
  ];

  const { theme, setTheme } = useThemeStore();

  const handleToggleTheme = () => {
    let nextTheme: Theme;
    // Cambiar el tema secuencialmente entre "light", "dark" y "auto"
    if (theme === "light") {
      nextTheme = "dark";
    } else if (theme === "dark") {
      nextTheme = "auto";
    } else {
      nextTheme = "light";
    }
    setTheme(nextTheme);
  };

  // Determinar qué icono usar según el tema actual
  let icon: string;
  if (theme === "light") {
    icon = PrimeIcons.SUN;
  } else if (theme === "dark") {
    icon = PrimeIcons.MOON;
  } else {
    icon = PrimeIcons.DESKTOP;
  }
  return (
    <>
      <div className="w-full h-16 flex justify-center items-center sticky top-0 z-40">
        <div className="flex justify-between px-4 items-center w-full h-full bg-white_medium_bg dark:bg-dark_bg p-2 rounded-md transition-all ease-out shadow-md  dark:shadow-dark_medium_bg">
          <div
            className="flex justify-evenly items-center cursor-pointer"
            onClick={() => router.push("/Dashboard")}
          >
            <h1 className="dark:text-white font-extrabold mr-1">Mantix</h1>
            <Tag severity="warning" value="Pro" />
          </div>
          <div className="flex justify-evenly items-center">
            <Menubar
              model={navBarMenuitems}
              className="p-0"
              style={{ padding: "0!important" }}
              pt={{ root: { className: "dark:!bg-dark_bg" } }}
            />
          </div>
          <div className="flex items-center justify-evenly">
            <span
              onClick={handleToggleTheme}
              className={
                icon + " mr-2 p-2 cursor-pointer text-xl dark:text-white"
              }
            ></span>
            <div className="flex flex-col mr-4">
              <span className="dark:text-white">Oscar Ladino</span>
              <span className="p-[0.1rem] bg-blue-400 text-center text-white rounded-lg ">
                Culinary
              </span>
            </div>
            <Avatar
              image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
              shape="circle"
              onContextMenu={(e) => cm.current?.show(e)}
            />
          </div>
          <ContextMenu model={contextMenuItems} ref={cm} />
        </div>
      </div>
    </>
  );
}
