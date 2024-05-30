import serverInstance from "@/Utils/axios";
import { IArea } from "@/interfaces/IArea";


export const findAll = async () => {
    const response = await serverInstance.get("/area/findAll");
    const areas: IArea[] = response.data.areas;
    return areas;
};