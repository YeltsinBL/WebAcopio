import { ApiResponseAdapter } from "~/adapters/ApiResponseAdapter"
import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const searchProductoTipos = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Producto/Tipos`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchProductoTipos:', error.message)
    return ResponseErrorServidor
  }
}
export const searchProducto = async({nombre='', estado='', stock=''}) => {
  let url = `${appSetting.apiUrl}Producto?nombre=${nombre}&estado=${estado}&stock=${stock}`
  
  try {
    const response = await fetch(url, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchUser:', error.message)
    return ResponseErrorServidor
  }
}
export const productoGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Producto/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('userGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const productoSave = async(method, user) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Producto`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    return ApiResponseAdapter(await response.json())
  } catch (error) {
    console.log('userSave:', error.message)
    return ResponseErrorServidor
  }
}