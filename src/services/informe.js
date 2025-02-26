import { ApiResponseAdapter } from "~/adapters/ApiResponseAdapter"
import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const informeListLiquidacion = async(personaId) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}InformeIngresoGasto/Liquidaciones/${personaId}`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('informeListLiquidacion:', error.message)
    throw new Error('Error al buscar todas las Liquidación')
  }
}
export const informeListServicio = async(path) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}InformeIngresoGasto/${path}`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('informeListInformeIngresoGasto:', error.message)
    throw new Error('Error al buscar todos los Servicios')
  }
}
export const informeListCorte = async(tierraId) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}InformeIngresoGasto/Cortes/${tierraId}`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('informeListInformeIngresoGasto:', error.message)
    throw new Error('Error al buscar todos los Cortes')
  }
}

export const InformeIngresoGastoSearch = async(search) => {
    let url=`${appSetting.apiUrl}InformeIngresoGasto`
    if(search != null) {
      const {fechaDesde, fechaHasta, sembradorId, estadoId} = search
      url = `${url}?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&proveedorId=${sembradorId}&estadoId=${estadoId}`
    }
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
      return await response.json()
    } catch (error) {
      console.log('InformeIngresoGastoSearch:', error.message)
      throw new Error('Error al buscar las InformeIngresoGastoSearch')
    }
  }
  
export const informeGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}InformeIngresoGasto/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('informeGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const informeSave = async(method, data) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}InformeIngresoGasto`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('informeSave:', error.message)
    return ResponseErrorServidor
  }
}
