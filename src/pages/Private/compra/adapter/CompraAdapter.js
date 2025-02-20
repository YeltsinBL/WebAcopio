import { 
  convertirFechaDDMMYYYY, convertirFechaToISO, convertirFechaToYMD, FormatteDecimalMath,
  obtenerFechaLocal, obtenerSoloFechaLocal 
} from "~utils/index"

export const CompraAdapterFilter = (data) =>{
  const { 
    fechaDesdeFilter, fechaHastaFilter, comprobanteFilter, numeroFilter,
    estadoFilter
  } = data
  if(fechaDesdeFilter=='' && fechaHastaFilter=='' && 
    comprobanteFilter=='' && numeroFilter=='' && estadoFilter=='' ){
    return null
  }
  return {
    fechaDesde: fechaDesdeFilter, fechaHasta: fechaHastaFilter, 
    tipoComprobanteId: comprobanteFilter, numeroComprobante: numeroFilter, 
    estadoId: estadoFilter
  }
}

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
  const detallesRecojo= data.detalleCompraRecojo?.filter(producto => 
    typeof producto.compraDetalleRecojoId === 'string' && producto.compraDetalleRecojoId.startsWith("temp")
  )
  .map(detalle => (formatterDetalleRecojoSave(detalle)))
  let save = {
    compraFecha: data.fechaModel,
    tipoComprobanteId: data.comprobanteModel,
    compraNumeroComprobante: data.numeroModel,
    distribuidorId: data.distribuidorModel,
    pendienteRecojo: data.totalPendienteModel,
  }
  if(data.compraId >0){
    return {...save,
      compraId: data.compraId,
      compraDetallesRecojo: detallesRecojo,
      userModifiedName:"ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    }
  }
  return {...save,
    userCreatedAt: obtenerFechaLocal({date: new Date()}),
    userCreatedName: 'ADMIN',
    compraTotal: data.totalModel,
    compraDetalles: fusionarDetalles(detalles, detallesRecojo)
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
  return {
    productoId: data.productoId,
    cantidad: data.cantidad,
    precio: FormatteDecimalMath(data.precio, 2),
  }
}

export const compraAdapterGetData = (data) => {
  const detalles= data.compraDetalles?.map(detalle => (formatterGetDataDetalle(detalle)))
  const detallesRecojo= data.compraDetallesRecojo?.map(detalle => (formatterGetDataDetalleRecojo(detalle)))
  
  return {...data,
    compraFecha: data.compraFecha.split("T")[0],
    compraTotal: FormatteDecimalMath(data.compraTotal, 2),
    compraStatus: data.compraStatus ? 'Activo':'Inactivo',
    compraDetalles: detalles,
    compraDetallesRecojo:detallesRecojo,
  }
}
const formatterGetDataDetalle = (data) => {
  return {...data,
    precio: FormatteDecimalMath(data.compraDetallePrecio, 2),
    cantidad: data.compraDetalleCantidad,
    recogidos:data.compraDetalleRecogidos,
    pendientes: data.compraDetallePendientes,
  }
}
const formatterGetDataDetalleRecojo = (data) => {
  return {...data,
    compraDetalleRecojoFecha: convertirFechaDDMMYYYY(obtenerSoloFechaLocal({date:data.compraDetalleRecojoFecha})),
  }
}
const formatterDetalleRecojoSave = (data) => {
  return {...data,
    compraDetalleRecojoId: (typeof data.compraDetalleRecojoId === "string" 
      && data.compraDetalleRecojoId.startsWith("temp")) ?
      0: data.compraDetalleRecojoId,
    compraDetalleRecojoFecha:convertirFechaToYMD(convertirFechaToISO(data.compraDetalleRecojoFecha)),
  }
}
const fusionarDetalles = (detalles, detallesRecojo) => {
  // Crear un mapa para acceder fácilmente a los productos por productoId
  const mapaDetalles = new Map(detalles.map(item => [item.productoId, item]))

  // Fusionar los detallesRecojo en el mapa
  detallesRecojo.forEach(detalleRecojo => {
    if (mapaDetalles.has(detalleRecojo.productoId)) {
      // Si el producto ya existe, fusionar los datos
      Object.assign(mapaDetalles.get(detalleRecojo.productoId), detalleRecojo)
    } else {
      // Si no existe, agregarlo al mapa
      mapaDetalles.set(detalleRecojo.productoId, detalleRecojo)
    }
  })
  // Convertir el mapa de nuevo a un array
  return Array.from(mapaDetalles.values())
}
