import { convertirFechaDDMMYYYY, obtenerFechaLocal } from "~utils/index"

export const RecojoAdapterFilter = (data) => {
  return {
    fechaDesdeFilter:data.fechaDesdeFilter, fechaHastaFilter:data.fechaHastaFilter, 
    estadoFilter:data.estadoFilter
  }
}

export const RecojoAdapterList = (data) =>{
  return data.map(recojo =>{
    return {...recojo, 
      recojoFechaInicio: convertirFechaDDMMYYYY(recojo.recojoFechaInicio),
      recojoFechaFin   : convertirFechaDDMMYYYY(recojo.recojoFechaFin)}
    })
}

export const RecojoAdapterSave = (data) =>{
  let recojoModel={
    recojoFechaInicio: data.fechaInicioModel,
    recojoFechaFin: data.fechaFinModel,
    recojoCamionesCantidad: data.cantidadCamionModel,
    recojoCamionesPrecio: data.precioCamionModel,
    recojoDiasCantidad: data.cantidadDiasModel,
    recojoDiasPrecio: data.precioDiasModel,
    recojoTotalPrecio: data.recojoTotalModel,
    recojoCampo: data.campoModel
  }
  if(data.recojoId > 0){
    return {...recojoModel,
      recojoId: data.recojoId,
      recojoEstadoDescripcion: data.recojoEstado,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
  }
  return {...recojoModel,
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName:"ADMIN"
  }  
}

export const RecojoAdapterDelete = (data) =>{
  return {
    recojoId: data,
    userModifiedAt : obtenerFechaLocal({date: new Date()}),
    userModifiedName: "ADMIN"
  }
}