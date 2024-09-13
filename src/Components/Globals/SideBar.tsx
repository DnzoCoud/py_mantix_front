"use client";
import { IMenuSidebar } from "@/interfaces/IMenuSidebar";
import { PrimeIcons } from "primereact/api";
import React, { useEffect, useState } from "react";
import MenuSidebar from "./MenuSidebar";
import { useRouter } from "next/navigation";
import useSidebarStore from "@/stores/useSidebarStore";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/services/authService";
import { clearAuthUser } from "@/redux/features/auth/authSlice";
import { signOut } from "next-auth/react";
import { iconMap, rolePermissions } from "@/Utils/constants";
import { MenuRole } from "@/interfaces/IRole";
import Logo from "@/Components/assets/img/logo.png";

function SideBar() {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.authUser);
  const [menus, setMenus] = useState<MenuRole[]>([]);
  useEffect(() => {
    if (authUser) {
      setMenus(authUser.user.role_detail.menus);
    }
  }, [dispatch, authUser]);
  const items: IMenuSidebar[] = [
    {
      title: "FUNCIONES",
      icon: PrimeIcons.HOME,
      items: menus.map((menu) => ({
        label: menu.menu_detail.name,
        icon: iconMap[menu.menu_detail.icon] || "pi pi-question",
        link: menu.menu_detail.link,
        tooltip: menu.menu_detail.tooltip,
      })),
    },
  ];

  const handleLogout = async () => {
    // await authData.logout();
    await logout().unwrap();
    await signOut({ callbackUrl: "/Login" });
    dispatch(clearAuthUser());
    localStorage.removeItem("serverToken");
  };

  const sidebarStore = useSidebarStore();
  return (
    <>
      <aside
        className={`${
          sidebarStore.isOpen ? "w-[15%]" : "w-[5%]"
        } relative dark:bg-dark_bg transition-all border bg-gradient-to-br from-zinc-50 to-zinc-100 m-2 rounded-lg`}
      >
        <div
          className={`flex items-center w-full justify-center  ${
            sidebarStore.isOpen ? "gap-2 " : "gap-0"
          } transition-all`}
        >
          <span
            className={`font-bold text-md py-2  dark:text-white text-end overflow-hidden !tracking-normal logo_text ${
              sidebarStore.isOpen ? "w-1/2" : "w-0"
            }`}
          >
            Mantix
          </span>
          <span
            className={`font-bold text-white bg-black py-2  flex-1 ${
              sidebarStore.isOpen
                ? "rounded-l-xl rounded-tr-lg pl-2 " //Cuando el sidebar esta abierto
                : "text-center text-2xl rounded-t-lg"
            }`}
          >
            {sidebarStore.isOpen ? (
              "Pro"
            ) : (
              <span className="logo_text text-center">x</span>
            )}
          </span>
        </div>
        <div className="overflow-x-auto">
          <MenuSidebar items={items} />
        </div>

        <span
          onClick={() => sidebarStore.handleOpen()}
          className={`${
            sidebarStore.isOpen ? PrimeIcons.ANGLE_LEFT : PrimeIcons.ANGLE_RIGHT
          } absolute top-8 -right-4 p-2 rounded-full shadow-md bg-white dark:bg-dark_bg cursor-pointer hover:bg-gray-200 transition-all z-50 active:bg-gray-300`}
        ></span>

        <div className="w-full absolute bottom-2 flex  justify-center items-center">
          <Button
            label={sidebarStore.isOpen ? "Cerrar Sesion" : undefined}
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
