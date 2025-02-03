import { useEffect, useState } from "react"

export const useInitialProducto = (data) => {
  const [productoId, setProductoId] = useState(0)
  const [productoNombre, setProductoNombre] = useState("")
  const [productoPrecio, setProductoPrecio] = useState(0)

  useEffect(() => {
    if (data) {
      setProductoId(data.productoId || 0)
      setProductoNombre(data.productoNombre || "")
      setProductoPrecio(data.productoPrecio || 0)
    }
  }, [data])
  return {
    productoId, productoNombre,productoPrecio,
    setProductoId, setProductoNombre,setProductoPrecio
  }
}