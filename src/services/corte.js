import { ServicesResponseAdapter } from "~/adapters/ServicesResponseAdapter";
import { appSetting } from "~settings/appsetting"
import { 
  ResponseErrorServidor
} from "~utils/index"

export const searchCorteEstados = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Corte/Estados`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
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
    return await response.json()
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
    return await response.json()
  } catch (error) {
    console.log('corteGetById:', error.message)
    throw new Error('Error al obtener un corte')
  }
}
export const corteSave = async(method, corte) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Corte`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(corte)
    })  
    return ServicesResponseAdapter(await response.json())
  } catch (error) {
    console.log('corteSave:', error.message)
    return ResponseErrorServidor
  }
}
