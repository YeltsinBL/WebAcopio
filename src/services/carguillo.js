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
        url += `?tipoCarguilloId=${filters.tipoCarguilloId}&titular=${filters.titular}&estado=${filters.estado== 2 ? 0 : filters.estado}`
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
