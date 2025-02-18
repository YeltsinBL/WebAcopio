import { useEffect, useState } from "react"
import { FacturaVentaEstados } from "~services/facturaventa"

export const useFacturaVentaEstado = () => {
  const [estadoList, setEstadoList] = useState([])

  useEffect(() => {
    getEstado()
  }, [])

  const getEstado = async () => {
    const estados = await FacturaVentaEstados()
    setEstadoList(estados)
  }
  return { estadoList }
}