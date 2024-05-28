import { toast } from "react-toastify";
import { create } from "zustand";
import "react-toastify/dist/ReactToastify.css";
type ToastState = {
  setMessage: (message: string, type?:number) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  setMessage: (message, type) => {
    switch(type){
      case 1: //Error
        toast.error(message)
        break
      case 2://succes
        toast.success(message);
        break
      default:
        toast.success(message);
        break
    }
  },
}));
