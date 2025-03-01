import { convertirFechaDDMMYYYY, obtenerFechaLocal } from "~utils/index"

export const AsignaTierraAdapterFilter = (data) =>{
  return {
    uc: data.ucFilter, ut: data.utFilter, 
    fechaDesde: data.fechaDesdeFilter, 
    fechaHasta: data.fechaHastaFilter}
}

export const AsignaTierraAdapterList = (data) =>{
  return data.map(asigna =>{
    return {...asigna, 
      asignarTierraFecha: convertirFechaDDMMYYYY(asigna.asignarTierraFecha)}
  })
}

export const AsignaTierraAdapterSave = (data) =>{
  let asignaModel = {
    asignarTierraProveedorId: data.ut,
    asignarTierraTierraId: data.uc,
    asignarTierraFecha: data.fecha,
  }
  if(data.id > 0){
    return {...asignaModel,
      asignarTierraId: data.id,
      userModifiedName: "ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    }
  }
  return {...asignaModel,
    userCreatedName: "ADMIN",
    userCreatedAt: obtenerFechaLocal({date: new Date()})
  }
}

export const AsignaTierraAdapterDelete = (data) =>{
  return {
    asignarTierraId:data.asignarTierraId,
    userModifiedName: "ADMIN",
    userModifiedAt: obtenerFechaLocal({date: new Date()})
  }
}