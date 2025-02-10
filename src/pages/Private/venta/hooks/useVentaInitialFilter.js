import { useEffect, useState } from "react"
import { searchTipoComprobante } from "~services/tipos"
import { searchVentaEstado, searchVentaTipo } from "~services/venta"
import { formatterDataCombo } from "~utils/index"

export const useVentaInitialFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [numeroFilter, setNumeroFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [ventaTipoList, setventaTipoList] = useState([])
  const [ventaEstadoList, setVentaEstadoList] = useState([])
  
  //const [comprobantesList, setComprobantesList] = useState([])
  useEffect(() => {
    // getComprobantes()
    getVentaEstado()
    getVentaTipo()
  }, [])
  // const getComprobantes = async() => {
  //   const estados = await searchTipoComprobante()
  //   const formatter= estados?.map(tipo =>(
  //     formatterDataCombo(tipo.tipoComprobanteId, tipo.tipoComprobanteNombre)
  //   ))
  //   setComprobantesList(formatter)
  // }
  const getVentaEstado = async() => setVentaEstadoList(await searchVentaEstado())
  const getVentaTipo = async() => setventaTipoList(await searchVentaTipo())
  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    tipoFilter, setTipoFilter,
    numeroFilter, setNumeroFilter,
    estadoFilter, setEstadoFilter,
    ventaTipoList, ventaEstadoList
  }
}