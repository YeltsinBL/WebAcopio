import { toast } from "sonner"

export const PopupValidationWarning = ({texto}) =>{
  return toast.warning(texto, 
    { style: { background: 'black', color:' yellow' }} 
  )
}
  