import { IMaquina } from "./IMaquina";

export interface IEvent {
  title: string;
  start: Date | null;
  end: Date | null | undefined;
  maquina: IMaquina;
}
