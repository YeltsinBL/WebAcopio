import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const servicioTransporteEstadosList = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Servicio/Estados`,{
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
  let url=`${appSetting.apiUrl}Servicio/Transporte`
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
    const response = await fetch(`${appSetting.apiUrl}Servicio/Transporte/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return await response.json()
  } catch (error) {
    console.log('servicioTransporteGetById:', error.message)
    throw new Error('Error al obtener el Servicio Transporte')
  }
}
export const servicioTransporteSave = async({method, servicioTransporte}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Servicio/Transporte`, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(servicioTransporte)
    })
    return await response.json()
  } catch (error) {
    console.log('servicioTransporteSave:', error.message)
    return ResponseErrorServidor
  }
}


export const servicioPaleroSearch = async(search) => {
  let url=`${appSetting.apiUrl}Servicio/Palero`
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
    console.log('servicioPaleroSearch:', error.message)
    throw new Error('Error al buscar el Servicio Palero')
  }
}

export const servicioPaleroGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Servicio/Palero/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return await response.json()
  } catch (error) {
    console.log('servicioPaleroGetById:', error.message)
    throw new Error('Error al obtener el Servicio Palero')
  }
}
export const servicioPaleroSave = async({method, servicioPalero}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Servicio/Palero`, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(servicioPalero)
    })
    return await response.json()
  } catch (error) {
    console.log('servicioPaleroSave:', error.message)
    return ResponseErrorServidor
  }
}
export const servicioPaleroGetServicioTransporte = async() =>{
  try {
    const response = await fetch(`${appSetting.apiUrl}Servicio/Palero/ServicioTransporteAvailable`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return await response.json()
  } catch (error) {
    
  }
}