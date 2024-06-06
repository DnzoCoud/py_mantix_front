import serverInstance from "@/Utils/axios";
import { IAuth } from "@/interfaces/auth/IAuth";
export const authLogin = async (
  email?: string,
  password?: string
): Promise<IAuth> => {
  const response = await serverInstance.post<IAuth>("/sign/login", {
    email,
    password,
  });
  return response.data;
};

export const authLogout = async (): Promise<void> => {
  await serverInstance.post("/sign/logout");
};
