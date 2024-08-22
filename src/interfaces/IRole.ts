import { Comun } from "./Comun";

export interface Menu extends Comun {
  icon: string;
  tooltip: string;
  link: string;
}
export interface MenuRole {
  id: number;
  menu_detail: Menu;
}

export interface IRole extends Comun {
  menus: MenuRole[];
  icon: string;
}
