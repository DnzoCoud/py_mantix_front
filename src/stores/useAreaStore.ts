import createServerInstance from "@/Utils/axios";
import { IArea } from "@/interfaces/IArea";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useAuthStore } from "./auth/authStore";

interface AreaStore {
  areas: IArea[] | [];
  getAreas: () => Promise<void>;
}

export const useAreaStore = create<AreaStore>()(
  persist(
    (set, get) => ({
      areas: [],
      getAreas: async () => {
        try {
          const areas = await findAll();
          if (areas) {
            set({
              areas: areas,
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    {
      name: "area-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

const findAll = async () => {
  const server = createServerInstance();

  const response = await server.get("/api/area/v1/findAll");

  const areas: IArea[] = response.data.areas;
  return areas;
};
