interface IColorClasses {
  background: string;
  light_background: string;
  shadow: string;
  badges: string;
}

export const getColorEvents = (state: number = 1): IColorClasses => {
  let colorClasses: IColorClasses;

  switch (state) {
    case 1: //Programado
      colorClasses = {
        background: "bg-gray-400",
        light_background: "bg-gray-200",
        shadow: "shadow-gray-400",
        badges: "bg-gray-700",
      };
      break;
    case 2: //En ejecucion
      colorClasses = {
        background: "bg-blue-400",
        light_background: "bg-blue-200",

        shadow: "shadow-blue-400",
        badges: "bg-blue-700",
      };
      break;
    case 3: //Completado
      colorClasses = {
        background: "bg-green-400",
        light_background: "bg-green-200",

        shadow: "shadow-green-400",
        badges: "bg-green-700",
      };
      break;
    default: //Reprogramado
      colorClasses = {
        background: "bg-yellow-400",
        light_background: "bg-yellow-200",

        shadow: "shadow-yellow-400",
        badges: "bg-yellow-700",
      };
      break;
  }
  return colorClasses;
};
