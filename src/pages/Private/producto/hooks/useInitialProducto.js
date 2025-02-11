import { useEffect, useState } from "react"
import { searchProductoTipos } from "~services/producto"

export const useInitialProducto = (data) => {
  const [productoId, setProductoId] = useState(0)
  const [productoNombre, setProductoNombre] = useState("")
  const [productoPrecio, setProductoPrecio] = useState(0)
  const [productoTipoId, setProductoTipoId] = useState(0)
  const [productoTipoList, setProductoTipoList] = useState([])
  const [seleccionProductoTipo, setseleccionProductoTipo] = useState(null)

  useEffect(()=>{
    getProductoTipo()
  }, [])
  useEffect(() => {
    if (data) {
      setProductoId(data.productoId || 0)
      setProductoNombre(data.productoNombre || "")
      setProductoPrecio(data.productoPrecio || 0)
      setProductoTipoId(data.productoTipoId || 0)
      setseleccionProductoTipo({id: data.productoTipoId, nombre: data.productoTipoDetalle })
    }
  }, [data])
  
  const getProductoTipo = async() => setProductoTipoList(await searchProductoTipos())

  return {
    productoId, productoNombre,productoPrecio,
    setProductoId, setProductoNombre,setProductoPrecio,
    productoTipoList, productoTipoId, setProductoTipoId,
    seleccionProductoTipo, setseleccionProductoTipo
  }
}