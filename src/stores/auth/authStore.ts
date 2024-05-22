import createServerInstance from "@/Utils/axios";
import { IAuth } from "@/interfaces/auth/IAuth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: IAuth | null;
  getToken: () => string | undefined
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      //Metodos
      login: async (username, password) => {
        try {
          const authInfo = await authLogin(username, password);

          if (authInfo) {
            set({
              user: authInfo.data,
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      },
      logout: async () => {
        const currentUser = get().user;
        if (currentUser) await authLogout(currentUser.token);
      },
      getToken: () => get().user?.token
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

const authLogout = async (token: string) => {
  const server = createServerInstance();
  server.post("/api/sign/v1/logout");
};

const authLogin = async (email: string, password: string) => {
  const server = createServerInstance();

  const response = server.post<IAuth>("/api/sign/v1/login", {
    email,
    password,
  });

  return response;
};
