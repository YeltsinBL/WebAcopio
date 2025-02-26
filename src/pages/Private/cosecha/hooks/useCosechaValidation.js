import { useState } from "react"

export const useCosechaValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = (values) => {
    const nuevosErrores = {}  
    if (!values.utModel) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!values.ucModel) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!values.fechaModel) nuevosErrores.fecha = "El campo Fecha es obligatorio."
    if (!values.cosechaModel) nuevosErrores.cosecha = "El campo Tipo Cosecha es obligatorio."
  
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}