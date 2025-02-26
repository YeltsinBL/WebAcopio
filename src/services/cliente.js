import { ApiResponseAdapter } from "~/adapters/ApiResponseAdapter"
import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const searchCliente = async(search) => {
  let url = `${appSetting.apiUrl}Cliente`
  if(search != null) url += `?nombre=${search.nombre}&estado=${search.estadoId}`
  
  try {
    const response = await fetch(url, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchCliente:', error.message)
    return ResponseErrorServidor
  }
}
export const clienteGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Cliente/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('ClienteGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const clienteSave = async(method, user) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Cliente`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('ClienteSave:', error.message)
    return ResponseErrorServidor
  }
}