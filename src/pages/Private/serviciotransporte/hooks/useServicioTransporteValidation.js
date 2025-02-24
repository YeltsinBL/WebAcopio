import { useState } from "react"
import { PopupValidationWarning } from "~components/common/MessagePopupValidation"

export const useServicioTransporteValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = ({save = false, payment = false, values}) => {
    const nuevosErrores = {}  
    if(save){
      if (!values.fechaModel) {
        nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.fechaModel})
      }
      if (!values.sumaPesoBrutoModel) {
        nuevosErrores.suma = "El campo SUMA PESO BRUTO es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.suma})
      }
      if (!values.totalModel) {
        nuevosErrores.total = "El campo TOTAL es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.total})
      }
    }
    if (!values.carguilloIdModel) {
      nuevosErrores.carguillo = "El campo TRANSPORTISTA es obligatorio."
      PopupValidationWarning({texto: nuevosErrores.carguillo})
    }
    if(payment){
      if (!values.fechaPagadoModel) nuevosErrores.fechaPagadoModel = "El campo FECHA es obligatorio."
      if (!values.pagadoModel) nuevosErrores.pagado = "El campo PAGADO es obligatorio."
      if (!values.cteModel && !values.efectivo) nuevosErrores.ctacte = "El campo CTA. CTE. es obligatorio."
      if (values.pendientePagarModel ==0) {
        nuevosErrores.lista = 'Ya ha pagado el total de la deuda'
        PopupValidationWarning({texto: nuevosErrores.lista})
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