import { obtenerFechaLocal } from "~utils/index"

export const ServicioPaleroAdapterSave = (data) => {
  let save = {
    servicioPrecio: data.servicioPrecioModel,
    servicioTotal: data.totalModel,
  }
  if(data.servicioIdModel) {
    return { ...save,
      servicioId: data.servicioIdModel,
      servicioEstadoDescripcion: data.servicioDescripcion,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
    }
  }else{
    return {...save,
      servicioFecha: data.fechaModel,
      carguilloId: data.carguilloIdModel,
      servicioPesoBruto: data.sumaPesoBrutoModel,
      servicioDetail: data.servicioTransporteSelected?.map(servicioTransporte => ({servicioTransporteId :servicioTransporte.servicioId})),
      userCreatedAt: obtenerFechaLocal({date: new Date()}),
      userCreatedName: "ADMIN"
    }
  }
}