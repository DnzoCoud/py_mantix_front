import { IUser } from "./IUser"

export interface IArea{
    id:number
    name:string
    director:number
    director_detail: IUser | null
}