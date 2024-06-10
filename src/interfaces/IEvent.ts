import { IMaquina } from "./IMaquina";
import { IStatus } from "./IStatus";

export type IEvent = {
  id:number
  title:string
  start: Date;
  end: Date;
  maquina: number;
  machine_detail: IMaquina
  status:number
  status_detail:IStatus
}
