import { convertirFechaDDMMYYYY, FormatteDecimalMath, obtenerFechaLocal } from "~utils/index"

export const compraAdapterList = (data) => {
  return data.map((item) => {
    return { ...item, 
      compraFecha: convertirFechaDDMMYYYY(item.compraFecha),
      compraTotal: FormatteDecimalMath(item.compraTotal, 2),
      compraEstado: item.compraStatus ? 'Activo':'Inactivo'
    }
  })
}
export const compraAdapterSave = (data) => {
  const detalles= data.detalleCompra?.map(detalle => (formatterDetalle(detalle)))
  return {
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: 'ADMIN',
    compraFecha: data.fechaModel,
    tipoComprobanteId: data.comprobanteModel,
    compraNumeroComprobante: data.numeroModel,
    distribuidorId: data.distribuidorModel,
    compraTotal: data.totalModel,
    compraDetalles: detalles
  }
}

export const compraAdapterDelete = (data) => {
  return {
    compraId: data.compraId,
    userModifiedAt: obtenerFechaLocal({date: new Date()}),
    userModifiedName: 'ADMIN'
  }
}
const formatterDetalle = (data) => {
  return {...data,
    precio: FormatteDecimalMath(data.precio, 2),
  }
}

export const compraAdapterGetData = (data) => {
  const detalles= data.compraDetalles?.map(detalle => (formatterGetDataDetalle(detalle)))
  return {...data,
    compraFecha: data.compraFecha.split("T")[0],
    compraTotal: FormatteDecimalMath(data.compraTotal, 2),
    compraStatus: data.compraStatus ? 'Activo':'Inactivo',
    compraDetalles: detalles
  }
}
const formatterGetDataDetalle = (data) => {
  return {...data,
    precio: FormatteDecimalMath(data.compraDetallePrecio, 2),
    cantidad: data.compraDetalleCantidad
  }
}
