import { IArea } from "./IArea";
import { IUser } from "./IUser";

export type ILocation = {
  id?: number;
  name: string;
  area:number
  area_detail: IArea
  manager: number
  manager_detail:IUser
}
