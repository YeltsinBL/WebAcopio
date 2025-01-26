import { appSetting } from "~settings/appsetting"
import { ResponseErrorServidor } from "~utils/ResponseErrorServidor"

export const searchProveedor = async(search) => {
  let url = `${appSetting.apiUrl}Proveedor`
  if(search != null) url += `?ut=${search.ut}&nombre=${search.nombre}&estado=${search.estado}`
  
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
    console.log('searchProveedor:', error.message)
    return ResponseErrorServidor
  }
}
export const searchProveedorAvailable = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Proveedor/Asignar/Available`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const proveedores = await response.json()
    const formatter= proveedores?.map(proveedor => ({
      id : proveedor.proveedorId,
      ut : proveedor.proveedorUT,
      dni : proveedor.personDNI,
      nombre : proveedor.proveedorNombre,
      activo : proveedor.proveedorStatus
    })) 
    return formatter
  } catch (error) {
    console.log('searchProveedorAvailable:', error.message)
    throw new Error('Error al buscar proveedores disponibles')
  }
}

export const proveedorGetById = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Proveedor/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('proveedorGetById:', error.message)
    return ResponseErrorServidor
  }
}

export const proveedorSave = async(method, proveedor) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Proveedor`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedor)
    })
    return await response.json()
  } catch (error) {
    console.log('proveedorSave:', error.message)
    return ResponseErrorServidor
  }
}
