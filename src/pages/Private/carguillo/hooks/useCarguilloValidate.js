import { useState } from "react"

export const useCarguilloValidate = () => {
  const [errores, setErrores] = useState({})  
  const validate = ({isPlaca=false, values}) => {
    const nuevosErrores = {}  
    if (!values.titular) nuevosErrores.titular = "El campo TITULAR es obligatorio."
    if (!values.tipoId) nuevosErrores.tipoId = "El campo TIPO es obligatorio."
    if (isPlaca) {
      if(!values.tipoTransporteId) nuevosErrores.tipoTransporteId = 'Seleccione un TRANSPORTE antes de agregar.'
      if(!values.placa) nuevosErrores.placa = 'Ingrese una PLACA antes de agregar.'
      else{
        const isDuplicado = values.placasList.some(
          (item) => item.carguilloTipoId === values.tipoTransporteId &&
          item.carguilloDetallePlaca === values.placa
        )
        if(isDuplicado) nuevosErrores.placa="La placa ya ha sido agregado con este tipo de transporte"
      }
    }
    const verificarCantidadTipoTransporte = (array) => {
        if (values.isRequiredPlaca){
          const uniqueTypes = new Set(array.map(item => item.carguilloTipoId));
          return uniqueTypes.size >= 2;
        }
        return true
      };
    if (!isPlaca && !verificarCantidadTipoTransporte(values.placasList)) 
      nuevosErrores.isRequiredPlaca = "Agregue al menos una placa para cada Tipo de transporte"

    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}