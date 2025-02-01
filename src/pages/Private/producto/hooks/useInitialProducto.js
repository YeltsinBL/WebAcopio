import { useEffect, useState } from "react"

export const useInitialProducto = (data) => {
  const [productoId, setProductoId] = useState(0)
  const [productoNombre, setProductoNombre] = useState("")
  const [estadoModel, setEstadoModel] = useState(true)

  useEffect(() => {
    if (data) {
      setProductoId(data.productoId || 0)
      setProductoNombre(data.productoNombre || "")
      setEstadoModel(data.productoStatus || true)
    }
  }, [data])
  return {
    productoId, productoNombre,estadoModel,
    setProductoId, setProductoNombre, setEstadoModel
  }
}