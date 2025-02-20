import { useState } from "react"
import { PopupValidationWarning } from "~components/common/MessagePopupValidation"

export const useCompraValidation = () => {
  const [errores, setErrores] = useState({})  

  const validate = ({save = false, product = false, productRecojo= false, values}) => {
    const nuevosErrores = {}
    if(save){
      if (!values.fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
      if (!values.comprobanteModel) {
        nuevosErrores.comprobante = "El campo TIPO COMPROBANTE es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.comprobante})
      }
      if (!values.numeroModel) {
        nuevosErrores.numero = "El campo N° COMPROBANTE es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.numero})
      }
      if (!values.distribuidorModel) {
        nuevosErrores.distribuidor = "El campo DISTRIBUIDOR es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.distribuidor})
      }
      if (values.detalleCompra.length ==0) {
        nuevosErrores.detalle = "Seleccione al menos un producto"
        PopupValidationWarning({texto: nuevosErrores.detalle})
      }
      if (!values.totalModel) {
        nuevosErrores.total = "El campo TOTAL es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.total})
      }
      if (
        values.detalleCompra.length > 0 && 
        values.detalleCompra.filter((data) => data.cantidad ==0 || data.precio ==0).length > 0
      ) PopupValidationWarning({texto:'No se puede guardar una compra con CANTIDAD o PRECIO en cero'})
      
    }
    if (product){
      if (!values.cantidadModal) {
        nuevosErrores.cantidad = "El campo CANTIDAD es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.cantidad})
      }
      if (!values.precioModal) {
        nuevosErrores.precio = "El campo PRECIO es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.precio})
      }
    }
    if (productRecojo){
      if (!values.recojoFechaModel) {
        nuevosErrores.recojoFecha = "El campo FECHA es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.recojoFecha})
      }
      if (!values.recogidosRecojoModal) {
        nuevosErrores.recogidos = "El campo RECOGIDOS es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.recogidos})
      }
    }
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }
  return { validate, errores }
}