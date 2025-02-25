import { useEffect, useState } from "react"
import { searchTicketsEstado } from "~services/ticket"
import { 
  formatterDataCombo, obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"

export const useTicketFilter = () => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [ingenioFilter, setIngenioFilter] = useState('')
  const [transportistaFilter, setTransportistaFilter] = useState('')
  const [viajeFilter, setviajeFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  
  const [ticketEstado, setTicketEstado] = useState([])

  useEffect(() => {
    getTicketEstados()
  }, [])
  const getTicketEstados = async() => {
    const estados = await searchTicketsEstado()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.ticketEstadoId, tipo.ticketEstadoDescripcion)))
    setTicketEstado(formatter)
  }
  return {
    ingenioFilter, setIngenioFilter,
    transportistaFilter, setTransportistaFilter,
    viajeFilter, setviajeFilter,
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    estadoFilter, setEstadoFilter,
    ticketEstado,
  }
}