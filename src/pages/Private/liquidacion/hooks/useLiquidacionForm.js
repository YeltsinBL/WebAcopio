import { useEffect, useState } from "react"
import { searchProveedorALiquidar } from "~services/liquidacion"
import { 
  FormatteDecimalMath, formatterDataCombo, obtenerSoloFechaLocal 
} from "~utils/index"

export const useLiquidacionForm = (data) => {
  const [proveedoresALiquidarList, setProveedorALiquidarList] = useState([])
  const [proveedoresComboList, setProveedorComboList] = useState([])
  const [ticketsSeleccionadosList, setTicketsSeleccionadosList] = useState([])
  const [financiamientoList, setFinanciamientoList] = useState([])
  const [adicionalesList, setAdicionalesList] = useState([])

  const [liquidacionIdModel, setLiquidacionIdModel] = useState(0)
  const [personaIdModel, setPersonaIdModel] = useState("")
  const [proveedorIdModel, setProveedorIdModel] = useState("")
  const [tierraIdModel, setTierraIdModel] = useState("")
  const [fechaInicioModel, setFechaInicioModel] = useState("")
  const [fechaFinModel, setFechaFinModel] = useState("")
  const [campoModel, setCampoModel] = useState("")
  const [utModel, setUtModel] = useState("")
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState('')

  const [toneladasPesosNetosModel, setToneladasPesosNetosModel] = useState("")
  const [pCompraModel, setpComprasModel] = useState("")
  const [toneladasTotalModel, setToneladasTotalModel] = useState("")

  const [financiamientoFechaModel, setFinanciamientoFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [financiamientoFechaFinModel, setFinanciamientoFechaFinModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [financiamientoACuentaModel, setFinanciamientoACuentaModel] = useState(0)
  const [financiamientoTiempoModel, setFinanciamientoTiempoModel] = useState(0)
  const [financiamientoInteresMesModel, setFinanciamientoInteresMesModel] = useState(0)
  const [financiamientoInteresModel, setFinanciamientoInteresModel] = useState(0) 
  const [financiamientoTotalModel, setFinanciamientoTotalModel] = useState(0)
  const [financiamientoACuentaTotal, setFinanciamientoACuentaTotal] = useState(0)
  const [liquidacionPorPagar, setLiquidacionPorPagar] = useState('')
  const [liquidacionEstado, setLiquidacionEstado] = useState('Activo')

  const [adicionalesMotivoModel, setAdicionalesMotivoModel] = useState('')
  const [adicionalesTotalModel, setAdicionalesTotalModel] = useState('')
  const [adicionalesTotal, setAdicionalesTotal] = useState(0)
  const [showPopup, setShowPopup] = useState(false)

  const seleccionPersona = data?.personaId ? {id: data.personaId, nombre: data.personaNombre } : null
  const headers = ['Ingenio', 'Viaje', 'Fecha', 'Vehículo', 'Camión', 'Transportista', 
    'Vehículo Peso', 'Camión Peso', 'Peso Bruto','Palero','Campo', 'Estado','Acción']
  const headersFinanciamiento= ['Fecha', 'A Cuenta','Tiempo/Días','Interes Mes %','Interes S/', 'Total','Acciones']
  const headersAdicionales= ['Motivo', 'Monto','Acciones']
  
  useEffect(()=>{
    proveedorListAliquidar()
  }, [])
  useEffect(()=>{
    if(data){
      setLiquidacionIdModel(data.liquidacionId)
      setPersonaIdModel(data.personaId)
      setCampoModel(data.tierraCampo)
      setUtModel(data.proveedorUT)
      setFechaInicioModel(data.liquidacionFechaInicio)
      setFechaFinModel(data.liquidacionFechaFin)
      setSumaPesoBrutoModel(data.liquidacionPesoBruto)
      setToneladasPesosNetosModel(data.liquidacionPesoNeto)

      setpComprasModel(data.liquidacionToneladaPrecioCompra)
      setToneladasTotalModel(data.liquidacionToneladaTotal)

      setFinanciamientoACuentaTotal(data.liquidacionFinanciamientoACuenta)
      setLiquidacionPorPagar(data.liquidacionPagar)
      setFinanciamientoFechaModel(obtenerSoloFechaLocal({date: new Date()}))      
      setFinanciamientoFechaFinModel(obtenerSoloFechaLocal({date: new Date()}))
      setTicketsSeleccionadosList(data.liquidacionTickets)
      setFinanciamientoList(data.liquidacionFinanciamiento)
      setAdicionalesList(data.liquidacionAdicionals)
      setAdicionalesTotal(data.adicionalTotal)
      setLiquidacionEstado(data.liquidacionEstadoDescripcion)
    }
  }, [data])
  useEffect(() => {
    const total = ticketsSeleccionadosList.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketsSeleccionadosList])
  useEffect(()=>{
    if(!parseFloat(pCompraModel)) return setToneladasTotalModel('')
    const total = toneladasPesosNetosModel * pCompraModel
    setToneladasTotalModel(FormatteDecimalMath(total,2))
  }, [pCompraModel, toneladasPesosNetosModel])
  useEffect(()=>{
    let interes = null
    if(parseFloat(financiamientoACuentaModel) && parseFloat(financiamientoTiempoModel)
      && parseFloat(financiamientoInteresMesModel)){
      //interes = financiamientoACuentaModel * parseInt(financiamientoTiempoModel) * parseFloat(financiamientoInteresMesModel) / 100
      interes = financiamientoACuentaModel * parseInt(financiamientoTiempoModel) * (parseFloat(financiamientoInteresMesModel) / 30) / 100
      setFinanciamientoInteresModel(FormatteDecimalMath(interes,2))
    }else setFinanciamientoInteresModel(0)
    const total = parseFloat(financiamientoACuentaModel) + interes
    setFinanciamientoTotalModel(FormatteDecimalMath(total,2))
  },[financiamientoACuentaModel, financiamientoTiempoModel,
    financiamientoInteresMesModel])
  useEffect(() => {
    const total = financiamientoList.filter((item) => item.liquidacionFinanciamientoStatus === true).reduce(getSumFina, 0)
    if(total>0) return setFinanciamientoACuentaTotal(FormatteDecimalMath(total,2))
    return setFinanciamientoACuentaTotal('0')
  }, [financiamientoList])
  useEffect(() => {
    const total = adicionalesList.filter((item) => item.liquidacionAdicionalStatus === true).reduce(getSumAdi, 0)
    if(total>0) return setAdicionalesTotal(FormatteDecimalMath(total,2))
    return setAdicionalesTotal('0')
  }, [adicionalesList])
  useEffect(()=>{
    if(parseFloat(toneladasTotalModel)){
      const adicional = adicionalesTotal === '' ? 0 : parseFloat(adicionalesTotal)
      const total = parseFloat(toneladasTotalModel) - parseFloat(financiamientoACuentaTotal) - adicional
      setLiquidacionPorPagar(FormatteDecimalMath(total,2))
    }else setLiquidacionPorPagar('0')
  },[toneladasTotalModel, financiamientoACuentaTotal, adicionalesTotal])
  useEffect(()=>{
    if(financiamientoFechaModel && financiamientoFechaFinModel){
      const fechaInicio = new Date(financiamientoFechaModel)
      const fechaFin = new Date(financiamientoFechaFinModel)
      const diferenciaTiempo = (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      const financiamientoTiempoModel = Math.round(diferenciaTiempo)
      setFinanciamientoTiempoModel(financiamientoTiempoModel)
    }
  },[financiamientoFechaModel, financiamientoFechaFinModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.ticketPesoBruto)
  }
  const getSumFina=(total, num) =>{
    return total + parseFloat(num.liquidacionFinanciamientoTotal)
  }
  const getSumAdi=(total, num) =>{
    return total + parseFloat(num.liquidacionAdicionalTotal)
  }

  const proveedorListAliquidar = async()=>{
    const proveedores = await searchProveedorALiquidar()
    setProveedorALiquidarList(proveedores)
    const formatter= proveedores?.map(ut =>(
      formatterDataCombo(ut.personId, ut.proveedorNombre)))
    setProveedorComboList(formatter)

  }
  return {
    proveedoresALiquidarList, 
    proveedoresComboList, 
    ticketsSeleccionadosList, setTicketsSeleccionadosList,
    financiamientoList, setFinanciamientoList,
    adicionalesList, setAdicionalesList,
    liquidacionIdModel, 
    personaIdModel, setPersonaIdModel,
    proveedorIdModel, setProveedorIdModel,
    tierraIdModel, setTierraIdModel,
    fechaInicioModel, setFechaInicioModel,
    fechaFinModel, setFechaFinModel,
    campoModel, setCampoModel,
    utModel, setUtModel,
    sumaPesoBrutoModel, 
    toneladasPesosNetosModel, setToneladasPesosNetosModel,
    pCompraModel, setpComprasModel,
    toneladasTotalModel, financiamientoFechaModel, setFinanciamientoFechaModel,
    financiamientoFechaFinModel, setFinanciamientoFechaFinModel,
    financiamientoACuentaModel, setFinanciamientoACuentaModel,
    financiamientoTiempoModel, setFinanciamientoTiempoModel,
    financiamientoInteresMesModel, setFinanciamientoInteresMesModel,
    financiamientoInteresModel, setFinanciamientoInteresModel,
    financiamientoTotalModel, 
    financiamientoACuentaTotal, 
    liquidacionPorPagar, 
    liquidacionEstado, 
    adicionalesMotivoModel, setAdicionalesMotivoModel,
    adicionalesTotalModel, setAdicionalesTotalModel,
    adicionalesTotal, 
    showPopup, setShowPopup, seleccionPersona,
    headers, headersFinanciamiento, headersAdicionales,
  }
}