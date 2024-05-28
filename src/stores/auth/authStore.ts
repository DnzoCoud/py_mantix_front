import serverInstance from "@/Utils/axios";
import { IUser } from "@/interfaces/IUser";
import { IAuth } from "@/interfaces/auth/IAuth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: IAuth | null;
  getToken: () => string | undefined;
  directors: IUser[] | []
  getDirectors: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      directors: [],
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
      getToken: () => get().user?.token,
      getDirectors : async () => {
        const directorInfo = await findDirectors()
        set({
          directors: directorInfo.data
        })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

const authLogout = async (token: string) => {
  serverInstance.post("/api/sign/v1/logout");
};

const authLogin = async (email: string, password: string) => {

  const response = serverInstance.post<IAuth>("/api/sign/v1/login", {
    email,
    password,
  });

  return response;
};


const findDirectors = async () => {
  const response = serverInstance.get('/api/sign/v1/findUserDirectors')
  return response;
}