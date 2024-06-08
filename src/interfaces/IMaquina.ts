import { ILocation } from "./ILocation";
import { IStatus } from "./IStatus";

export type IMaquina = {
  id: number;
  name: string;
  model: string;
  serial: string;
  last_maintenance: Date | null;
  location: number;
  location_detail: ILocation;
  status: number;
  status_detail: IStatus;
};
