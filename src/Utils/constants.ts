/**
 * Estados de los eventos corresponden a la db
 */
interface EventState {
  /**
   * 1
   */
  PROGRAMADO: number;
  /**
   * 2
   */
  EN_EJECUCION: number;
  /**
   * 3
   */
  COMPLETADO: number;
  /**
   * 4
   */
  REPROGRAMADO: number;
  /**
   * 5
   */
  PETICION_REPROGRAMADO: number;
}

export const EVENT_STATE: EventState = {
  PROGRAMADO: 1,
  EN_EJECUCION: 2,
  COMPLETADO: 3,
  REPROGRAMADO: 4,
  PETICION_REPROGRAMADO: 5,
};
