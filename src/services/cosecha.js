import { appSetting } from "../settings/appsetting";

export const searchCosecha = async(search) => {
  let url = `${appSetting.apiUrl}Cosecha`
  if(search != null) 
    url +=`?tierraUC=${search.uc}&proveedotUT=${search.ut}&fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}&tipoCosechaId=${search.tipoCosechaId}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    return await response.json()  
  } catch (error) {
    console.log('searchCosecha:', error.message)
    throw new Error('Error al buscar Cosecha')
  }
}

export const cosechaGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Cosecha/${id}`, {
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
    console.log('cosechaGetById:', error.message)
    throw new Error('Error al obtener la cosecha')
  }
}
export const cosechaSave = async(method, cosecha) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Cosecha`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cosecha)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json()
  } catch (error) {
    console.log('cosechaSave:', error.message)
    throw new Error('Error al guardar la Cosecha')
  }
}
export const searchCosechaTipo = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Cosecha/Tipo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()    
  } catch (error) {
    console.log('searchCosecha:', error.message)
    throw new Error('Error al buscar Cosecha')
  }
}
