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
          sidebarStore.isOpen ? "w-[20%]" : "w-[5%]"
        } relative dark:bg-dark_bg bg-white transition-all border-r`}
      >
        <div
          className={`flex items-center w-full border-b p-4 ${
            sidebarStore.isOpen ? "justify-center " : "justify-center"
          } transition-all`}
        >
          <h1 className="font-bold text-xl dark:text-white">Mantix App</h1>
          {/* <Avatar
            label={getFirstTwoLetters(authUser?.user.username)}
            style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
            size="large"
          />
          <div
            className={`flex flex-col items-start justify-center ml-2 ${
              sidebarStore.isOpen ? "" : "hidden"
            }`}
          >
            <span className="font-bold">{authUser?.user.username}</span>
            <small className="text-slate-600">
              {authUser?.user.first_name} {authUser?.user.last_name}
            </small>
            <span className="font-bold">{authUser?.user.role_detail.name}</span>
          </div> */}
        </div>
        <div className="overflow-x-auto">
          <MenuSidebar items={items} />
        </div>
        {/* <span
          onClick={() => sidebarStore.handleOpen()}
          className={`${
            sidebarStore.isOpen ? PrimeIcons.ANGLE_LEFT : PrimeIcons.ANGLE_RIGHT
          } absolute top-4 -right-4 p-2 rounded-full shadow-md bg-white dark:bg-dark_bg cursor-pointer hover:bg-gray-200 transition-all z-50`}
        ></span> */}
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
