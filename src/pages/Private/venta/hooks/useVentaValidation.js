import { useState } from "react"
import { toast } from "sonner"
import { PopupValidationWarning } from "~components/common/MessagePopupValidation"

export const useVentaValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = (save = false, product = false, payment = false, values) => {
    const nuevosErrores = {}  
    if(save){
      if (!values.fechaModel) {
        nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.fechaModel})
      }
      if (!values.comprobanteModel) {
        nuevosErrores.comprobante = "El campo TIPO COMPROBANTE es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.comprobante})
      }
      if (!values.personaModel) {
        nuevosErrores.persona = "El campo PERSONA es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.persona})
      }
      if (!values.ventaTipoModel) {
        nuevosErrores.ventaTipo= "El campo TIPO es obligatorio"
        PopupValidationWarning({texto: nuevosErrores.ventaTipo})
      }
      if (values.ventaTipoModel == 3 && !values.ventaDiaModel) {
        nuevosErrores.numero = "El campo DIAS es obligatorio"
        PopupValidationWarning({texto: nuevosErrores.numero})
      }
      // if (!values.ventaEstadoModel) {
      //   nuevosErrores.ventaEstado= "El campo ESTADO es obligatorio"
      //   PopupValidationWarning({texto: nuevosErrores.ventaEstado})
      // }      
      if (values.detalleVenta.length ==0) {
        nuevosErrores.detalle = "Seleccione al menos un producto"
        PopupValidationWarning({texto: nuevosErrores.detalle})
      }
      if (!values.totalModel) {
        nuevosErrores.total = "El campo TOTAL es obligatorio."
        PopupValidationWarning({texto: nuevosErrores.total})
      }
      if(
          values.detalleVenta.length > 0 && 
          values.detalleVenta.filter((data) => data.cantidad ==0 || data.precio ==0).length > 0
        ){
          PopupValidationWarning({texto: 'No se puede guardar una venta con CANTIDAD o PRECIO en cero'})
      }
    }
    if (product){
      if (!values.cantidadModal) nuevosErrores.cantidad = "El campo CANTIDAD es obligatorio."
      if (!values.precioModal) nuevosErrores.precio = "El campo PRECIO es obligatorio."
      if (values.stockModal < (values.cantidadModal || 0)) nuevosErrores.cantidad = "El campo CANTIDAD es mayor que el STOCK disponible."
    }
    if(payment){
      if (!values.fechaPagadoModel) nuevosErrores.fechaPagadoModel = "El campo FECHA es obligatorio."
      if (!values.pagadoModel) nuevosErrores.pagado = "El campo PAGADO es obligatorio."
      if (!values.cteModel && !values.efectivo) nuevosErrores.ctacte = "El campo CTA. CTE. es obligatorio."
      if (values.pendientePagarModel ==0) {
        nuevosErrores.lista = 'Ya ha pagado el total de la deuda'
        toast.warning(nuevosErrores.lista, {style: { 
        background: 'black',
        color:' yellow' }} )
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