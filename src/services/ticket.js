import { ApiResponseAdapter } from "~/adapters/ApiResponseAdapter"
import { appSetting } from "~settings/appsetting"
import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath
} from "~utils/index"

export const searchTickets = async(search) => {
  let url=`${appSetting.apiUrl}Ticket`
  if(search != null)
    url = `${url}?ingenio=${search.ingenio}&transportista=${search.transportista}&viaje=${search.viaje}&fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}&estadoId=${search.estado}`
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })  
    return ApiResponseAdapter(await response.json())
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
    return await response.json()
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
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('ticketGetById:', error.message)
    throw new Error('Error al obtener la ticket')
  }
}
export const ticketSave = async(method, ticket) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket)
    });
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('ticketsave:', error.message)
    throw new Error('Error al guardar la ticket')
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
    return formatteTickets(tickets)

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
    return formatteTickets(tickets)

  } catch (error) {
    console.log('searchtickets:', error.message)
    throw new Error('Error al buscar tickets')
  }
}
export const searchTicketsForPalero = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Ticket/Palero`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    const tickets = await response.json()
    return formatteTickets(tickets)

  } catch (error) {
    console.log('searchTicketsForPalero:', error.message)
    throw new Error('Error al buscar tickets')
  }
}

const formatteTickets =(tickets) =>{
  return tickets.map(ticket =>{
    return {...ticket, 
      ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(ticket.ticketFecha)),
      ticketCamionPeso : FormatteDecimalMath(ticket.ticketCamionPeso, 3),
      ticketVehiculoPeso : FormatteDecimalMath(ticket.ticketVehiculoPeso, 3),
      ticketPesoBruto : FormatteDecimalMath(ticket.ticketPesoBruto, 3)
    }
  })
}

