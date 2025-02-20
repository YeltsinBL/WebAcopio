import { useState } from "react"

export const useClienteValidation = () => {
  const [errores, setErrores] = useState({})  
    const validate = (values) => {
      const nuevosErrores = {}
      if (!values.clienteNombre) nuevosErrores.nombre = "El campo NOMBRE es obligatorio."
  
      setErrores(nuevosErrores)  
      return {
        isValid: Object.keys(nuevosErrores).length === 0,
        errores: nuevosErrores,
      }
    }  
    return { validate, errores }
}