import { appSetting } from "../settings/appsetting";
import { FormatteDecimal } from "../utils";

export const searchTickets = async(search) => {
  let url=`${appSetting.apiUrl}Ticket`
  if(search != null) {
    const {ingenio, transportista, viaje, fechaDesde, fechaHasta, estado} = search
    url = `${url}?ingenio=${ingenio}&transportista=${transportista}&viaje=${viaje}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&estadoId=${estado}`
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tickets = await response.json()
    const formatter= tickets?.map(ticket => (formatterticket(ticket))) 
    return formatter

  } catch (error) {
    console.log('searchtickets:', error.message)
    throw new Error('Error al buscar tickets')
  }
}
export const searchTicketsEstado = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket/TipoEstado`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const ticketEstados = await response.json()
    return ticketEstados
  } catch (error) {
    console.log('searchticketsAvailable:', error.message)
    throw new Error('Error al buscar tickets disponibles')
  }
}
export const ticketGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return newFormatterTicket(data)
  } catch (error) {
    console.log('ticketGetById:', error.message)
    throw new Error('Error al obtener la ticket')
  }
}
export const searchTicketsByCarguillo = async(carguilloId) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket/Corte/Carguillo?carguilloId=${carguilloId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tickets = await response.json()
    const formatter= tickets?.map(ticket => (formatterticket(ticket))) 
    return formatter

  } catch (error) {
    console.log('searchtickets:', error.message)
    throw new Error('Error al buscar tickets')
  }
}
export const searchTicketsByProveedor = async(proveedorId) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket/Liquidacion/Proveedor?proveedorId=${proveedorId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    const tickets = await response.json()
    const formatter= tickets?.map(ticket => (formatterticket(ticket))) 
    return formatter

  } catch (error) {
    console.log('searchtickets:', error.message)
    throw new Error('Error al buscar tickets')
  }
}
export const ticketSave = async(ticket) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return formatterticket(data)
  } catch (error) {
    console.log('ticketsave:', error.message)
    throw new Error('Error al guardar la ticket')
  }
}
export const ticketUpdate = async(ticket) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return formatterticket(data)
  } catch (error) {
    console.log('ticketUpdate:', error.message)
    throw new Error('Error al modificar la ticket')
  }
}
export const ticketDelete = async(ticket) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true
  } catch (error) {
    console.log('ticketDelete:', error.message)
    throw new Error('Error al eliminar la ticket')
  }
}

const formatterticket = (data) => {
  return {
    id : data.ticketId,
    ingenio : data.ticketIngenio,
    campo: data.ticketCampo,
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
const newFormatterTicket = (data) => {
  return {...data, ticketFecha: new Date(data.ticketFecha ),
    ticketCamionPeso : FormatteDecimal(data.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimal(data.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimal(data.ticketPesoBruto, 3)
  }
}
