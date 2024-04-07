export interface IMenuSidebar {
  icon?: string | any;
  label?: string;
  comand?: () => void;
  badge?: number;
  items?: IMenuSidebar[];
  title?: string;
  link?: string;
  tooltip?: string;
}
