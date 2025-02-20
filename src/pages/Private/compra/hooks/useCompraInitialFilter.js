import { useState } from "react"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

export const useCompraInitialFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [comprobanteFilter, setComprobanteFilter] = useState('')
  const [numeroFilter, setNumeroFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    comprobanteFilter, setComprobanteFilter,
    numeroFilter, setNumeroFilter,
    estadoFilter, setEstadoFilter,
  }
}