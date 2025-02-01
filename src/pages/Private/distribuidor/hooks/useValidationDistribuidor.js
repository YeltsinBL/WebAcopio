import { useState } from "react";

export const useValidationDistribuidor = () => {
  const [errores, setErrores] = useState({})  
    const validate = (values) => {
      const nuevosErrores = {}  
      if (!values.distribuidorRuc) nuevosErrores.ruc = "El campo RUC es obligatorio."
      if (!values.distribuidorNombre) nuevosErrores.nombre = "El campo NOMBRE es obligatorio."
  
      setErrores(nuevosErrores)  
      return {
        isValid: Object.keys(nuevosErrores).length === 0,
        errores: nuevosErrores,
      }
    }  
    return { validate, errores }
}