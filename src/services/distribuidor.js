import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const searchDistribuidor = async(search) => {
  let url = `${appSetting.apiUrl}Distribuidor`
  if(search != null) url += `?ruc=${search.ruc}&nombre=${search.name}&estado=${search.estado}`
  
  try {
    const response = await fetch(url, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
    return await response.json()
  } catch (error) {
    console.log('searchDistribuidor:', error.message)
    return ResponseErrorServidor
  }
}
export const distribuidorGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Distribuidor/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    return await response.json()
  } catch (error) {
    console.log('distribuidorGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const distribuidorSave = async(method, user) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Distribuidor`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.log('distribuidorSave:', error.message)
    return ResponseErrorServidor
  }
}