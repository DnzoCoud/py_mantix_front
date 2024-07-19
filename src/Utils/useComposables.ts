import { TechnicianActivities } from "@/Components/Events/ActivityForm";
import { IActivity } from "@/interfaces/IActivity";
import { IUser } from "@/interfaces/IUser";

export const getFirstTwoLetters = (
  word: string | undefined
): string | undefined => {
  return word?.substring(0, 2).toUpperCase();
};

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1]; // Remove "data:*/*;base64," prefix
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export function transformToTechnicianActivities(
  activities: IActivity[]
): TechnicianActivities[] {
  // Primero, agrupamos las actividades por técnico
  const groupedByTechnician: { [key: string]: IActivity[] } = {};
  activities.forEach((activity) => {
    const tech = activity.technical_detail || null;
    const techId = tech ? tech.id.toString() : "null"; // Usamos el id del técnico como clave, convirtiéndolo a string
    if (!groupedByTechnician[techId]) {
      groupedByTechnician[techId] = [];
    }
    groupedByTechnician[techId].push(activity);
  });

  // Luego, convertimos el objeto agrupado en un array de TechnicianActivities
  const technicianActivities: TechnicianActivities[] = Object.keys(
    groupedByTechnician
  ).map((techId) => ({
    technician:
      techId !== "null"
        ? activities.find(
            (activity) => activity.technical_detail?.id.toString() === techId
          )?.technical_detail || null
        : null,
    activities: groupedByTechnician[techId],
  }));

  return technicianActivities;
}
