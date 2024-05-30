import { IUser } from "@/interfaces/IUser";
import { IAuth } from "@/interfaces/auth/IAuth";
import { authLogin, authLogout } from "@/services/auth/authService";
import { findDirectors } from "@/services/userServices";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  setUser: (user?:IAuth) => void;
  logout: () => Promise<void>;
  user?: IAuth | null;
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
      setUser: (user) => set({user: user, isLoggedIn:true}),
      logout: async () => {
        const currentUser = get().user;
        if (currentUser) await authLogout();
      },
      getToken: () => get().user?.token,
      getDirectors : async () => {
        const directorInfo = await findDirectors()
        set({
          directors: directorInfo
        })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

// const authLogout = async (token: string) => {
//   serverInstance.post("/api/sign/v1/logout");
// };

// const authLogin = async (email?: string, password?: string) => {

//   const response = serverInstance.post<IAuth>("/api/sign/v1/login", {
//     email,
//     password,
//   });

//   return response;
// };


// const findDirectors = async () => {
//   const response = serverInstance.get('/api/sign/v1/findUserDirectors')
//   return response;
// }