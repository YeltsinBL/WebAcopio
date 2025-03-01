import { useState } from "react"
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

export const useAsignaTierraFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [ucFilter, setUCFilter] = useState('')
  const [utFilter, setUTFilter] = useState('')

  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    ucFilter, setUCFilter,
    utFilter, setUTFilter,
  }
}