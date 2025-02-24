import { obtenerFechaLocal } from "~utils/index"

export const ServicioTransporteAdapterSave = (data) => {
  let save ={
    servicioPrecio: data.servicioPrecioModel,
    servicioTotal: data.totalModel,
    detallePagos: formatterDetallePago(data.detallePagado),
    servicioPendientePagar: data.pendientePagarModel,
    servicioPagado: data.totalPagadoModel,  
  }
  if(data.servicioIdModel) {
    return { ...save,
      servicioId: data.servicioIdModel,
      servicioEstadoDescripcion: data.servicioDescripcion,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
    }
  }else {
    return {...save,
      servicioFecha: data.fechaModel,
      carguilloId: data.carguilloIdModel,
      servicioPesoBruto: data.sumaPesoBrutoModel,
      servicioDetail: data.ticketSelected?.map(ticket => ({ticketId :ticket.ticketId})),
      userCreatedAt: obtenerFechaLocal({date: new Date()}),
      userCreatedName: "ADMIN"
    }
  }
}
const formatterDetallePago =(data) =>{
  return data?.filter((item) => 
      typeof item.detallePagoId === "string" &&
      item.detallePagoId.startsWith('temp'))
      .map(pago => (
        {
          pagoFecha: pago.detallePagoFecha,
          pagoEfectivo: pago.detallePagoEfectivo,
          pagoBanco: pago.detallePagoBanco,
          pagoCtaCte: pago.detallePagoCtaCte,
          pagoPagado: pago.detallePagoPagado,
        })
      )
}
