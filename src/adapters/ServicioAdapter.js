import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath,
  obtenerFechaLocal
} from "~utils/index"

export const AdapterListadoServicio = (servicios=[]) => {
  return servicios.map(servicio =>{
      return {...servicio,
        servicioFecha: convertirFechaDDMMYYYY(servicio.servicioFecha),
        servicioPrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
        servicioPesoBruto : FormatteDecimalMath(servicio.servicioPesoBruto,3),
        servicioTotal : FormatteDecimalMath(servicio.servicioTotal,2)
      }
    })
}
export const AdapterServicioGetData = (servicio) => {
  const formatter= servicio.servicioDetails?.map(ticket => (formatterticket(ticket)))
  const pagos = servicio.detallePagos?.map(detalle => (formatterGetDataPagos(detalle)))
  return {...servicio,
    servicioFecha : servicio.servicioFecha.split("T")[0],
    servicioPrecio: FormatteDecimalMath(servicio.servicioPrecio,2),
    servicioTotal : FormatteDecimalMath(servicio.servicioTotal,2),
    servicioDetails : formatter,
    detallePagos: pagos,
  }
}
const formatterGetDataPagos= (data)=>{
  return {
    detallePagoId: data.pagoId,
    detallePagoFecha: data.pagoFecha.split("T")[0],
    detallePagoPagado: data.pagoPagado,
    detallePagoEfectivo: data.pagoEfectivo,
    detallePagoBanco: data.pagoBanco,
    detallePagoCtaCte: data.pagoCtaCte
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
const formatterticket = (data) => {
  return {...data,
    ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(data.ticketFecha)),
    ticketCamionPeso : FormatteDecimalMath(data.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimalMath(data.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimalMath(data.ticketPesoBruto, 3)
  }
}
