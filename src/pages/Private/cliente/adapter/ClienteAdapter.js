import { obtenerFechaLocal } from "~utils/index"

export const clienteAdapterList = (data) =>{
  return data?.map((item) => {
    return { ...item, 
      clienteNombre: item.clienteNombre
        .concat("  ", item.clienteApellidoPaterno, " ", 
          item.clienteApellidoMaterno),
      clienteStatus: item.clienteStatus ? 'Activo':'Inactivo'
    }
  })
}

export const clienteAdapterSave = (data) => {
  let save = { 
    clienteDni:data.clienteDni,
    clienteNombre: data.clienteNombre,
    clienteApellidoPaterno: data.clienteApePaterno,
    clienteApellidoMaterno: data.clienteApeMaterno,
  }
  if(data.clienteId>0){
    return {...save, 
      clienteId: data.clienteId,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
    }
  }
  return {...save,
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: 'ADMIN'        
  }
}

export const clienteAdapterChangeStatus = (data) => {
  return {
      clienteId: data.clienteId,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
  }
}