import { ILocation } from "@/interfaces/ILocation";
import { findAll, findById, saveLocation } from "@/services/locationServices";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LocationStore {
    locations: ILocation[]|[]
    location: ILocation|null
    getLocations: () => Promise<ILocation[]>
    getLocation: (id: number) => Promise<ILocation>;
    saveLocation: (name: string, manager: number, area:number) => Promise<void>;
}

export const useAreaStore = create<LocationStore>()(
    persist(
        (set, get)  => ({
            locations:[],
            location:null,
            getLocations: async () => {
                const locations = await findAll()
                set({locations: locations})
                return locations
            },
            getLocation: async (id) => {
                const location = await findById(id)
                set({location: location})

                return location
            },
            saveLocation: async  (name, manager, area) => {
                await saveLocation(name, manager, area)
            }

        }),
        {
          name: "location-storage",
          storage: createJSONStorage(() => sessionStorage),
        }
    )
)