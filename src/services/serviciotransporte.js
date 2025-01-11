import { appSetting } from "../settings/appsetting"
import { convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath } from "../utils"

export const servicioTransporteEstadosList = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}ServicioTransporte/Estados`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('servicioTransporteEstadosList:', error.message)
    throw new Error('Error al buscar los Estados del Servicio Transporte')
  }
}

export const servicioTransporteSearch = async(search) => {
  let url=`${appSetting.apiUrl}ServicioTransporte`
  if(search != null) {
    const {fechaDesdeFilter, fechaHastaFilter, carguilloFilter, estadoFilter} = search
    url = `${url}?fechaDesde=${fechaDesdeFilter}&fechaHasta=${fechaHastaFilter}&carguilloId=${carguilloFilter}&estadoId=${estadoFilter}`
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return formatterServicioList(await response.json())
  } catch (error) {
    console.log('servicioTransporteSearch:', error.message)
    throw new Error('Error al buscar el Servicio Transporte')
  }
}

export const servicioTransporteGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}ServicioTransporte/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    const data = await response.json()
    return formatterCorteById(data)
  } catch (error) {
    console.log('servicioTransporteGetById:', error.message)
    throw new Error('Error al obtener el Servicio Transporte')
  }
}
export const servicioTransporteSave = async({method, servicioTransporte}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}ServicioTransporte`, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(servicioTransporte)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('servicioTransporteSave:', error.message)
    throw new Error('Error al guardar el Servicio Transporte')
  }
}
const formatterServicioList = (servicios) =>{
  return servicios.map(servicio =>{
    return {...servicio, 
      servicioTransporteFecha: convertirFechaDDMMYYYY(servicio.servicioTransporteFecha),
      servicioTransportePrecio: FormatteDecimalMath(servicio.servicioTransportePrecio,2),
      servicioTransporteTotal : FormatteDecimalMath(servicio.servicioTransporteTotal,2),
      carguilloPaleroPrecio : FormatteDecimalMath(servicio.carguilloPaleroPrecio,2),
    }
  })
}
const formatterCorteById = (corte) => {
  const formatter= corte.servicioTransporteDetails?.map(ticket => (formatterticket(ticket)))
  return {...corte,
    servicioTransporteFecha : corte.servicioTransporteFecha.split("T")[0],
    servicioTransportePrecio: FormatteDecimalMath(corte.servicioTransportePrecio,2),
    servicioTransporteTotal : FormatteDecimalMath(corte.servicioTransporteTotal,2),
    servicioTransporteDetails : formatter
  }
}
const formatterticket = (data) => {
  return {...data,
    ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(data.ticketFecha)),
    ticketCamionPeso : FormatteDecimalMath(data.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimalMath(data.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimalMath(data.ticketPesoBruto, 3)
  }
}

