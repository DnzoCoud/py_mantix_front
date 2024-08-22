"use client";
import { IRole, MenuRole } from "@/interfaces/IRole";
import { iconMap, iconRole } from "@/Utils/constants";
import { Menu } from "@/interfaces/IRole";
import { PickList, PickListChangeEvent } from "primereact/picklist";
import React, { useEffect, useState } from "react";
import { useFetchMenusQuery } from "@/redux/services/userService";

interface RoleCardProps {
  role: IRole;
  onRoleChange: (roleId: number, menus: Menu[]) => void;
}

export default function RoleCard({ role, onRoleChange }: RoleCardProps) {
  const [source, setSource] = useState(
    role.menus.map((menu) => menu.menu_detail)
  );
  const [target, setTarget] = useState<Menu[]>([]);
  const [allMenus, setAllMenus] = useState<Menu[]>([]);
  const { data: fetchMenus } = useFetchMenusQuery();

  useEffect(() => {
    if (fetchMenus) setAllMenus(fetchMenus);
  }, [fetchMenus]);

  useEffect(() => {
    if (allMenus.length > 0 && role.menus.length > 0) {
      // Menús asociados al rol
      const roleMenus = role.menus.map((menu) => menu.menu_detail);
      setSource(roleMenus);

      // Menús no asociados al rol
      const nonRoleMenus = allMenus.filter(
        (menu) => !roleMenus.some((roleMenu) => roleMenu.id === menu.id)
      );
      setTarget(nonRoleMenus ?? []);
    }
  }, [allMenus, role.menus]);

  const itemTemplate = (item: Menu) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex gap-2 items-center">
          <i className={`font-bold text-900 ${iconMap[item.icon]}`}></i>
          <span className="font-bold">{item.name}</span>
        </div>
      </div>
    );
  };

  const onChange = (event: PickListChangeEvent) => {
    setSource(event.source);
    setTarget(event.target);

    onRoleChange(role.id, event.source);
  };

  return (
    <>
      <div className="w-full border border-black rounded-2xl p-2 flex flex-col items-start justify-around transition-all">
        <div className="flex items-center justify-start gap-2 text-blue-500 mb-4">
          <i
            className={`${iconRole[role.icon]} p-2 bg-blue-100 rounded-full`}
          ></i>
          <span className="font-bold text-xl">{role.name}</span>
        </div>
        <div className="w-full">
          <PickList
            dataKey="id"
            itemTemplate={itemTemplate}
            source={source}
            target={target}
            breakpoint="1280px"
            sourceHeader="Permitido"
            targetHeader="Sin Permisos"
            sourceStyle={{ height: "12rem", width: "auto" }}
            targetStyle={{ height: "12rem", width: "auto" }}
            showTargetControls={false}
            showSourceControls={false}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}
