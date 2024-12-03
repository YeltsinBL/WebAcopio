import { appSetting } from "../settings/appsetting";

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

const formatterticket = (data) => {
  return {
    id : data.ticketId,
    ingenio : data.ticketIngenio,
    fecha : new Date(data.ticketFecha ),
    viaje : data.ticketViaje,
    transportista :  data.ticketTransportista ,
    chofer : data.ticketChofer,
    camion : data.ticketCamion,
    caminoPeso : data.ticketCamionPeso,
    vehiculo : data.ticketVehiculo,
    vehiculoPeso : data.ticketVehiculoPeso,
    unidadPeso : data.ticketUnidadPeso,
    pesoBruto : data.ticketPesoBruto,
    estado : data.ticketEstadoDescripcion
  }
}
