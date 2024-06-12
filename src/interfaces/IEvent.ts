import { IActivity } from "./IActivity";
import { IMaquina } from "./IMaquina";
import { IStatus } from "./IStatus";

export type IDay = {
  date:string
  completed:boolean
}
export type IEvent = {
  id:number
  title:string
  start: Date;
  end: Date;
  init_time: string
  end_time: string
  shift:string
  maquina: number;
  machine_detail: IMaquina
  status:number
  status_detail:IStatus
  activities:IActivity[] | []
  activity_data:IActivity[] | []
  day:number
  day_detail:IDay
}
