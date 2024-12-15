import { appSetting } from "../settings/appsetting"

export const getCarguilloTipoList = async(isCarguillo)=>{
  try {
    let url=`${appSetting.apiUrl}Carguillo/CarguilloTipos`
    if(isCarguillo != null)
        url += `?isCarguillo=${isCarguillo}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()

  } catch (error) {
    console.log('getCarguilloTipoList:', error.message)
    throw new Error('Error al buscar los tipos de carguillo')
  }
}
export const searchCarguilloList = async(filters) =>{
  try {
    let url=`${appSetting.apiUrl}Carguillo`
    if(filters != null)
      url += `?tipoCarguilloId=${filters.tipoCarguilloId}&titular=${filters.titular}&estado=${filters.estado== 2 ? false : filters.estado== 1 ? true : ''}`
    const response = await fetch(url, {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('searchCarguilloList:', error.message)
    throw new Error('Error al buscar los carguillos')
  }
}
export const getCarguillobyId = async(id) =>{
  try {
    const response = await fetch(`${appSetting.apiUrl}Carguillo/${id}`,{
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('getCarguillobyId:', error.message)
    throw new Error('Error al buscar el carguillo')
  }
}
export const getCarguilloPlacasList = async(carguilloId,carguilloTipoId)=>{
  try {
    const response = await fetch(`${appSetting.apiUrl}Carguillo/${carguilloId}/Tipo/${carguilloTipoId}`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('getCarguilloPlacasList:', error.message)
    throw new Error('Error al buscar las placas del carguillo')
  }
}
export const getCarguilloInTickets = async()=>{
  try {
    const response = await fetch(`${appSetting.apiUrl}Carguillo/InAllTickets`,{
      method:'GET',
      headers:{'Content-Type': 'application/json'}
    })
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('getCarguilloPlacasList:', error.message)
    throw new Error('Error al buscar las placas del carguillo')
  }
}
export const saveCarguillo = async(method,carguillo) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Carguillo`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carguillo)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)    
    return await response.json()
  } catch (error) {
    console.log('saveCarguillo:', error.message)
    throw new Error('Error al guardar el carguillo')
  }
}
