import { useEffect, useState } from "react"
import { searchAsignaTierra } from "~services/asignartierra"
import { liquidacionEstadosList } from "~services/liquidacion"
import { 
  formatterDataCombo, obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"

export const useLiquidacionFilter = () => {
  const [utList, setUtList] = useState([])
  const [liquidacionEstadoList, setLiquidacionEstadoList] = useState([])
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [utFilter, setUtFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  useEffect(()=>{
    getUts()
    getTicketEstados()
  }, [])

  const getUts = async() => {
    const uts = await searchAsignaTierra()
    const formatter= uts?.map(ut =>(
      formatterDataCombo(ut.asignarTierraProveedorId, ut.asignarTierraProveedorUT)))
    setUtList(formatter)
    
  }
  const getTicketEstados = async() => {
    const estados = await liquidacionEstadosList()
    const formatter= estados?.map(estado =>(
      formatterDataCombo(estado.estadoId, estado.estadoDescripcion)))
    setLiquidacionEstadoList(formatter)
  }
  return {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    utFilter, setUtFilter, estadoFilter, setEstadoFilter,
    utList, liquidacionEstadoList,
  }
}