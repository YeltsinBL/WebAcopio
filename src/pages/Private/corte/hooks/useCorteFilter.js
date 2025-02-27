import { useEffect, useState } from "react"
import { searchAsignaTierra } from "~services/asignartierra"
import { searchCorteEstados } from "~services/corte"
import { 
  formatterDataCombo, obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"

export const useCorteFilter = () => {
  const [ucFilter, setUcFilter] = useState('')
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [estadoFilter, setEstadoFilter] = useState('')
  const [ucLista, setUcLista] = useState([])
  const [estadoLista, setEstadoLista] = useState([])

  useEffect(()=> {
    getListCombos()
  },[])
  const getListCombos = async() => {
    const ucs = await searchAsignaTierra()
    const formatter= ucs?.map(tipo =>
      (formatterDataCombo(tipo.asignarTierraTierraId,tipo.asignarTierraTierraUC)))
    setUcLista(formatter)

    const estados = await searchCorteEstados()
    const formatterEstados= estados?.map(tipo =>
      (formatterDataCombo(tipo.corteTipoId,tipo.corteDescripcion)))
    setEstadoLista(formatterEstados)
  }
  return {
    ucFilter, setUcFilter,
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    estadoFilter, setEstadoFilter,
    ucLista, estadoLista, 
  }
}