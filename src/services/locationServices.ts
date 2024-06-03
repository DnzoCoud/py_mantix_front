import serverInstance from "@/Utils/axios";
import { ILocation } from "@/interfaces/ILocation";

export const findAll = async () => {
    return await serverInstance.get<ILocation[]>("/location/findAll").then(
      (response) => {
        const locations: ILocation[] = response.data;
        return locations;
      }
    ).catch(
      (error) => {throw new Error(error.message)}
    );

};

export const findById = async (id: number) => {
    return await serverInstance.get<ILocation>(`/location/findById/${id}`).then(
      (response) => {return response.data}
    ).catch(
      (error) => {throw new Error(error.message)}
    );
    
};


export const saveLocation = async (name: string, manager: number, area:number) => {
    return await serverInstance.post<ILocation>("/location/save", {
      name,
      manager,
      area
    }).then(
      (response) => {return response.data}
    ).catch(
      (error) => {throw new Error(error.message)}
    );
    
};