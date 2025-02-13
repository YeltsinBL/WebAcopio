import { useEffect, useState } from "react"
import { AdapterListadoServicio } from "~/adapters/ServicioAdapter"
import { informeListServicio } from "~services/informe"

export const useServicio = (transporte=true) => {
  const [servicioList, setServicioList] = useState([])

  useEffect(() => {
    getServicio()
  }, [])

  const getServicio = async () => {
    const servicios = await informeListServicio(transporte?'Transportes':'Paleros')
    setServicioList(AdapterListadoServicio(servicios))
  }

  return { servicioList }
}