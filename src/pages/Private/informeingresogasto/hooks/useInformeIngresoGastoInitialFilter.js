import { useState } from "react"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

export const useInformeIngresoGastoInitialFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [sembradorIdFilter, setsembradorIdFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    sembradorIdFilter, setsembradorIdFilter,
    estadoFilter, setEstadoFilter
  }
}