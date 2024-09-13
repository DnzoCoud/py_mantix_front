import { TechnicianActivities } from "@/Components/Events/ActivityForm";
import { IActivity } from "./IActivity";
import { IMaquina } from "./IMaquina";
import { IStatus } from "./IStatus";
import { IUser } from "./IUser";
import { IWorkOrder } from "./IWorkOrder";

export type IDay = {
  date: string;
  completed: boolean;
};
export type IEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  init_time: string;
  end_time: string;
  shift: string;
  maquina: number;
  machine_detail: IMaquina;
  status: number;
  status_detail: IStatus;
  activities: IActivity[] | [];
  activity_data: TechnicianActivities[] | [];
  day: number;
  day_detail: IDay;
  technical: number;
  technical_detail: IUser;
  history_status: HistoryStatus | null;
  code: string;
  request_user: IUser;
};

type EventSubset = Pick<IEvent, "init_time" | "status" | "activity_data">;

export interface EventManipulationDto extends EventSubset {
  id: number;
  diagnosis: string;
  cause: string;
  observation: string;
}

export type HistoryStatus = {
  id: number;
  previous_state: IStatus;
  actual_state: IStatus;
};

export type Maintenancehistory = {
  id: number;
  maintenance_date: string;
  description: string;
  machine: IMaquina;
  performed_by: IUser;
  status: IStatus;
};
