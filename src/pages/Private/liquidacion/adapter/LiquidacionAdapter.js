import { 
  convertirFechaDDMMYYYY, convertirFechaToISO, convertirFechaToYMD, obtenerFechaLocal 
} from "~utils/index"

export const LiquidacionAdapterFilter =(data) =>{
  return {
    fechaDesdeFilter: data.fechaDesdeFilter, 
    fechaHastaFilter:data.fechaHastaFilter,
    utFilter:(data.utFilter==''|| isNaN(data.utFilter))?'':data.utFilter,
    estadoFilter:(data.estadoFilter==''|| isNaN(data.estadoFilter))?'':data.estadoFilter
  }
}
export const LiquidacionAdapterList = (data) =>{
 return data.map(liquidacion =>{
  return {...liquidacion, 
    liquidacionFechaInicio: convertirFechaDDMMYYYY(liquidacion.liquidacionFechaInicio),
    liquidacionFechaFin   : convertirFechaDDMMYYYY(liquidacion.liquidacionFechaFin)}
  })
}
export const LiquidacionAdapterSave = (data) =>{
  let liquidacion = {
    liquidacionFechaInicio: data.fechaInicioModel,
    liquidacionFechaFin: data.fechaFinModel,
    liquidacionPesoNeto: data.toneladasPesosNetosModel,

    liquidacionToneladaPrecioCompra: data.pCompraModel,
    liquidacionToneladaTotal: data.toneladasTotalModel,

    liquidacionFinanciamientoACuenta: data.financiamientoACuentaTotal,
    liquidacionFinanciamientos: data.financiamientoList?.map(item => ({...item,
      liquidacionFinanciamientoFecha: convertirFechaToYMD(convertirFechaToISO(item.liquidacionFinanciamientoFecha)),
      liquidacionFinanciamientoId: 
        (typeof item.liquidacionFinanciamientoId === "string" && item.liquidacionFinanciamientoId.startsWith("temp")) ?
        0: item.liquidacionFinanciamientoId
    })),

    liquidacionAdicionales: data.adicionalesList?.map(item =>({...item,
      liquidacionAdicionalId: (typeof item.liquidacionAdicionalId === "string" && item.liquidacionAdicionalId.startsWith("temp")) ?
      0: item.liquidacionAdicionalId
    })),
    liquidacionAdicionalTotal: data.adicionalesTotal,
    liquidacionPagar: data.liquidacionPorPagar,

  }
  if(data.liquidacionIdModel > 0){
    return {...liquidacion,
      liquidacionId:data.liquidacionIdModel,
      userModifiedName:"ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    }
  }else{
    return {...liquidacion,
      personaId: data.personaIdModel,
      tierraId: data.tierraIdModel,
      proveedorId: data.proveedorIdModel,
      liquidacionTickets: data.ticketsSeleccionadosList?.map(ticket => ({ticketId :ticket.ticketId})),
      liquidacionPesoBruto: data.sumaPesoBrutoModel,
      userCreatedName: "ADMIN",
      userCreatedAt: obtenerFechaLocal({date: new Date()})
    }
  }
}
export const LiquidacionAdapterDelete = (data)=>{
   return {
    liquidacionId: data.liquidacionId,
    userModifiedName: "ADMIN",
    userModifiedAt: obtenerFechaLocal({date: new Date()})
  } 
}
