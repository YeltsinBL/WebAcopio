import { useEffect, useState } from "react"
import { getCarguilloInTickets } from "~services/carguillo"
import { 
  FormatteDecimalMath, formatterDataCombo, obtenerSoloFechaLocal 
} from "~utils/index"

export const useServicioTransporteForm = (data) => {

  const [carguilloList, setCarguilloList] = useState([])
  const [servicioIdModel, setServicioIdModel] = useState(0)
  const [fechaModel, setFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [carguilloIdModel, setCarguilloIdModel] = useState(0)
  const [servicioPrecioModel, setServicioPrecioModel] = useState(0)
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState(0)
  const [totalModel, setTotalModel] = useState(0)
  const [ticketSelected, setTicketSelected] = useState([])
  const [servicioDescripcion, setServicioDescripcion] = useState('Activo')
  const [showPopup, setShowPopup] = useState(false)

  const [fechaPagadoModel, setFechaPagadoModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [pagando, setPagando ]= useState(true)
  const [pagadoModel, setPagadoModel] = useState(0)
  const [bancoModel, setBancoModel] = useState("")
  const [cteModel, setCteModel] = useState("")
  const [efectivo, setEfectivo] = useState(false)
  const [pendientePagarModel, setPendientePagar] = useState(0)
  const [detallePagado, setDetallePagado] = useState([])
  const [totalPagadoModel, setTotalPagadoModel] = useState(0)

  const seleccionCarguillo = data?.carguilloId ? {id: data.carguilloId, nombre: data.carguilloTitular } : null
  const headers = ['Ingenio', 'Viaje', 'Fecha', 'Vehículo', 'Camión', 'Transportista', 
    'Vehículo Peso', 'Camión Peso', 'Peso Bruto','Palero','Campo', 'Estado','Acción']
  const headersPagos= ['Fecha', 'Pagado','Efectivo','Banco','Cta.Cte.', 'Acción']

  useEffect(()=>{    
    getCarguillo()
  }, [])
  const getCarguillo = async() => {
    const tipos = await getCarguilloInTickets()
    const formatter = tipos?.map(tipo =>
      (formatterDataCombo(tipo.carguilloId, tipo.carguilloTitular))
    )
    setCarguilloList(formatter)
  }
  useEffect(()=>{
    if(data){
      setServicioIdModel(data.servicioId || 0)
      setFechaModel(
        data.servicioFecha || obtenerSoloFechaLocal({ date: new Date() }))
      setCarguilloIdModel(data.carguilloId || 0)
      setServicioPrecioModel(data.servicioPrecio || 0)
      setServicioDescripcion(data.servicioEstadoDescripcion || 'Activo')
      setTicketSelected(data.servicioDetails || [])
      setTotalModel(data.ventaTotal)

      setDetallePagado(data.detallePagos || [])
      setPagando(data.servicioId >0 && data.servicioPendientePagar > 0)
    }
  }, [data])

  useEffect(() => {
    const total = ticketSelected.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel(0)
  }, [ticketSelected])
  useEffect(()=>{
    if(servicioPrecioModel>= 0 && sumaPesoBrutoModel > 0) 
      return setTotalModel(FormatteDecimalMath(servicioPrecioModel * sumaPesoBrutoModel,2))
    return setTotalModel(0)
  },[servicioPrecioModel, sumaPesoBrutoModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.ticketPesoBruto)
  }

  useEffect(()=>{
    if(totalPagadoModel >= 0 && totalModel > 0) {      
      const result = FormatteDecimalMath(totalModel - totalPagadoModel, 2)
      setPagando(result>0)
      return setPendientePagar(result)
    }
    return setPendientePagar(0)
  }, [totalModel, totalPagadoModel])
  useEffect(()=>{
    const total = detallePagado
      .reduce((total, item) => total + parseFloat(item.detallePagoPagado), 0)
    setTotalPagadoModel(FormatteDecimalMath(total,2))
  }, [detallePagado])

  return {
    carguilloList, servicioIdModel, 
    fechaModel, setFechaModel, carguilloIdModel, setCarguilloIdModel,
    servicioPrecioModel, setServicioPrecioModel, sumaPesoBrutoModel, 
    totalModel, ticketSelected, setTicketSelected,
    servicioDescripcion, setServicioDescripcion, showPopup, setShowPopup,
    fechaPagadoModel, setFechaPagadoModel, pagando, 
    pagadoModel, setPagadoModel, bancoModel, setBancoModel,
    cteModel, setCteModel, totalPagadoModel,
    efectivo, setEfectivo, detallePagado, setDetallePagado,
    pendientePagarModel, seleccionCarguillo, headers, headersPagos,
  }
}