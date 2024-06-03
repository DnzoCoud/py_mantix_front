import { IUser } from "./IUser"

export type IArea = {
    id:number
    name:string
    director:number
    director_detail: IUser | null
}