import { appSetting } from "../settings/appsetting";

export const searchTypeUser = async(search) => {
  let url = `${appSetting.apiUrl}TipoUsuario`
  if(search != null) url += `?nombre=${search.name}&estado=${search.estado}`
  
  try {
    const response = await fetch(url, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return await response.json()
  } catch (error) {
    console.log('searchUser:', error.message)
    throw new Error('Error al buscar usuarios')
  }
}
export const typeUserGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}TipoUsuario/${id}`, {
      method: 'GET', headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('userGetById:', error.message)
    throw new Error('Error al obtener el usuario')
  }
}

export const typeUserSave = async(method, user) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}TipoUsuario`, {
      method: method, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('userSave:', error.message)
    throw new Error('Error al guardar el usuario')
  }
}