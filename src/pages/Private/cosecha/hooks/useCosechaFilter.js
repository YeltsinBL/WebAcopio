import { useEffect, useState } from "react"
import { searchCosechaTipo } from "~services/cosecha"
import { 
  formatterDataCombo, obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"

export const useCosechaFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [utFilter, setUTFilter] = useState('')
  const [ucFilter, setUCFilter] = useState('')
  const [cosechaTipoFilter, setCosechaTipoFilter] = useState('')
  const [cosechaTipo, setCosechaTipo] = useState([])

  useEffect(() => {
      fetchOptionCosechaTipo()
  }, [])
  const fetchOptionCosechaTipo = async() => {
    const responseTipo = await searchCosechaTipo()
    const formatter= responseTipo?.map(tipo =>(
      formatterDataCombo(tipo.cosechaTipoId, tipo.descripcion)))
    setCosechaTipo(formatter)
  }
  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    utFilter, setUTFilter,
    ucFilter, setUCFilter,
    cosechaTipoFilter, setCosechaTipoFilter,
    cosechaTipo, 
  }
}