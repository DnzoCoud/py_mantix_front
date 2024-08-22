import { PrimeIcons } from "primereact/api";

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
  manager: ["Calendario", "Maquinas", "Locaciones", "Areas"],
  director: ["Calendario"],
  visualizer: ["Calendario"],
  guest: ["Calendario"],
  technical: ["Calendario"],
  provider: ["Calendario"],
  // Add more roles as needed
};

export const allowedAddRoles = [1, 6];
export const allowedReprogramRoles = [1, 6, 7];
export const allowedEjecuteRoles = [1, 6];
export const allowedDownloadWorkOrderRoles = [1, 6, 7];

// Mapa de íconos que asocia los nombres de íconos de la base de datos con PrimeIcons
export const iconMap: { [key: string]: string } = {
  calendar: PrimeIcons.CALENDAR,
  truck: "pi pi-truck",
  users: PrimeIcons.USERS,
  locations: PrimeIcons.TH_LARGE, // Ajustar según el ícono deseado
  areas: PrimeIcons.BOOKMARK,
  roles: PrimeIcons.MINUS_CIRCLE,
};
export const iconRole: { [key: string]: string } = {
  admin: PrimeIcons.SHIELD,
  guest: PrimeIcons.USER,
  manager: "pi pi-calendar-clock",
  director: PrimeIcons.TH_LARGE, // Ajustar según el ícono deseado
  visualizer: PrimeIcons.BOOKMARK,
  technical: PrimeIcons.COG,
  provider: PrimeIcons.MINUS_CIRCLE,
};
