import serverInstance from "@/Utils/axios";
import { IArea } from "@/interfaces/IArea";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { showToast } from "@/Utils/toast";
import { findAll } from "@/services/areaService";

interface AreaStore {
  areas: IArea[] | [];
  getAreas: () => Promise<void>;
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
        } catch (error) {
          console.log("error", error);
        }
      },
      saveArea: async (name: string, director: number) => {
        try {
          const newArea = await saveArea(name, director);
          set((state) => ({ areas: [...state.areas, newArea.data] }));
        } catch (error) {
          console.log("error", error);
        }
      },
      getArea: async (id: number) => {
        const area = await findById(id);
        set({
          area: area.data.area,
        });
        return area.data.area;
      },
    }),
    {
      name: "area-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

const saveArea = async (name: string, director: number) => {
  const response = await serverInstance.post("/api/area/v1/save", {
    name,
    director,
  });
  return response;
};

const findById = async (id: number) => {
  const response = await serverInstance.get(`/api/area/v1/findById/${id}`);
  return response;
};
