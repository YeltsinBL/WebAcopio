import { obtenerFechaLocal } from "~utils/index"

export const distribuidorAdapterSave = (data) => {
  let save = { 
    distribuidorRuc:data.distribuidorRuc,
    distribuidorNombre: data.distribuidorNombre 
  }
  if(data.distribuidorId>0){
    return {...save, 
      distribuidorId: data.distribuidorId,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
    }
  }
  return {...save,
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: 'ADMIN'        
  }
}

export const distribuidorAdapterChangeStatus = (data) => {
  return {
      distribuidorId: data.distribuidorId,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
  }
}