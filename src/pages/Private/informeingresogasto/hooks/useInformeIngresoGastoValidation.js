import { useState } from "react"
import { toast } from "sonner"

export const useInformeIngresoGastoValidation = () => {
  const [errores, setErrores] = useState({})  
    const validate = ({servicio=false,factura=false,save=false, values}) => {
      const nuevosErrores = {}
      if(servicio){
        if (!values.personaIdModel) {
          nuevosErrores.sembrador = "La información del Sembrador es obligatorio."
          PopupValidationWarning({texto: nuevosErrores.sembrador})
        }
        if (!values.campoModel) {
          nuevosErrores.campo = "La información de CAMPO es obligatorio."
          PopupValidationWarning({texto: nuevosErrores.campo})
        }
        if (!values.utModel) {
          nuevosErrores.ut = "La información de la UT es obligatorio."
          PopupValidationWarning({texto: nuevosErrores.ut})
        }
      }
      if (factura){
        if (!values.facturaFechaModel) {
          nuevosErrores.facturaFecha = "El campo FECHA es obligatorio."
          PopupValidationWarning({texto: nuevosErrores.facturaFecha})
        }
        if (!values.facturaNumeroModel) {
          nuevosErrores.facturaNumero = "El campo FACTURA es obligatorio."
          PopupValidationWarning({texto: nuevosErrores.facturaNumero})
        }
        if (!values.facturaImporteModel || !parseFloat(values.facturaImporteModel)) {
          nuevosErrores.facturaImporte = "El campo IMPORTE es obligatorio."
          PopupValidationWarning({texto: nuevosErrores.facturaImporte})
        }
      }
      if(save){
        if(!values.facturaTotalModel){
          nuevosErrores.totalImporteNetoFactura ="La información de TOTAL en IMPORTE NETO es obligatorio"
          PopupValidationWarning({texto: nuevosErrores.totalImporteNetoFactura})
        }
        if(!values.resultadoModel) {
          nuevosErrores.resultado ="La información de RESULTADO es obligatorio"
          PopupValidationWarning({texto: nuevosErrores.resultado})
        }
      }
      setErrores(nuevosErrores)  
      return {
        isValid: Object.keys(nuevosErrores).length === 0,
        errores: nuevosErrores,
      }
    }  
    return { validate, errores }
}

const PopupValidationWarning = ({texto}) =>{
  return toast.warning(texto, 
    { style: { background: 'black', color:' yellow' }} 
  )
}
