import { useState } from "react"

export const useAsignaTierraValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = (values) => {
    const nuevosErrores = {}  
    if (!values.ut) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!values.uc) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!values.fecha) nuevosErrores.fecha = "El campo FECHA es obligatorio."
  
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}