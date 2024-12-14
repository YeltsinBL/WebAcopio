import { appSetting } from "../settings/appsetting"

export const searchRecojoEstados = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Recojo/Estados`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status ${response.status}`)
    return await response.json()

  } catch (error) {
    console.log('searchRecojoEstados:', error.message)
    throw new Error('Error al buscar Recojo Estados')
  }
}

export const searchRecojos = async(search) => {
  let url=`${appSetting.apiUrl}Recojo`
  if(search != null) {
    const {fechaDesdeFilter, fechaHastaFilter, estadoFilter} = search
    url = `${url}?fechaDesde=${fechaDesdeFilter}&fechaHasta=${fechaHastaFilter}&estadoId=${estadoFilter}`
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json()

  } catch (error) {
    console.log('searchRecojo:', error.message)
    throw new Error('Error al buscar recojos')
  }
}

export const recojoGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Recojo/${id}`, {
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
    console.log('recojoGetById:', error.message)
    throw new Error('Error al obtener el recojo')
  }
}
export const recojoSave = async({method, recojo}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Recojo`, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(recojo)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('recojoSave:', error.message)
    throw new Error('Error al guardar el recojo')
  }
}
export const recojoDelete = async(recojo) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Recojo`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recojo)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('recojoDelete:', error.message)
    throw new Error('Error al eliminar el recojo')
  }
}
