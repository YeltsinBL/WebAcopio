import { useEffect, useState } from "react"
import { useFetchData } from "~hooks/common"
import { 
  formatterDataCombo, obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"

export const useRecojoFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [recojoEstadoList, setRecojoEstadoList] = useState([])
  const [estadoFilter, setEstadoFilter] = useState('')

  const { data } = useFetchData()

  useEffect(()=>{
    if(data) getTicketEstados()
  }, [data])

  const getTicketEstados = async() => {
    const formatter= data?.map(tipo =>(
      formatterDataCombo(tipo.recojoEstadoId, tipo.recojoEstadoDescripcion)))
    setRecojoEstadoList(formatter)
  }
  return {
    recojoEstadoList, fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    estadoFilter, setEstadoFilter,
  }
}