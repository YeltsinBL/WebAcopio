import { appSetting } from "../settings/appsetting";

export const searchTierras = async({search}) => {
    if(search == null) console.log("Sin parametros", `${appSetting.apiUrl}Tierra`)
    else {
      const {uc, campo, sector, valle} = search
      console.log("Con parametros", `${appSetting.apiUrl}Tierra?uc=${uc}&campo=${campo}&sector=${sector}&valle=${valle}`)
    }
  
    try {
      const response = await fetch(`${appSetting.apiUrl}Tierra`, {
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
      console.log('searchTierras:', error.message)
      throw new Error('Error al buscar tierras')
    }
  }
export const searchTierrasAvailable = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Tierra/Available`, {
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
      const data = await response.json()
      return formatterTierra(data)
    } catch (error) {
      console.log('tierraGetById:', error.message)
      throw new Error('Error al obtener la tierra')
    }
  }

  export const tierraSave = async(tierra) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}Tierra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tierra)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      return formatterTierra(data)
    } catch (error) {
      console.log('tierraSave:', error.message)
      throw new Error('Error al guardar la tierra')
    }
  }

  export const tierraUpdate = async(tierra) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}Tierra`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tierra)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      return formatterTierra(data)
    } catch (error) {
      console.log('tierraUpdate:', error.message)
      throw new Error('Error al modificar la tierra')
    }
  }

  export const tierraDelete = async({id}) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}Tierra/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true
    } catch (error) {
      console.log('tierraDelete:', error.message)
      throw new Error('Error al eliminar la tierra')
    }
  }

  const formatterTierra = (data) => {
    return {
        id : data.tierraId,
        uc : data.tierraUc,
        campo : data.tierraCampo,
        ha : data.tierraHa,
        sector : data.tierraSector,
        valle : data.tierraValle,
        activo : data.tierraStatus
    }
  }


  /***
   * 
   * 
   * { id: 1,  uc: 'UC123', campo: 'Guayaquil 1',  sector: 'Molino Larco 1', valle:'Chicama 1', 
   * ha:0.5, activo: false},
    
   */