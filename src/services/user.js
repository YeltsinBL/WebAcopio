import { appSetting } from "../settings/appsetting";

export const searchUser = async(search) => {
  let url = `${appSetting.apiUrl}User`
  if(search != null) url += `?typeUserId=${search.typeUserId}&name=${search.name}&userName=${search.userName}&estado=${search.estado}`
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json()
  } catch (error) {
    console.log('searchUser:', error.message)
    throw new Error('Error al buscar usuarios')
  }
}
export const userGetById = async({id}) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}User/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      console.log('userGetById:', error.message)
      throw new Error('Error al obtener el usuario')
    }
  }
  
  export const userSave = async(method, user) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}User`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      console.log('userSave:', error.message)
      throw new Error('Error al guardar el usuario')
    }
  }
export const searchUserModules = async(userName) => {
  const url = `${appSetting.apiUrl}User/GetModules?userName=${userName}`  
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
