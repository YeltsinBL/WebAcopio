import { ServicesResponseAdapter } from "~/adapters/ServicesResponseAdapter"
import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const searchVentaTipo = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Venta/VentaTipo`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchVenta:', error.message)
    return ResponseErrorServidor
  }
}
export const searchVentaEstado = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Venta/VentaEstado`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchVenta:', error.message)
    return ResponseErrorServidor
  }
}
export const searchVentaCliente = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Venta/VentaCliente`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchVenta:', error.message)
    return ResponseErrorServidor
  }
}

export const searchVenta = async(search) => {
  let url = `${appSetting.apiUrl}Venta`
  if(search != null) url += `?fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}&tipoComprobanteId=${search.tipoComprobanteId}&numeroComprobante=${search.numeroComprobante}&estadoId=${search.estadoId}`
  
  try {
    const response = await fetch(url, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchVenta:', error.message)
    return ResponseErrorServidor
  }
}
export const ventaGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Venta/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    return ServicesResponseAdapter(await response.json())
  } catch (error) {
    console.log('ventaGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const ventaSave = async(method, data) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Venta`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return ServicesResponseAdapter(await response.json())
  } catch (error) {
    console.log('ventaSave:', error.message)
    return ResponseErrorServidor
  }
}