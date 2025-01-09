import { appSetting } from "../settings/appsetting";
import { FormatteDecimal } from "../utils";

export const searchCosecha = async(search) => {
  console.log(search)
  let url = `${appSetting.apiUrl}Cosecha`
  if(search != null) 
    url +=`?tierraUC=${search.uc}&proveedotUT=${search.ut}&fechaDesde=${search.fechaDesde}&fechaHasta=${search.fechaHasta}&tipoCosechaId=${search.tipoCosechaId}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
    const data = await response.json()
    return formatterCosecha(data)
  } catch (error) {
    console.log('cosechaGetById:', error.message)
    throw new Error('Error al obtener la cosecha')
  }
}
export const cosechaSave = async(cosecha) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Cosecha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cosecha)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return formatterCosecha(data)
  } catch (error) {
    console.log('cosechaSave:', error.message)
    throw new Error('Error al guardar la Cosecha')
  }
}
export const cosechaUpdate = async(cosecha) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Cosecha`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cosecha)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return formatterCosecha(data)
  } catch (error) {
    console.log('cosechaUpdate:', error.message)
    throw new Error('Error al modificar la cosecha')
  }
}
export const searchCosechaTipo = async() => {
    try {
      const response = await fetch(`${appSetting.apiUrl}Cosecha/Tipo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cosechas = await response.json()
      return cosechas
    
    } catch (error) {
      console.log('searchCosecha:', error.message)
      throw new Error('Error al buscar Cosecha')
    }
  }
const formatterCosecha = (cosecha) => {
  return {
    id : cosecha.cosechaId,
    fecha : cosecha.cosechaFecha.split('T')[0],//new Date(`${cosecha.cosechaFecha}`),
    uc : cosecha.cosechaTierraUC,
    valle : cosecha.cosechaTierraValle,
    sector : cosecha.cosechaTierraSector,
    ut: cosecha.cosechaProveedorUT,
    supervisor: cosecha.cosechaSupervisor,
    campo : cosecha.cosechaTierraCampo,
    has : cosecha.cosechaHAS,
    sac : cosecha.cosechaSac,
    red : cosecha.cosechaRed,
    humedad : cosecha.cosechaHumedad,
    cosecha: cosecha.cosechaCosechaTipo,
    activo : true,
    tierraId: cosecha.cosechaTierraId || 0,
    proveedorId: cosecha.cosechaProveedorId || 0,
    tipoCosecha: cosecha.cosechaCosechaId || 0
  }
}