import { obtenerFechaLocal } from "~utils/index"

export const TicketAdapterFilter = (data) =>{
  return {
    ingenio:data.ingenioFilter, transportista:data.transportistaFilter, 
    viaje:data.viajeFilter, fechaDesde: data.fechaDesdeFilter, 
    fechaHasta: data.fechaHastaFilter, estado:data.estadoFilter,
  }
}
export const TicketAdapterGuardar = (data) =>{
    
  let save = {
    ticketIngenio:data.ingenioModel,
    ticketCampo: data.campoModel,
    ticketFecha: data.fechaModel,
    ticketViaje: data.viajeModel,
    carguilloId:data.carguilloId, 
    ticketChofer: data.choferModel || null,
    carguilloDetalleCamionId: data.camionModel || null,
    ticketCamionPeso: data.camionPesoModel,
    carguilloDetalleVehiculoId: data.vehiculoModel || null,
    ticketVehiculoPeso: data.vehiculoPesoModel,
    ticketUnidadPeso:data.unidadPesoModel,
    ticketPesoBruto: data.pesoBrutoModel,
    paleroId: data.carguilloPaleroId > 0 ?data.carguilloPaleroId: null,
  }
  if (data.idModel > 0) {
    return {...save,
      ticketId:data.idModel,
      userModifiedName: "ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    }
  }  
  return {...save,
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: "ADMIN" 
  }
}
export const TicketAdapterAnular = (data) =>{
  return {
      id:data.ticketId,
      userModifiedName: "ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    }
}