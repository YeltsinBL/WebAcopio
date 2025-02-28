import { useState } from "react"

export const useLiquidacionValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = ({tickets=false, financiamiento = false, adicional = false,values}) => {
    const nuevosErrores = {}  
    if(tickets){
        if (!values.personaIdModel) nuevosErrores.sembrador = "La información del Sembrador es obligatorio."
        if (!values.campoModel) nuevosErrores.campo = "La información de CAMPO es obligatorio."
        if (!values.utModel) nuevosErrores.ut = "La información de UT es obligatorio."
      }
      if(financiamiento){
        if(!values.financiamientoFechaModel) nuevosErrores.financiamientoFecha = "La información de FECHA INICIO es obligatoria"
        if(!values.financiamientoFechaFinModel) nuevosErrores.financiamientoFechaFin = "La información de FECHA FIN es obligatoria"
        if(!values.financiamientoACuentaModel) nuevosErrores.financiamientoACuenta = "La información de A CUENTA es obligatoria"
        if(!values.financiamientoInteresMesModel) nuevosErrores.financiamientoInteresMes = "La información de INTERES MES es obligatoria"
      }
      if(adicional){
        if(!values.adicionalesMotivoModel) nuevosErrores.adicionalesMotivo = "La información de MOTIVO es obligatoria"
        if(!values.adicionalesTotalModel) nuevosErrores.adicionalTotalModel = "La información de MONTO es obligatoria"
      }
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}