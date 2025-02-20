import { useEffect, useState } from "react"
import { searchTipoComprobante } from "~services/tipos"
import { formatterDataCombo } from "~utils/index"

export const useTipoComprobante = () => {
  const [comprobantesList, setComprobantesList] = useState([])

  useEffect(() => {
    getComprobantes()
  }, [])

  const getComprobantes = async() => {
    const estados = await searchTipoComprobante()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.tipoComprobanteId, tipo.tipoComprobanteNombre)
    ))
    setComprobantesList(formatter)
  }
  return {comprobantesList}
}