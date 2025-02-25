import { useState } from "react"

export const useTicketValidation = () => {
const [errores, setErrores] = useState({})  
  const validate = (values) => {
    const nuevosErrores = {}  
    if (!values.ingenioModel) nuevosErrores.ingenio = "El campo INGENIO es obligatorio."
    if (!values.viajeModel) nuevosErrores.viaje = "El campo VIAJE es obligatorio."
    if (!values.carguilloId) nuevosErrores.transportista = "El campo TRANSPORTISTA es obligatorio."
    if (!values.fechaModel) nuevosErrores.fecha = "El campo FECHA es obligatorio."
    if (!values.unidadPesoModel) nuevosErrores.unidadPeso = "El campo UNIDAD PESO es obligatorio."
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}