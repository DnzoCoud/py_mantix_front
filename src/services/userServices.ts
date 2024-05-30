import serverInstance from "@/Utils/axios";
import { IUser } from "@/interfaces/IUser";


export const findDirectors = async () : Promise<IUser[]> => {
    const response = await serverInstance.get<IUser[]>('/sign/findUserDirectors')
    return response.data;
}