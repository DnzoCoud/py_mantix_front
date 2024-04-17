"use client";
import { IMenuSidebar } from "@/interfaces/IMenuSidebar";
import useSidebarStore from "@/stores/useSidebarStore";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";

export default function MenuSidebar({ items }: IMenuSidebar) {
  const router = useRouter();
  const pathName = usePathname();
  const handleRoutePush = (route?: string) => {
    if (route !== undefined) router.push(route);
  };
  const sidebarStore = useSidebarStore();

  return (
    <>
      {items?.map((item, index) => (
        <>
          <Tooltip
            target={`${
              !sidebarStore.isOpen ? ".custom-target-icon-" + index : ""
            }`}
          />
          <div className={`flex flex-col mx-1`} key={index}>
            <div
              className={`flex ${
                sidebarStore.isOpen ? "justify-start" : "justify-center"
              } items-center`}
            >
              <i className={item.icon + " mr-2 text-gray-400"}></i>
              {sidebarStore.isOpen && (
                <span className="text-gray-400">{item.title}</span>
              )}
            </div>
            {item.items?.map((menu, menuIndex) => (
              <div
                className={`flex ${
                  sidebarStore.isOpen && menu.badge !== undefined
                    ? "justify-between"
                    : sidebarStore.isOpen
                    ? "justify-between"
                    : "justify-center"
                }  items-center mt-4 ${
                  pathName == menu.link
                    ? "bg-gray-200 dark:bg-gray-700 shadow-md dark:shadow-dark_medium_bg"
                    : " hover:text-black"
                }  rounded-md p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-all custom-target-icon-${index}`}
                onClick={() => handleRoutePush(menu.link)}
                data-pr-tooltip={menu.tooltip}
                data-pr-position="right"
                key={menuIndex}
              >
                <div className={`flex items-center justify-start  `}>
                  <i
                    className={`${menu.icon} ${
                      pathName == menu.link
                        ? "text-blue-400 dark:text-green-400"
                        : "text-gray-00 dark:text-blue-900 hover:text-black"
                    } ${
                      sidebarStore.isOpen && menu.badge !== undefined
                        ? "mr-2"
                        : !sidebarStore.isOpen && menu.badge !== undefined
                        ? "mr-2"
                        : sidebarStore.isOpen
                        ? "mr-2"
                        : "mr-0"
                    }  `}
                  ></i>
                  <span
                    className={`dark:text-white ${
                      pathName == menu.link
                        ? "font-bold text-black"
                        : "text-gray-600"
                    }
                    ${sidebarStore.isOpen ? "" : "hidden"}
                    `}
                  >
                    {menu.label}
                  </span>
                </div>
                {menu.badge !== undefined && <Badge value={menu.badge} />}
              </div>
            ))}
          </div>
          <Divider />
        </>
      ))}
    </>
  );
}
