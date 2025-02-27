import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath, obtenerFechaLocal 
} from "~utils/index"

export const CorteAdapterFilter = (data) => {
  console.log(data)
  return {
    tierraId: (data.ucFilter==''|| isNaN(data.ucFilter))?'':data.ucFilter, 
    fechaDesde: data.fechaDesdeFilter, fechaHasta: data.fechaHastaFilter, 
    estadoId: (data.estadoFilter==''|| isNaN(data.estadoFilter))?'':data.estadoFilter
  }
}
export const corteAdapterList = (data) => {
    return data?.map(corte => (formattercorte(corte))) 
}
const formattercorte = (corte) => {
  return {...corte,
    corteFecha : convertirFechaDDMMYYYY(corte.corteFecha),
    cortePrecio : FormatteDecimalMath(corte.cortePrecio,2),
    cortePesoBrutoTotal : FormatteDecimalMath(corte.cortePesoBrutoTotal,3),
    corteTotal : FormatteDecimalMath(corte.corteTotal,2),
  }
}
export const corteAdapterGetData = (corte) => {
  const formatter= corte.corteDetail?.map(ticket => (formatterticket(ticket)))
  return {...corte,
    corteFecha          : new Date(corte.corteFecha),
    cortePrecio         : FormatteDecimalMath(corte.cortePrecio,2),
    cortePesoBrutoTotal : FormatteDecimalMath(corte.cortePesoBrutoTotal,3),
    corteTotal          : FormatteDecimalMath(corte.corteTotal,2),
    carguilloPrecio     : FormatteDecimalMath(corte.carguilloPrecio, 2),
    corteDetail : formatter
  }
}
const formatterticket = (ticket) => {
  return {...ticket, 
    ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(ticket.ticketFecha)),
    ticketCamionPeso : FormatteDecimalMath(ticket.ticketCamionPeso, 3),
    ticketVehiculoPeso : FormatteDecimalMath(ticket.ticketVehiculoPeso, 3),
    ticketPesoBruto : FormatteDecimalMath(ticket.ticketPesoBruto, 3)
  }
}


export const corteAdpterSave =(data) =>{
  let save ={
    cortePrecio: data.precioModel,
    corteTotal: data.totalModel,
  }
  if(data.idModel){
    save = {...save,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN',
      corteId: data.idModel,
      corteEstadoDescripcion: data.estadoModel
    }
  } else{
    save = {...save,
      corteFecha: data.fechaModel,
      tierraId: data.ucModel,
      //cortePrecio: data.precioModel,
      cortePesoBrutoTotal: data.sumaPesoBrutoModel,
      userCreatedName: 'ADMIN',
      userCreatedAt: obtenerFechaLocal({date: new Date()}),
      corteDetail: data.ticketSelected?.map(ticket => ({ticketId :ticket.ticketId}))
    }
  }
  return save
}