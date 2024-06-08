interface IColorClasses {
  background: string;
  hover_background:string
  light_background: string;
  badge_mark: string;
  badges: string;
}

export const getColorEvents = (state: number): IColorClasses => {
  let colorClasses: IColorClasses;

  switch (state) {
    case 1: //Programado
      colorClasses = {
        background: "bg-gray-300",
        hover_background: "bg-gray-400",
        light_background: "bg-gray-200",
        badge_mark: "bg-gray-600",
        badges: "bg-gray-500",
      };
      break;
    case 2: //En ejecucion
      colorClasses = {
        background: "bg-blue-300",
        light_background: "bg-blue-200",
        hover_background: "bg-blue-400",
        badge_mark: "bg-blue-600",
        badges: "bg-blue-500",
      };
      break;
    case 3: //Completado
      colorClasses = {
        background: "bg-green-300",
        light_background: "bg-green-200",
        hover_background: "bg-green-400",
        badge_mark: "bg-green-600",
        badges: "bg-green-500",
      };
      break;
    default: //Reprogramado
      colorClasses = {
        background: "bg-yellow-300",
        light_background: "bg-yellow-200",
        hover_background: "bg-yellow-400",
        badge_mark: "bg-yellow-600",
        badges: "bg-yellow-500",
      };
      break;
  }
  return colorClasses;
};
