import { useState } from "react"

export const useCorteValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = ({imagen=false,values}) => {
    const nuevosErrores = {}  
    if(!imagen){
      if (!values.ucModel) nuevosErrores.uc = "El campo UC es obligatorio."
      if (!values.fechaModel) nuevosErrores.fecha = "El campo FECHA es obligatorio."
      if (!values.precioModel) nuevosErrores.precio = "El campo PRECIO es obligatorio."
      if (!values.sumaPesoBrutoModel) nuevosErrores.suma = "El campo SUMA PESO BRUTO es obligatorio."
      if (!values.totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
    }

    if(imagen){
      if (!values.imagenComentario) nuevosErrores.imagenComentario = "El campo COMENTARIO es obligatorio."
      if (!values.imagenUrl) nuevosErrores.imagenUrl = "El campo URL es obligatorio."
    }
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}