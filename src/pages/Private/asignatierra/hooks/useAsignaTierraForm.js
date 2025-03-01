import { useEffect, useState } from "react"
import { searchProveedorAvailable } from "~services/proveedor"
import { searchTierrasAvailable } from "~services/tierra"
import { formatterDataCombo, obtenerSoloFechaLocal } from "~utils/index"

export const useAsignaTierraForm = (data) => {
  const [id, setId] = useState('')
  const [ut, setUt] = useState('')
  const [uc, setUC] = useState(null)
  const [fecha, setFecha] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [tierras, setTierras] = useState([])
  const [provedores, setProveedores] = useState([])
 
  const seleccionProveedor = data?.asignarTierraProveedorId ? {id: data.asignarTierraProveedorId, ut: data.asignarTierraProveedorUT } : null
  const seleccionTierra = data?.asignarTierraTierraId ? {id: data.asignarTierraTierraId, uc: data.asignarTierraTierraUC } : null
  
  useEffect(()=>{
    fetchOptionsTierras()
    fetchOptionsProveedor()
  }, [])

  useEffect(() => {
    if (data) {
      setId(data.asignarTierraId);
      setUt(data.asignarTierraProveedorId)
      setUC(data.asignarTierraTierraId)
      setFecha(data.asignarTierraFecha);
    }
  }, [data]);
  const fetchOptionsTierras = async () => {
    const responseTierra = await searchTierrasAvailable()
    // Combina la opción seleccionada actual con los datos de la API (si no existe en la lista)
    const updatedOptions = seleccionTierra ?
      [seleccionTierra, ...responseTierra.filter((option) => option.id !== seleccionTierra.id)]
      : responseTierra
    const formatter = updatedOptions?.map(tipo =>(formatterDataCombo(tipo.id,tipo.uc)))
    setTierras(formatter)
  }
  const fetchOptionsProveedor = async () => {
    const responseProveedor = await searchProveedorAvailable()
    const updatedProveedor =  seleccionProveedor ?
      [seleccionProveedor, ...responseProveedor.filter((option) => option.id !== seleccionProveedor.id)]
      : responseProveedor
    const formatter = updatedProveedor?.map(tipo =>(formatterDataCombo(tipo.id,tipo.ut)))
    setProveedores(formatter)
  }

  return {
    id, ut, setUt,
    uc, setUC,
    fecha, setFecha,
    tierras, provedores, seleccionProveedor, seleccionTierra
  }
}