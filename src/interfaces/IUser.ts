import { IRole } from "./IRole";

export type IUser = {
  id: number;
  username: string;
  email: string;
  password?: string;
  first_name: string|null
  last_name: string | null
  is_director: boolean
  is_manager: boolean
  role?: number;
  role_detail: IRole
}
