import { useState } from "react";

export const useValidateRecojoModal = () => {
  const [errores, setErrores] = useState({})  
  const validate = (values) => {
    const nuevosErrores = {}  
    if (!values.fechaInicioModel) nuevosErrores.fechaInicio = "El campo FECHA INICIO es obligatorio.";
    if (!values.fechaFinModel) nuevosErrores.fechaFin = "El campo FECHA FINAL es obligatorio.";
    if (!values.cantidadCamionModel) nuevosErrores.cantidadCamion = "El campo CANTIDAD CAMIÓN es obligatorio.";
    if (!values.precioCamionModel) nuevosErrores.precioCamion = "El campo PRECIO CAMIÓN es obligatorio.";
    if (!values.cantidadDiasModel) nuevosErrores.cantidadDias = "El campo CANTIDAD DÍAS es obligatorio.";
    if (!values.precioDiasModel) nuevosErrores.precioDias = "El campo PRECIO DÍAS es obligatorio.";
    if (!values.recojoTotalModel) nuevosErrores.recojoTotal = "El campo TOTAL es obligatorio.";

    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}
  