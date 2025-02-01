import { obtenerFechaLocal } from "~utils/index"

export const productoAdapterSave = (data) => {
  let save = { productoNombre: data.productoNombre }
  if(data.productoId>0){
    return {...save, 
      productoId: data.productoId,
      productoStatus: data.productoStatus,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
    }
  }
  return {...save,
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: 'ADMIN'        
  }
}

export const productoAdapterChangeStatus = (data) => {
  return {
      productoId: data.productoId,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
  }
}