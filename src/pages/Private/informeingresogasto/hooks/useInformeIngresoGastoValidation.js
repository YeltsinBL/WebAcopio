import { useState } from "react"
import { toast } from "sonner"

export const useInformeIngresoGastoValidation = () => {
  const [errores, setErrores] = useState({})  
    const validate = ({servicio=false,factura=false,save=false, values}) => {
      const nuevosErrores = {}
      if(servicio){
        if (!values.personaIdModel) {
          nuevosErrores.sembrador = "La información del Sembrador es obligatorio."
          toast.warning(nuevosErrores.sembrador, 
            { style: { background: 'black', color:' yellow' }} 
          )
        }
        if (!values.campoModel) {
          nuevosErrores.campo = "La información de CAMPO es obligatorio."
          toast.warning(nuevosErrores.campo, 
            { style: { background: 'black', color:' yellow' }} 
          )
        }
        if (!values.utModel) {
          nuevosErrores.ut = "La información de la UT es obligatorio."
          toast.warning(nuevosErrores.ut, 
            { style: { background: 'black', color:' yellow' }} 
          )
        }
      }
      if (factura){
        if (!values.facturaFechaModel) {
          nuevosErrores.facturaFecha = "El campo FECHA es obligatorio."
          toast.warning(nuevosErrores.facturaFecha, 
            { style: { background: 'black', color:' yellow' }} 
          )
        }
        if (!values.facturaNumeroModel) {
          nuevosErrores.facturaNumero = "El campo FACTURA es obligatorio."
          toast.warning(nuevosErrores.facturaNumero, 
            { style: { background: 'black', color:' yellow' }} 
          )
        }
        if (!values.facturaImporteModel || !parseFloat(values.facturaImporteModel)) {
          nuevosErrores.facturaImporte = "El campo IMPORTE es obligatorio."
          toast.warning(nuevosErrores.facturaImporte, 
            { style: { background: 'black', color:' yellow' }} 
          )
        }
      }
      if(save){
        
      }
      setErrores(nuevosErrores)  
      return {
        isValid: Object.keys(nuevosErrores).length === 0,
        errores: nuevosErrores,
      }
    }  
    return { validate, errores }
}