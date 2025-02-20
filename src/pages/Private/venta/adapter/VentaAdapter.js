import { convertirFechaDDMMYYYY, FormatteDecimalMath, obtenerFechaLocal } from "~utils/index"

export const ventaAdapterList = (data) => {
  return data.map((item) => {
    return { ...item, 
      ventaFecha: convertirFechaDDMMYYYY(item.ventaFecha),
      ventaTotal: FormatteDecimalMath(item.ventaTotal, 2),
      ventaEstado: item.ventaStatus ? 'Activo':'Inactivo'
    }
  })
}
export const ventaAdapterGetData = (data) => {
    const detalles= data.ventaDetalles?.map(detalle => (formatterGetDataDetalle(detalle)))
    const pagos = data.detallePagos?.map(detalle => (formatterGetDataPagos(detalle)))
    return {...data,
      ventaFecha: data.ventaFecha.split("T")[0],
      ventaTotal: FormatteDecimalMath(data.ventaTotal, 2),
      ventaPendientePagar: FormatteDecimalMath(data.ventaPendientePagar, 2),
      ventaPagado:FormatteDecimalMath(data.ventaPagado, 2),
      //ventaStatus: data.ventaStatus ? 'Activo':'Inactivo',
      numeroModel: data.ventaNumeroDocumento,
      ventaDetalles: detalles,
      detallePagos: pagos
    }
  }
  const formatterGetDataDetalle = (data) => {
    return {...data,
      productoPrecioVenta: FormatteDecimalMath(data.ventaDetallePrecio, 2),
      cantidad: data.ventaDetalleCantidad
    }
  }
const formatterGetDataPagos= (data)=>{
  return {
    detallePagoId: data.ventaDetallePagoId,
    detallePagoFecha: data.ventaDetallePagoFecha.split("T")[0],
    detallePagoPagado: data.ventaDetallePagoPagado,
    detallePagoEfectivo: data.ventaDetallePagoEfectivo,
    detallePagoBanco: data.ventaDetallePagoBanco,
    detallePagoCtaCte: data.ventaDetallePagoCtaCte
  }
}
  
export const ventaAdapterDelete = (data) => {
  return {
    id: data.ventaId,
    userModifiedAt: obtenerFechaLocal({date: new Date()}),
    userModifiedName: 'ADMIN'
  }
}

export const ventaAdapterSave = (data) => {
  let save = {
    ventaFecha: data.fechaModel,
    tipoComprobanteId: data.comprobanteModel.id,
    ventaTipoId: data.ventaTipoModel,
    personaId: data.personaModel,
    ventaDia: data.ventaDiaModel,
    ventaEstadoId: data.ventaEstadoModel,
    ventaPendientePagar: data.pendientePagarModel,
    ventaPagado: data.totalPagadoModel,
    detallePagos: data.detallePagado?.filter((item) => 
      typeof item.detallePagoId === "string" &&
      item.detallePagoId.startsWith('temp')),
  }
  if(data.ventaId>0){
    return {...save,
      ventaId: data.ventaId,
      userModifiedAt: obtenerFechaLocal({date: new Date()}),
      userModifiedName: 'ADMIN'
    }
  }else{
    const detalles= data.detalleVenta?.map(detalle => (formatterDetalle(detalle)))
    return {...save,
      userCreatedAt: obtenerFechaLocal({date: new Date()}),
      userCreatedName: 'ADMIN',      
      ventaTotal: data.totalModel,
      ventaDetalles: detalles
    }
  }
}
const formatterDetalle = (data) => {
  return {
    productoId: data.productoId,
    cantidad: data.cantidad,
    precio: FormatteDecimalMath(data.productoPrecioVenta, 2)
  }
}
