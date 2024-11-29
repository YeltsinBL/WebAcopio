import { appSetting } from "../settings/appsetting";

export const searchAsignaTierra = async({search}) => {
    if(search == null) console.log("Sin parametros", `${appSetting.apiUrl}AsignaTierra`)
    else {
      const {uc, it, fechaDesde, fechaHasta} = search
      console.log("Con parametros", `${appSetting.apiUrl}AsignaTierra?uc=${uc}&ut=${ut}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`)
    }
  
    try {
      const response = await fetch(`${appSetting.apiUrl}AsignaTierra`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const asignaTierra = await response.json()
      const formatter= asignaTierra?.map(tierra => ({
        id : tierra.asignarTierraId,
        uc : tierra.asignarTierraTierraUC,
        ut : tierra.asignarTierraProveedorUT,
        fecha : new Date(`${tierra.asignarTierraFecha}`),
        activo : tierra.asignarTierraStatus
      }))    
      return formatter
  
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
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      return formatterAsignaTierra(data)
    } catch (error) {
      console.log('asignaTierraGetById:', error.message)
      throw new Error('Error al obtener la tierra asignada')
    }
  }
  export const asignaTierraSave = async(tierra) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}AsignaTierra`, {
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
      return formatterAsignaTierra(data)
    } catch (error) {
      console.log('asignaTierraSave:', error.message)
      throw new Error('Error al guardar la tierra asignada')
    }
  }
  export const asignaTierraUpdate = async(tierra) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}AsignaTierra`, {
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
      return formatterAsignaTierra(data)
    } catch (error) {
      console.log('asignaTierraUpdate:', error.message)
      throw new Error('Error al modificar la tierra asignada')
    }
  }
  export const asignaTierraDelete = async(tierra) => {
    try {
      const response = await fetch(`${appSetting.apiUrl}AsignaTierra`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tierra)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true
    } catch (error) {
      console.log('asignaTierraDelete:', error.message)
      throw new Error('Error al eliminar la tierra asignada')
    }
  }
  const formatterAsignaTierra = (data) => {
    return {
        id : data.asignarTierraId,
        uc : data.asignarTierraTierraUC,
        ut : data.asignarTierraProveedorUT,
        fecha : data.asignarTierraFecha,
        activo : true,
        proveedorId:data.asignarTierraProveedorId || 0,
        tierraId:data.asignarTierraTierraId || 0
    }
  }
 