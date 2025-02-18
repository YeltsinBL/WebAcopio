import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const searchTesoreria = async(search) => {
  let url = `${appSetting.apiUrl}Tesoreria`
  if(search != null) url += `?fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}&personaId=${search.personaId}`
  
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
    console.log('searchtesoreria:', error.message)
    throw new Error('Error al buscar las tesorerias')
  }
}
export const tesoreriaGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Tesoreria/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('tesoreriaGetById:', error.message)
    throw new Error('Error al obtener la tesoreria')
  }
}
  
export const tesoreriaSave = async(method, tesoreria) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Tesoreria`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tesoreria)
    })
    return await response.json()
  } catch (error) {
    console.log('tesoreriaSave:', error.message)
    return ResponseErrorServidor
  }
}