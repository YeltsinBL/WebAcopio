import { useEffect, useState } from "react"
import { searchTipoComprobante } from "~services/tipos"
import { searchVentaEstado } from "~services/venta"
import { formatterDataCombo } from "~utils/index"

export const useVentaInitialFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [comprobanteFilter, setComprobanteFilter] = useState('')
  const [numeroFilter, setNumeroFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [ventaEstadoList, setVentaEstadoList] = useState([])
  
  const [comprobantesList, setComprobantesList] = useState([])
  useEffect(() => {
    getComprobantes()
    getVentaEstado()
  }, [])
  const getComprobantes = async() => {
    const estados = await searchTipoComprobante()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.tipoComprobanteId, tipo.tipoComprobanteNombre)
    ))
    setComprobantesList(formatter)
  }
  const getVentaEstado = async() => setVentaEstadoList(await searchVentaEstado())
  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    comprobanteFilter, setComprobanteFilter,
    numeroFilter, setNumeroFilter,
    estadoFilter, setEstadoFilter,
    comprobantesList, ventaEstadoList
  }
}