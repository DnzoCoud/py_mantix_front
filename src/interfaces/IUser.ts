import { IRole } from "./IRole";

export interface IUser {
  id: bigint;
  name: string;
  lastname: string;
  password: string;
  role: IRole;
}
