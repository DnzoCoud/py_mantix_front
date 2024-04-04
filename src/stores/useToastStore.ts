import { toast } from "react-toastify";
import { create } from "zustand";
import "react-toastify/dist/ReactToastify.css";
type ToastState = {
  setMessage: (message: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  setMessage: (message) => {
    toast.success(message);
  },
}));
