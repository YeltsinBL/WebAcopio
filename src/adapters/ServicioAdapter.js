import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath,
  obtenerFechaLocal
} from "~utils/index"

export const AdapterListadoServicio = (servicios=[]) => {
  return servicios.map(servicio =>{
      return AdapterServicioResponseSave(servicio)
    })
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
  return {...servicio,
    servicioFecha: convertirFechaDDMMYYYY(servicio.servicioFecha),
    servicioPrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
    servicioPesoBruto : FormatteDecimalMath(servicio.servicioPesoBruto,3),
    servicioTotal : FormatteDecimalMath(servicio.servicioTotal,2)
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
export const AdapterServicioTransporteSave = (data) => {
  return {
    servicioFecha: data.fechaModel,
    carguilloId: data.carguilloIdModel,
    servicioPrecio: data.servicioPrecioModel,
    servicioPesoBruto: data.sumaPesoBrutoModel,
    servicioTotal: data.totalModel,
    servicioDetail: data.ticketSelected?.map(ticket => ({ticketId :ticket.ticketId})),
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
