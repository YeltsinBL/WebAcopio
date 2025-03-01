import { appSetting } from "../settings/appsetting";

export const searchTierras = async(search) => {
  let url = `${appSetting.apiUrl}Tierra`
  if(search != null) 
    url +=`?tierraUC=${search.uc}&tierraCampo=${search.campo}&tierraSector=${search.sector}&tierraValle=${search.valle}`
  

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
    console.log('searchTierras:', error.message)
    throw new Error('Error al buscar tierras')
  }
}
export const searchTierrasAvailable = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Tierra/Asignar/Available`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tierras = await response.json()
    const formatter= tierras?.map(tierra => ({
      id : tierra.tierraId,
      uc : tierra.tierraUc,
      campo : tierra.tierraCampo,
      ha : tierra.tierraHa,
      sector : tierra.tierraSector,
      valle : tierra.tierraValle,
      activo : tierra.tierraStatus
    })) 
    return formatter
  } catch (error) {
    console.log('searchTierrasAvailable:', error.message)
    throw new Error('Error al buscar tierras disponibles')
  }
}

export const tierraGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Tierra/${id}`, {
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
    console.log('tierraGetById:', error.message)
    throw new Error('Error al obtener la tierra')
  }
}
export const tierraSave = async(method, tierra) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Tierra`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tierra)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json()
  } catch (error) {
    console.log('tierraSave:', error.message)
    throw new Error('Error al guardar la tierra')
  }
}
