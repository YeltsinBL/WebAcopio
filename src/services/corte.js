import { appSetting } from "../settings/appsetting";
import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath 
} from "../utils";

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
  if(search != null) 
    url += `?tierraId=${search.tierraId}&fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}&estadoId=${search.estadoId}`
  
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
    return await response.json()
  } catch (error) {
    console.log('corteSave:', error.message)
    throw new Error('Error al obtener un corte')
  }
}

const formattercorte = (corte) => {
  return {...corte,
    corteFecha : convertirFechaDDMMYYYY(corte.corteFecha),
    cortePrecio : FormatteDecimalMath(corte.cortePrecio,2),
    cortePesoBrutoTotal : FormatteDecimalMath(corte.cortePesoBrutoTotal,3),
    corteTotal : FormatteDecimalMath(corte.corteTotal,2),
  }
}

const formatterCorteById = (corte) => {
  const formatter= corte.corteDetail?.map(ticket => (formatterticket(ticket)))
  return {...corte,
    corteFecha          : new Date(corte.corteFecha),
    cortePrecio         : FormatteDecimalMath(corte.cortePrecio,2),
    cortePesoBrutoTotal : FormatteDecimalMath(corte.cortePesoBrutoTotal,3),
    corteTotal          : FormatteDecimalMath(corte.corteTotal,2),
    carguilloPrecio     : FormatteDecimalMath(corte.carguilloPrecio, 2),
    corteDetail : formatter
  }
}
const formatterticket = (ticket) => {
  return {...ticket, 
    ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(ticket.ticketFecha)),
    ticketCamionPeso : FormatteDecimalMath(ticket.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimalMath(ticket.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimalMath(ticket.ticketPesoBruto, 3)
  }
}
