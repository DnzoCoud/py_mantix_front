"use client";
import { getFirstTwoLetters } from "@/Utils/useComposables";
import { setAuthUser, clearAuthUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/services/authService";
import { useAuthStore } from "@/stores/auth/authStore";
import useThemeStore, { Theme } from "@/stores/themeStore";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimeIcons } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { ContextMenu } from "primereact/contextmenu";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { Tag } from "primereact/tag";
import React, { useEffect, useRef } from "react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const cm = useRef<ContextMenu>(null);
  const contextMenuItems: MenuItem[] = [
    // { label: "Perfil", icon: "pi pi-user" },
    {
      label: "Cerrar Sesion",
      icon: "pi pi-sign-in",
      command: () => handleLogout(),
    },
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
    } else {
      nextTheme = "light";
    }
    setTheme(nextTheme);
  };

  // Determinar qué icono usar según el tema actual
  let icon: string;
  if (theme === "light") {
    icon = PrimeIcons.SUN;
  } else {
    icon = PrimeIcons.MOON;
  }

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setAuthUser({
          token: session.user.token,
          user: {
            id: parseInt(session.user.id, 10),
            email: session.user.email ? session.user.email : "",
            first_name: session.user.first_name ? session.user.first_name : "",
            last_name: session.user.last_name ? session.user.last_name : "",
            is_director: session.user.is_director,
            is_manager: session.user.is_manager,
            username: session.user.username ? session.user.username : "",
            role_detail: session.user.role_detail,
          },
        })
      );
      localStorage.setItem("serverToken", session.user.token);
    }
  }, [session]);

  const handleLogout = async () => {
    // await authData.logout();
    await logout().unwrap();
    await signOut({ callbackUrl: "/Login" });
    dispatch(clearAuthUser());
    localStorage.removeItem("serverToken");
  };

  const authUser = useAppSelector((state) => state.auth.authUser);
  return (
    <>
      <div className="w-full h-12 flex justify-center items-center z-40 mt-2 ">
        <div className="flex justify-between px-4 items-center w-full md:w-[60%]  lg:w-[40%] h-full   bg-gradient-to-br from-zinc-50 dark:from-zinc-800 to-zinc-100 dark:to-zinc-900  dark:bg-dark_bg p-2 rounded-md transition-all ease-out border dark:border-zinc-600">
          <div
            className="flex justify-evenly items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <h1 className="dark:text-white font-extrabold mr-1 logo_text !tracking-tight">
              Mantix
            </h1>
            <Tag className="!bg-black" value="Pro" />
          </div>
          {/* <div className="flex justify-evenly items-center">
            <Menubar
              model={navBarMenuitems}
              className="p-0"
              style={{ padding: "0!important" }}
              pt={{ root: { className: "dark:!bg-dark_bg" } }}
            />
          </div> */}
          <div className="flex items-center justify-evenly">
            <span
              onClick={handleToggleTheme}
              className={
                icon +
                " mr-2 p-2 cursor-pointer text-xl dark:text-white !hidden"
              }
            ></span>
            {/* <div className="flex flex-col mr-4">
              <span className="dark:text-white">{authUser?.user.username}</span>
              <span className="p-[0.1rem] bg-blue-400 text-center text-white rounded-lg ">
                {authUser?.user.role_detail.name}
              </span>
            </div> */}
            <Avatar
              label={getFirstTwoLetters(authUser?.user.username)}
              style={{ backgroundColor: "#000", color: "#ffffff" }}
              onContextMenu={(e) => cm.current?.show(e)}
            />
          </div>
          <ContextMenu model={contextMenuItems} ref={cm} />
        </div>
      </div>
    </>
  );
}
