import { appSetting } from "../settings/appsetting"
import { FormatteDecimal } from "../utils"

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
    url = `${url}?fechaDesde=${fechaDesdeFilter}&fechaHasta=${fechaHastaFilter}&ut=${utFilter}&estadoId=${estadoFilter}`
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
    //return await response.json()
    const data = await response.json()
    return formatterCorteById(data)
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
  console.log(method, liquidacion)
  try {
    const response = await fetch(`${appSetting.apiUrl}Liquidacion`, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(liquidacion)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('liquidacionSave:', error.message)
    throw new Error('Error al guardar la Liquidación')
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
const formatterCorteById = (corte) => {
  const formatter= corte.liquidacionTickets?.map(ticket => (formatterticket(ticket)))
  return {...corte,
    liquidacionTickets : formatter
  }
}
const formatterticket = (data) => {
    return {...data,
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
      estado : data.ticketEstadoDescripcion,
      campo: data.ticketCampo
    }
  }

// export const prueba = async() => {
//     try {
//       const response = await fetch('http://localhost:5010/api/User/New', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           "nIdPersona": 4,
//           "nIdRol": 1,
//           "sUsuLogin": "string",
//           "sUsuContrasenia": "string",
//           "lUsuActivo": true,
//           "email": "string2"
//         })
//       });
//       if (!response.ok) {
//         const errorData = await response.json()
//         console.log( Error(`HTTP error! status: ${errorData}`))
//         console.log('Error:', errorData.title);  // Título del error
//         console.log('Descripción:', errorData.errors[0].description);  // Descripción del error

//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       return await response.json()
//     } catch (error) {
//       console.log('prueba:', error.message)
//       console.log( Error('Error al guardar la prueba'))
//     }
//   }
