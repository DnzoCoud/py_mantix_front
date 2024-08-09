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

interface RolePermissions {
  [role: string]: string[];
}

/**
 * Menu segun los roles
 *
 */
export const rolePermissions: RolePermissions = {
  admin: ["Calendario", "Maquinas", "Usuarios", "Locaciones", "Areas"],
  manager: ["Calendario", "Maquinas", "Usuarios"],
  visualizer: ["Calendario"],
  // Add more roles as needed
};
