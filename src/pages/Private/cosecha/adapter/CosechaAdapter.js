import { convertirFechaDDMMYYYY, obtenerFechaLocal } from "~utils/index"

export const CosechaAdapterFilter = (data) => {
  return {
    uc: data.ucFilter, ut: data.utFilter, 
    fechaDesde: data.fechaDesdeFilter, fechaHasta: data.fechaHastaFilter,
    tipoCosechaId: data.cosechaTipoFilter, 
  }
}
export const CosechaAdapterList = (data) => {
  return data.map(cosecha =>{
      return {...cosecha, 
        cosechaFecha: convertirFechaDDMMYYYY(cosecha.cosechaFecha)}
    })
}
export const CosechaAdapterSave = (data) => {
  let save = {
    cosechaHas: data.hasModel || null,
    cosechaSac: data.sacModel || null,
    cosechaRed: data.redModel || null,
    cosechaHumedad: data.humedadModel || null,
    cosechaCosechaTipoId: data.cosechaModel,
  }
  if(data.idModel > 0){
    return {...save,
      cosechaId: data.idModel,
      userModifiedName: "ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    }
  }
  return {...save,
    cosechaFecha: data.fechaModel,
    cosechaSupervisor: data.supervisorModel || null,
    cosechaTierraId: data.ucModel,
    cosechaProveedorId: data.utModel.proveedorId,
    userCreatedName: "ADMIN",
    userCreatedAt: obtenerFechaLocal({date: new Date()})
  }    
}