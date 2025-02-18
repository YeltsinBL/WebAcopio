import { useState } from "react"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

export const useFacturaVentaInitialFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [numberFilter, setNumberFilter] = useState("")
  const [estadoFilter, setEstadoFilter] = useState('')

  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    numberFilter, setNumberFilter,
    estadoFilter, setEstadoFilter
  }
}