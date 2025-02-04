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
    return {...data,
      ventaFecha: data.ventaFecha.split("T")[0],
      ventaTotal: FormatteDecimalMath(data.ventaTotal, 2),
      //ventaStatus: data.ventaStatus ? 'Activo':'Inactivo',
      numeroModel: data.ventaNumeroDocumento,
      ventaDetalles: detalles
    }
  }
  const formatterGetDataDetalle = (data) => {
    return {...data,
      productoPrecioVenta: FormatteDecimalMath(data.ventaDetallePrecio, 2),
      cantidad: data.ventaDetalleCantidad
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
  const detalles= data.detalleVenta?.map(detalle => (formatterDetalle(detalle)))
  return {
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: 'ADMIN',
    ventaFecha: data.fechaModel,
    tipoComprobanteId: data.comprobanteModel,
    ventaTipoId: data.ventaTipoModel,
    personaId: data.personaModel,
    ventaDia: data.ventaDiaModel,
    ventaEstadoId: data.ventaEstadoModel,
    ventaTotal: data.totalModel,
    ventaDetalles: detalles
  }
}
const formatterDetalle = (data) => {
  return {
    productoId: data.productoId,
    cantidad: data.cantidad,
    precio: FormatteDecimalMath(data.precio, 2)
  }
}
