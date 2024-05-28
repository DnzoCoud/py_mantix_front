import { useToastStore } from "@/stores/useToastStore"

export const showToast = (message:string, type:number = 0) => {
    const toastStore = useToastStore()
    toastStore.setMessage(message, type)
}