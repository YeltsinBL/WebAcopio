import { obtenerFechaLocal } from "~utils/index"

export const CarguilloAdapterFilter = (data) => {
  return {
    tipoCarguilloId: data.carguilloTipo, 
    titular: data.carguilloTitular, 
    estado: ''
  }
}

export const CarguilloAdapterSave = (data) =>{
  let save = {
    carguilloTitular: data.titular,
    carguilloTipoId: data.tipoId,
    carguilloDetalle: reemplazarIdTemporal(data.placasList)
  }
  if(data.carguilloId > 0){
    return {...save,
      carguilloId: data.carguilloId,
      userModifiedName: 'ADMIN',
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
    }
  }
  return{...save,
    userCreatedName: 'ADMIN',
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
  }
}
  const reemplazarIdTemporal = (data) => {
    return data.map((item) => ({
      ...item,
      carguilloDetalleId: typeof item.carguilloDetalleId === "string" && item.carguilloDetalleId.startsWith("temp")
        ? 0 // Cambiar los temporales a 0
        : item.carguilloDetalleId,
    }))
  }