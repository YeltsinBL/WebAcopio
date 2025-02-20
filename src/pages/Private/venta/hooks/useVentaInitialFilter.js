import { useEffect, useState } from "react"
import { searchVentaEstado, searchVentaTipo } from "~services/venta"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

export const useVentaInitialFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [tipoFilter, setTipoFilter] = useState('')
  const [numeroFilter, setNumeroFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [ventaTipoList, setventaTipoList] = useState([])
  const [ventaEstadoList, setVentaEstadoList] = useState([])

  useEffect(() => {
    getVentaEstado()
    getVentaTipo()
  }, [])

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