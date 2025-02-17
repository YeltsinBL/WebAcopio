import { useState } from "react";

export const useValidationProducto = () => {
  const [errores, setErrores] = useState({})  
    const validate = (values) => {
      const nuevosErrores = {}  
      if (!values.productoNombre) nuevosErrores.nombre = "El campo NOMBRE es obligatorio."
      if (!values.productoTipoId) nuevosErrores.productoTipo = "El campo TIPO es obligatorio."
      if (!values.productStockInicial) nuevosErrores.stock = "El campo STOCK INICIAL es obligatorio."
      if (!values.productoPrecio) nuevosErrores.precio = "El campo PRECIO VENTA es obligatorio."
  
      setErrores(nuevosErrores)  
      return {
        isValid: Object.keys(nuevosErrores).length === 0,
        errores: nuevosErrores,
      }
    }  
    return { validate, errores }
}