import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath,
  obtenerFechaLocal
} from "~utils/index"

export const AdapterListadoServicioTransporte = (servicios=[]) => {
  return servicios.map(servicio =>{
      return AdapterServicioResponseSave(servicio)
    })
}
export const AdapterDataServicioTransporte = (servicio) => {
  const formatter= servicio.servicioDetails?.map(ticket => (formatterticket(ticket)))
  return {...servicio,
    servicioTransporteId: servicio.servicioId,
    servicioTransporteFecha : servicio.servicioFecha.split("T")[0],
    servicioTransportePrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
    servicioTransporteTotal : FormatteDecimalMath(servicio.servicioTransporteTotal,2),
    servicioTransporteEstadoDescripcion: servicio.servicioEstadoDescripcion,
    servicioTransporteTotal:servicio.servicioTotal,
    servicioTransporteDetails : formatter
  }
}
export const AdapterServicioGetData = (servicio) => {
  const formatter= servicio.servicioDetails?.map(ticket => (formatterticket(ticket)))
  return {...servicio,
    servicioFecha : servicio.servicioFecha.split("T")[0],
    servicioPrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
    servicioTotal : FormatteDecimalMath(servicio.servicioTotal,2),
    servicioDetails : formatter
  }
}
export const AdapterServicioGetDataExport = (servicio) => {
  const formatter= servicio.servicioDetails?.map(ticket => (formatterticket(ticket)))
  return {...servicio,
    servicioFecha : convertirFechaDDMMYYYY(servicio.servicioFecha.split("T")[0]),
    servicioPrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
    servicioPesoBruto: FormatteDecimalMath(servicio.servicioPesoBruto, 3),
    servicioTotal : FormatteDecimalMath(servicio.servicioTotal,2),
    servicioDetails : formatter
  }
}
export const AdapterServicioResponseSave = (servicio) => {
  return {
    servicioTransporteId: servicio.servicioId,
    servicioTransporteFecha: convertirFechaDDMMYYYY(servicio.servicioFecha),
    servicioTransporteCarguilloTitular: servicio.servicioCarguilloTitular,
    servicioTransportePrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
    servicioTransportePesoBruto : FormatteDecimalMath(servicio.servicioPesoBruto,3),
    servicioTransporteTotal : FormatteDecimalMath(servicio.servicioTotal,2),
    servicioTransporteEstadoDescripcion: servicio.servicioEstadoDescripcion
  }
}
export const AdapterServicioPaleroSave = (data) => {
  return {
    servicioFecha: data.fechaModel,
    carguilloId: data.carguilloIdModel,
    servicioPrecio: data.servicioPrecioModel,
    servicioPesoBruto: data.sumaPesoBrutoModel,
    servicioTotal: data.totalModel,
    servicioDetail: data.servicioTransporteSelected?.map(servicioTransporte => ({servicioTransporteId :servicioTransporte.servicioTransporteId})),
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: "ADMIN"
  }
}
const formatterticket = (data) => {
  return {...data,
    ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(data.ticketFecha)),
    ticketCamionPeso : FormatteDecimalMath(data.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimalMath(data.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimalMath(data.ticketPesoBruto, 3)
  }
}
