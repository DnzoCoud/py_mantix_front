import serverInstance from "@/Utils/axios";
import { IArea } from "@/interfaces/IArea";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { findAll, findById, saveArea } from "@/services/areaService";

interface AreaStore {
  areas: IArea[] | [];
  getAreas: () => Promise<IArea[]>;
  saveArea: (name: string, director: number) => Promise<void>;
  getArea: (id: number) => Promise<IArea>;
  area: IArea | null;
}

export const useAreaStore = create<AreaStore>()(
  persist(
    (set, get) => ({
      areas: [],
      area: null,
      getAreas: async () => {
        try {
          const areas = await findAll();
          if (areas) {
            set({
              areas: areas,
            });
          }

          return areas
        } catch (error) {
          console.log("error", error);
          return []
        }
      },
      saveArea: async (name: string, director: number) => {
        try {
          const newArea = await saveArea(name, director);
          set((state) => ({ areas: [...state.areas, newArea] }));
        } catch (error:any) {
          throw new Error(error.message)
        }
      },
      getArea: async (id: number) => {
        const area = await findById(id);
        set({
          area: area,
        });
        return area;
      },
    }),
    {
      name: "area-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);


