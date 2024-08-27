interface IColorClasses {
  background: string;
  hover_background: string;
  light_background: string;
  badge_mark: string;
  badges: string;
  border: string;
  textColor: string;
  icon: string;
}

export const getSolidColorEvents = (state: number): string => {
  let colorClasses = "";
  switch (state) {
    case 1: //Programado
      colorClasses = "bg-slate-400 ";
      break;
    case 2: //En ejecucion
      colorClasses = "!bg-blue-400";
      break;
    case 3: //Completado
      colorClasses = "bg-green-400";
      break;
    case 4: //Reprogramado
      colorClasses = "bg-yellow-400";
      break;
    default: //PeticionReprogramado
      colorClasses = "bg-purple-400";
      break;
  }
  return colorClasses;
};

export const getColorEvents = (state: number): IColorClasses => {
  let colorClasses: IColorClasses;

  switch (state) {
    case 1: //Programado
      colorClasses = {
        background: "bg-slate-200 ",
        hover_background: "hover:bg-gray-100",
        light_background: "bg-gray-200",
        badge_mark: "bg-gray-600",
        badges: "bg-gray-200",
        border: "border-2 border-gray-400",
        textColor: "text-slate-600",
        icon: "pi pi-wrench",
      };
      break;
    case 2: //En ejecucion
      colorClasses = {
        background: "!bg-blue-100",
        light_background: "bg-blue-200",
        hover_background: "hover:!bg-blue-50",
        badge_mark: "bg-blue-600",
        badges: "!bg-blue-200",
        border: "border-2 border-blue-400",
        textColor: "text-blue-500",
        icon: "pi pi-users",
      };
      break;
    case 3: //Completado
      colorClasses = {
        background: "bg-green-100",
        light_background: "bg-green-200",
        hover_background: "hover:bg-green-50",
        badge_mark: "bg-green-600",
        badges: "bg-green-200",
        border: "border-2 border-green-400",
        textColor: "text-green-500",
        icon: "pi pi-cloud-download",
      };
      break;
    case 4: //Reprogramado
      colorClasses = {
        background: "bg-yellow-200",
        light_background: "bg-yellow-200",
        hover_background: "hover:bg-yellow-100",
        badge_mark: "bg-yellow-600",
        badges: "bg-yellow-300",
        border: "border-2 border-yellow-300",
        textColor: "text-yellow-700",
        icon: "pi pi-calendar-plus",
      };

      break;
    default: //PeticionReprogramado
      colorClasses = {
        background: "bg-purple-200",
        light_background: "bg-purple-200",
        hover_background: "hover:bg-purple-100",
        badge_mark: "bg-purple-600",
        badges: "bg-purple-200",
        border: "border-2 border-purple-500",
        textColor: "text-purple-500",
        icon: "pi pi-calendar-times",
      };
      break;
  }
  return colorClasses;
};
