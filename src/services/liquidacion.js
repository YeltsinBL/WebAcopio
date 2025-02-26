import { ApiResponseAdapter } from "~/adapters/ApiResponseAdapter"
import { appSetting } from "~settings/appsetting"
import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath, 
  ResponseErrorServidor
} from "~utils/index"

export const liquidacionEstadosList = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Liquidacion/Estados`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('liquidacionEstadosList:', error.message)
    throw new Error('Error al buscar los Estados de Liquidación')
  }
}

export const liquidacionSearch = async(search) => {
  let url=`${appSetting.apiUrl}Liquidacion`
  if(search != null) {
    const {fechaDesdeFilter, fechaHastaFilter, utFilter, estadoFilter} = search
    url = `${url}?fechaDesde=${fechaDesdeFilter}&fechaHasta=${fechaHastaFilter}&proveedorId=${utFilter}&estadoId=${estadoFilter}`
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return await response.json()
  } catch (error) {
    console.log('liquidacionSearch:', error.message)
    throw new Error('Error al buscar las Liquidaciones')
  }
}

export const liquidacionGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Liquidacion/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    const data = await response.json()
    return formatterLiquidacionById(data)
  } catch (error) {
    console.log('liquidacionGetById:', error.message)
    throw new Error('Error al obtener la Liquidación')
  }
}
export const searchProveedorALiquidar = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Liquidacion/ALiquidar`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json()
  } catch (error) {
    console.log('searchProveedorALiquidar:', error.message)
    throw new Error('Error al buscar proveedores a liquidar')
  }
}
export const liquidacionSave = async({method, liquidacion}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Liquidacion`, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(liquidacion)
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('liquidacionSave:', error.message)
    return ResponseErrorServidor
  }
}

export const liquidacionGetCortes = async() => {
    let url=`${appSetting.apiUrl}Liquidacion/CortesAvailable`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
      return await response.json()
    } catch (error) {
      console.log('liquidacionGetCortes:', error.message)
      throw new Error('Error al buscar las cortes disponibles a liquidar')
    }
  }
const formatterLiquidacionById = (liquidacion) => {
  const tickets= liquidacion.liquidacionTickets?.map(ticket => (formatterTicket(ticket)))
  const financiamientos= liquidacion.liquidacionFinanciamiento?.map(financiamiento => (formatterFinanciamiento(financiamiento)))
  const adicionales= liquidacion.liquidacionAdicionals?.map((adicional) => formatterAdicional(adicional))
  return {...liquidacion,
    liquidacionFechaFin: convertirFechaToYMD(liquidacion.liquidacionFechaFin),
    liquidacionFechaInicio: convertirFechaToYMD(liquidacion.liquidacionFechaInicio),
    liquidacionPesoBruto: FormatteDecimalMath(liquidacion.liquidacionPesoBruto,3),
    liquidacionPesoNeto: FormatteDecimalMath(liquidacion.liquidacionPesoNeto,3),
    liquidacionToneladaPrecioCompra: FormatteDecimalMath(liquidacion.liquidacionToneladaPrecioCompra,2),
    liquidacionToneladaTotal: FormatteDecimalMath(liquidacion.liquidacionToneladaTotal,2),
    liquidacionFinanciamientoACuenta: FormatteDecimalMath(liquidacion.liquidacionFinanciamientoACuenta,2),
    liquidacionPagar: FormatteDecimalMath(liquidacion.liquidacionPagar,2),
    liquidacionTickets : tickets,
    liquidacionFinanciamiento: financiamientos,
    liquidacionAdicionals: adicionales
  }
}
const formatterTicket = (ticket) => {
  return {...ticket, 
    ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(ticket.ticketFecha)),
    ticketCamionPeso : FormatteDecimalMath(ticket.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimalMath(ticket.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimalMath(ticket.ticketPesoBruto, 3)
  }
}
const formatterFinanciamiento = (financiamiento) => {
  return {...financiamiento,
    liquidacionFinanciamientoFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(financiamiento.liquidacionFinanciamientoFecha)),
    liquidacionFinanciamientoACuenta: FormatteDecimalMath(financiamiento.liquidacionFinanciamientoACuenta, 2),
    liquidacionFinanciamientoInteres: FormatteDecimalMath(financiamiento.liquidacionFinanciamientoInteres, 2),
    liquidacionFinanciamientoInteresMes: FormatteDecimalMath(financiamiento.liquidacionFinanciamientoInteresMes, 2),
    liquidacionFinanciamientoTotal: FormatteDecimalMath(financiamiento.liquidacionFinanciamientoTotal,2)
  }
}
const formatterAdicional =(adicional)=>{
  return {...adicional,
    liquidacionAdicionalTotal:FormatteDecimalMath(adicional.liquidacionAdicionalTotal,2)
  }
}
