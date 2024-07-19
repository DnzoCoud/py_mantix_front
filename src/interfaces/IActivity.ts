import { IUser } from "./IUser";

export type IActivity = {
  id: number | null;
  name: string;
  completed: boolean;
  technical: number | null;
  technical_detail?: IUser | null;
};
