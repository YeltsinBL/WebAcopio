import { useState } from "react"
import { PopupValidationWarning } from "~components/common/MessagePopupValidation"

export const useFacturaVentaValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = ({values}) => {
    const nuevosErrores = {}
    if (!values.facturaVentaFecha) {
      nuevosErrores.fecha = "La información de FECHA DE EMISIÓN es obligatorio."
      PopupValidationWarning({texto: nuevosErrores.fecha})
    }
    if (!values.facturaVentaEstado) {
      nuevosErrores.estado = "La información de ESTADO es obligatorio."
      PopupValidationWarning({texto: nuevosErrores.estado})
    }
    if (!values.facturaNumero) {
      nuevosErrores.numero = "La información de N° FACTURA es obligatorio."
      PopupValidationWarning({texto: nuevosErrores.numero})
    }
    if (!values.cantidadModel) {
      nuevosErrores.cantidad = "La información de CANTIDAD es obligatorio."
      PopupValidationWarning({texto: nuevosErrores.cantidad})
    }
    if (!values.importeTotalModel) {
      nuevosErrores.importe = "La información de IMPORTE es obligatorio."
      PopupValidationWarning({texto: nuevosErrores.importe})
    }
    if (values.sembradorSeleccionadosList.length ==0) {
      nuevosErrores.detalle = "Seleccione al menos un producto"
      PopupValidationWarning({texto: nuevosErrores.detalle})
    }
      
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }
  return { validate, errores }
}