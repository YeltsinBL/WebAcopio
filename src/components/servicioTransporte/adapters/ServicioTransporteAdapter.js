import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath 
} from "../../../utils"

export const AdapterListado = (servicios=[]) => {
  return servicios.map(servicio =>{
      return {
        servicioTransporteId: servicio.servicioId,
        servicioTransporteFecha: convertirFechaDDMMYYYY(servicio.servicioFecha),
        servicioTransporteCarguilloTitular: servicio.servicioCarguilloTitular,
        servicioTransportePrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
        servicioTransporteTotal : FormatteDecimalMath(servicio.servicioTotal,2),
        servicioTransporteEstadoDescripcion: servicio.servicioEstadoDescripcion
      }
    })
}
export const AdapterData = (servicio) => {
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
const formatterticket = (data) => {
  return {...data,
    ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(data.ticketFecha)),
    ticketCamionPeso : FormatteDecimalMath(data.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimalMath(data.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimalMath(data.ticketPesoBruto, 3)
  }
}

