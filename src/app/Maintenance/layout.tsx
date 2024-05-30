"use client";
import NavBar from "@/Components/Globals/NavBar";
import SideBar from "@/Components/Globals/SideBar";
import React, { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "primeicons/primeicons.css";
import { PrimeIcons } from "primereact/api";
import useThemeStore from "@/stores/themeStore";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [maximixed, setMaximixed] = useState<boolean>(false);
  const { theme } = useThemeStore();

  // Determinar el tema a usar para ToastContainer
  const toastTheme = theme.toString() === "auto" ? "light" : theme;
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={toastTheme}
      />
      <div className="flex gap-4 p-2 w-full h-full">
        <SideBar />
        <main className="flex flex-col w-full h-full overflow-auto ">
          <NavBar />
          <div
            className={`dark:bg-dark_bg bg-white_medium_bg mt-4 p-4 rounded-md transition-all ${
              maximixed ? "maximixed" : ""
            }`}
          >
            <div className="w-full h-auto flex justify-end items-center">
              <i
                className={`${
                  maximixed
                    ? PrimeIcons.WINDOW_MINIMIZE
                    : PrimeIcons.WINDOW_MAXIMIZE
                } dark:text-white cursor-pointer p-2 transition-all hover:bg-slate-200 dark:hover:bg-slate-950 rounded-full`}
                onClick={() => setMaximixed(maximixed ? false : true)}
              ></i>
            </div>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
