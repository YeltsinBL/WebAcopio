import { ServicesResponseAdapter } from "~/adapters/ServicesResponseAdapter"
import { appSetting } from "~settings/appsetting"

export const FacturaVentaEstados = async() => {
    let url=`${appSetting.apiUrl}FacturaVenta/Estados`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
      return await response.json()
    } catch (error) {
      console.log('FacturaVentaEstados:', error.message)
      throw new Error('Error al buscar las FacturaVentaEstados')
    }
  }
export const FacturaVentaSearch = async({fechaDesde='', fechaHasta='', numero='', estadoId=''}) => {
  let url=`${appSetting.apiUrl}FacturaVenta?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&numero=${numero}&estadoId=${estadoId}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return await response.json()
  } catch (error) {
    console.log('FacturaVentaSearch:', error.message)
    throw new Error('Error al buscar las FacturaVentaSearch')
  }
}
  
export const FacturaVentaGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}FacturaVenta/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    return ServicesResponseAdapter(await response.json())
  } catch (error) {
    console.log('FacturaVentaGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const FacturaVentaSave = async(method, data) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}FacturaVenta`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return ServicesResponseAdapter(await response.json())
  } catch (error) {
    console.log('FacturaVentaSave:', error.message)
    return ResponseErrorServidor
  }
}
