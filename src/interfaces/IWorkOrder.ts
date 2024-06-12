import { IEvent } from "./IEvent"

export type IWorkOrder = {
    id:number
    event:number
    event_detail: IEvent
    observation?:string | null
    diagnosis:string
    cause?:string | null

}