import serverInstance from "@/Utils/axios";
import { IArea } from "@/interfaces/IArea";


export const findAll = async () => {
    return await serverInstance.get<IArea[]>("/area/findAll").then(
      (response) => {
        const areas: IArea[] = response.data;
        return areas;
      }
    ).catch(
      (error) => {throw new Error(error.message)}
    );

};

export const saveArea = async (name: string, director: number) => {
    return await serverInstance.post<IArea>("/area/save", {
      name,
      director,
    }).then(
      (response) => {return response.data}
    ).catch(
      (error) => {throw new Error(error.message)}
    );
    
  };

export const findById = async (id: number) => {
    return await serverInstance.get<IArea>(`/area/findById/${id}`).then(
      (response) => {return response.data}
    ).catch(
      (error) => {throw new Error(error.message)}
    );
    
};