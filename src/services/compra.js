import { ServicesResponseAdapter } from "~/adapters/ServicesResponseAdapter"
import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const searchCompra = async(search) => {
  let url = `${appSetting.apiUrl}Compra`
  if(search != null) url += `?fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}&tipoComprobanteId=${search.tipoComprobanteId}&numeroComprobante=${search.numeroComprobante}&estadoId=${search.estadoId}`
  
  try {
    const response = await fetch(url, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchCompra:', error.message)
    return ResponseErrorServidor
  }
}
export const compraGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Compra/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    return ServicesResponseAdapter(await response.json())
  } catch (error) {
    console.log('compraGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const compraSave = async(method, data) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Compra`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return ServicesResponseAdapter(await response.json())
  } catch (error) {
    console.log('compraSave:', error.message)
    return ResponseErrorServidor
  }
}