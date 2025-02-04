import { useState } from "react"
import { toast } from "sonner"

export const useVentaValidation = () => {
  const [errores, setErrores] = useState({})  
  const validate = (save = false, product = false, values) => {
    const nuevosErrores = {}  
    if(save){
      if (!values.fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
      if (!values.comprobanteModel) nuevosErrores.comprobante = "El campo TIPO COMPROBANTE es obligatorio."
      if (!values.personaModel) nuevosErrores.persona = "El campo PERSONA es obligatorio."
      if (!values.ventaTipoModel) nuevosErrores.ventaTipo= "El campo TIPO es obligatorio"
      if (values.ventaTipoModel == 3 && !values.ventaDiaModel) nuevosErrores.numero = "El campo DIAS es obligatorio"
      if (!values.ventaEstadoModel) nuevosErrores.ventaEstado= "El campo ESTADO es obligatorio"      
      if (values.detalleVenta.length ==0) nuevosErrores.detalle = "Seleccione al menos un producto"
      if (!values.totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
      if(
          values.detalleVenta.length > 0 && 
          values.detalleVenta.filter((data) => data.cantidad ==0 || data.precio ==0).length > 0
        ){
        toast.warning('No se puede guardar una venta con CANTIDAD o PRECIO en cero', 
          { style: { background: 'black', color:' yellow' }} 
        )
      }
    }
    if (product){
      if (!values.cantidadModal) nuevosErrores.cantidad = "El campo CANTIDAD es obligatorio."
      if (!values.precioModal) nuevosErrores.precio = "El campo PRECIO es obligatorio."
      if (values.stockModal < (values.cantidadModal || 0)) nuevosErrores.cantidad = "El campo CANTIDAD es mayor que el STOCK disponible."
    }
    setErrores(nuevosErrores)  
    return {
      isValid: Object.keys(nuevosErrores).length === 0,
      errores: nuevosErrores,
    }
  }  
  return { validate, errores }
}