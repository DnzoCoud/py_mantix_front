import { TechnicianActivities } from "@/Components/Events/ActivityForm";
import { IActivity } from "./IActivity";
import { IMaquina } from "./IMaquina";
import { IStatus } from "./IStatus";
import { IUser } from "./IUser";

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

export type HistoryStatus = {
  id: number;
  previous_state: IStatus;
  actual_state: IStatus;
};
