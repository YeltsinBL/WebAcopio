import { appSetting } from "../settings/appsetting";

export const searchAsignaTierra = async(search=null) => {
  let url= `${appSetting.apiUrl}AsignaTierra`
  if(search != null) 
    url += `?tierraUC=${search.uc}&proveedorUT=${search.ut}&fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)      
    return await response.json()  
  } catch (error) {
    console.log('searchAsignaTierra:', error.message)
    throw new Error('Error al buscar Tierras Asignadas')
  }
}
export const asignaTierraGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}AsignaTierra/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)      
    return await response.json()
  } catch (error) {
    console.log('asignaTierraGetById:', error.message)
    throw new Error('Error al obtener la tierra asignada')
  }
}
export const asignaTierraSave = async(method, tierra) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}AsignaTierra`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tierra)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)      
    return await response.json()
  } catch (error) {
    console.log('asignaTierraSave:', error.message)
    throw new Error('Error al guardar la tierra asignada')
  }
}
