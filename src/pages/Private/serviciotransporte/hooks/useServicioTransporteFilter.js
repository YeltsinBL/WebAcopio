import { useEffect, useState } from "react"
import { searchCarguilloList } from "~services/carguillo"
import { servicioTransporteEstadosList } from "~services/servicio"
import { formatterDataCombo, obtenerFechaInicialMes, obtenerSoloFechaLocal } from "~utils/index"

export const useServicioTransporteFilter = () => {
  const [estadoList, setEstadoList] = useState([])
  const [carguilloList, setCarguilloList] = useState([])
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [carguilloFilter, setCarguilloFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  useEffect(()=>{
    getEstados()
    getCarguillo()
  }, [])

  const getEstados = async()=>{
    const estados = await servicioTransporteEstadosList()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.estadoId, tipo.estadoDescripcion)))
    setEstadoList(formatter)
  }
  const getCarguillo = async() =>{
    const tipos = await searchCarguilloList({
        tipoCarguilloId: 2, titular:'', estado:1
    })
    const formatter = tipos?.map(tipo =>(
        formatterDataCombo(tipo.carguilloId,tipo.carguilloTitular)))
    setCarguilloList(formatter)
  }

  return {
    estadoList, carguilloList,
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    carguilloFilter, setCarguilloFilter,
    estadoFilter, setEstadoFilter,
  }

}