import { appSetting } from "../settings/appsetting"

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
    throw new Error('Error al buscar proveedores')
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const proveedor = await response.json()
    return {
      id : proveedor.proveedorId,
      ut : proveedor.proveedorUT,
      dni : proveedor.personDNI,
      nombre : proveedor.personName,
      apellidoPaterno: proveedor.personPaternalSurname,
      apellidoMaterno: proveedor.personMaternalSurname,
      activo : proveedor.proveedorStatus
    }
  } catch (error) {
    console.log('proveedorGetById:', error.message)
    throw new Error('Error al obtener el proveedor')
  }
}

export const proveedorSave = async(proveedor) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Proveedor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedor)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return {
      id : data.proveedorId,
      ut : data.proveedorUT,
      dni : data.personDNI,
      nombre : data.proveedorNombre,
      activo : data.proveedorStatus
    }
  } catch (error) {
    console.log('proveedorGetById:', error.message)
    throw new Error('Error al obtener el proveedor')
  }
}
export const proveedorUpdate = async(proveedor) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Proveedor`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedor)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return {
      id : data.proveedorId,
      ut : data.proveedorUT,
      dni : data.personDNI,
      nombre : data.proveedorNombre,
      activo : data.proveedorStatus
    }
  } catch (error) {
    console.log('proveedorGetById:', error.message)
    throw new Error('Error al obtener el proveedor')
  }
}
export const proveedorDelete = async({id}) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Proveedor/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true
  } catch (error) {
    console.log('proveedorGetById:', error.message)
    throw new Error('Error al obtener el proveedor')
  }
}
