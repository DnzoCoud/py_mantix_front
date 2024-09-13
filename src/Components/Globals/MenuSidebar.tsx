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
        <React.Fragment key={index}>
          <Tooltip
            target={`${
              !sidebarStore.isOpen ? ".custom-target-icon-" + index : ""
            }`}
          />
          <div className={`flex flex-col mx-1 overflow-y-auto mt-4 px-2`}>
            <div
              className={`flex ${
                sidebarStore.isOpen ? "justify-start" : "justify-center"
              } items-center`}
            >
              <i className={item.icon + " mr-2 text-gray-800"}></i>
              {sidebarStore.isOpen && (
                <span className="text-gray-800">{item.title}</span>
              )}
            </div>
            {item.items?.map((menu, menuIndex) => (
              <div
                className={`flex ${
                  sidebarStore.isOpen && menu.badge !== undefined
                    ? "justify-between"
                    : sidebarStore.isOpen
                    ? "justify-between  ml-2"
                    : "justify-center"
                }  items-center mt-4 ${
                  pathName == menu.link
                    ? "bg-white dark:bg-gray-700 border-2"
                    : " hover:text-black"
                }  rounded-md p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all custom-target-icon-${index} active:bg-gray-300`}
                onClick={() => handleRoutePush(menu.link)}
                data-pr-tooltip={menu.tooltip}
                data-pr-position="right"
                key={menuIndex}
              >
                <div className={`flex items-center justify-start  `}>
                  <i
                    className={`${menu.icon} ${
                      pathName == menu.link
                        ? "text-black dark:text-green-400 "
                        : "text-zinc-400 dark:text-blue-900 "
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
                        : "text-zinc-500"
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
        </React.Fragment>
      ))}
    </>
  );
}
