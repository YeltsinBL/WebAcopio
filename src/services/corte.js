import { FormatteDecimal } from "../components/common/FormatteData";
import { appSetting } from "../settings/appsetting";

export const searchCorteEstados = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Corte/Estados`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const corteEstados = await response.json()
    return corteEstados
  } catch (error) {
    console.log('searchCorteEstados:', error.message)
    throw new Error('Error al buscar los Estados de Corte')
  }
}
export const searchCortes = async(search) => {
  let url=`${appSetting.apiUrl}Corte`
  if(search != null) {
    const {tierraId, fechaDesde, fechaHasta, estadoId} = search
    url = `${url}?tierraId=${tierraId}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&estadoId=${estadoId}`
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    const cortes = await response.json()
    const formatter= cortes?.map(corte => (formattercorte(corte))) 
    return formatter
  } catch (error) {
    console.log('searchCortes:', error.message)
    throw new Error('Error al buscar Cortes')
  }
}
export const corteGetById = async({id})=>{
  try {
    const response = await fetch(`${appSetting.apiUrl}Corte/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    return formatterCorteById(data)
  } catch (error) {
    console.log('corteGetById:', error.message)
    throw new Error('Error al obtener un corte')
  }
}
export const corteSave = async(corte) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Corte`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(corte)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    const data = await response.json()
    return formattercorte(data)
  } catch (error) {
    console.log('corteSave:', error.message)
    throw new Error('Error al obtener un corte')
  }
}

const formattercorte = (corte) => {
  return {
    id : corte.corteId,
    fecha : new Date(corte.corteFecha),
    uc : corte.tierraUC,
    precio : FormatteDecimal(corte.cortePrecio,2),
    cantidadTicket : corte.corteCantidadTicket,
    pesoBruto : FormatteDecimal(corte.cortePesoBrutoTotal,3),
    total : FormatteDecimal(corte.corteTotal,2) ,
    estado : corte.corteEstadoDescripcion
  }
}

const formatterCorteById = (corte) => {
  const formatter= corte.corteDetail?.map(ticket => (formatterticket(ticket)))
  return {...corte,
    corteFecha          : new Date(corte.corteFecha),
    cortePrecio         : FormatteDecimal(corte.cortePrecio,2),
    cortePesoBrutoTotal : FormatteDecimal(corte.cortePesoBrutoTotal,3),
    corteTotal          : FormatteDecimal(corte.corteTotal,2),
    carguilloPrecio     : FormatteDecimal(corte.carguilloPrecio, 2),
    tickets : formatter
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
