import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath, obtenerFechaLocal 
} from "~utils/index"

export const CorteAdapterFilter = (data) => {
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
    corteDetail : formatter,
    corteImagenes: corte.corteImagenes,
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

export const corteAdapterSave = (data) => {
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
      cortePesoBrutoTotal: data.sumaPesoBrutoModel,
      userCreatedName: 'ADMIN',
      userCreatedAt: obtenerFechaLocal({date: new Date()}),
    }
  }

  const formData = new FormData()

  // 📌 Agregar valores simples
  Object.keys(save).forEach(key => {
    formData.append(key, save[key])
  })

  // 📌 Agregar corteDetail
  if (data.idModel ==0 && data.ticketSelected?.length > 0) {
    data.ticketSelected.forEach((ticket, index) => {
      formData.append(`CorteDetail[${index}].ticketId`, ticket.ticketId)
    })
  } else formData.append('CorteDetail', [])
  // 📌 Agregar imágenes
  if (data.listaImagenesFile?.length > 0) {
    data.listaImagenesFile.forEach((imagen) => {
      if (imagen instanceof File) {
        formData.append(`imagenes`, imagen)
      }
    })
  } else formData.append('imagenes', [])
  // 📌 Agregar descripciones
  if (data.listaComentarios?.length > 0) {
    data.listaComentarios.forEach((descripcion, index) => {
      formData.append(`descripciones[${index}]`, descripcion)
    })
  } else formData.append('descripciones', [])

  return formData
}

export const corteAdapterDelete = (data) =>{
  return {
    corteId: data.corteId,
    userModifiedName: "ADMIN",
    userModifiedAt: obtenerFechaLocal({date: new Date()})
  }
}
