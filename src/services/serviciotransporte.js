import { appSetting } from "../settings/appsetting"
import { FormatteDecimal } from "../utils"

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
    return await response.json()
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

const formatterCorteById = (corte) => {
  const formatter= corte.servicioTransporteDetails?.map(ticket => (formatterticket(ticket)))
  return {...corte,
    servicioTransporteFecha : new Date(corte.servicioTransporteFecha),
    servicioTransportePrecio: FormatteDecimal(corte.servicioTransportePrecio,2),
    servicioTransporteTotal : FormatteDecimal(corte.servicioTransporteTotal,3),
    servicioTransporteDetails : formatter
  }
}
const formatterticket = (data) => {
    return {
      id : data.ticketId,
      ingenio : data.ticketIngenio,
      fecha : new Date(data.ticketFecha ),
      viaje : data.ticketViaje,
      transportista :  data.ticketTransportista ,
      chofer : data.ticketChofer,
      camion : data.ticketCamion,
      camionPeso : FormatteDecimal(data.ticketCamionPeso, 3),
      vehiculo : data.ticketVehiculo,
      vehiculoPeso : FormatteDecimal(data.ticketVehiculoPeso, 3),
      unidadPeso : data.ticketUnidadPeso,
      pesoBruto : FormatteDecimal(data.ticketPesoBruto, 3),
      estado : data.ticketEstadoDescripcion
    }
  }

  /***
   * 
   * 
   * "servicioTransporteId": 4,
  "servicioTransporteFecha": "2024-12-19T00:00:00",
  "carguilloId": 6,
  "carguilloTitular": "Update Transportista",
  "servicioTransportePrecio": 10,
  "servicioTransporteTotal": 40,
  "servicioTransporteEstadoDescripcion": "Activo",
  "servicioTransporteDetails": [
   */
