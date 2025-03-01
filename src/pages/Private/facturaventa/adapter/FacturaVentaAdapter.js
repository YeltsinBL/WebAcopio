import { convertirFechaDDMMYYYY, FormatteDecimalMath, obtenerFechaLocal } from "~utils/index"

export const FacturaVentaAdapterFilter =({fechaDesdeFilter ='', fechaHastaFilter ='', numberFilter ='', estadoFilter=0})=>{
  return {fechaDesde:fechaDesdeFilter, fechaHasta:fechaHastaFilter, numero:numberFilter, estadoId:estadoFilter}
}
export const FacturaVentaAdapterList = (data) => {
  return data.map((item) => {
    return { ...item, 
      facturaVentaFecha: convertirFechaDDMMYYYY(item.facturaVentaFecha),
      facturaCantidad: FormatteDecimalMath(item.facturaCantidad, 2),
      facturaImporteTotal: FormatteDecimalMath(item.facturaImporteTotal, 2),
      facturaDetraccion: FormatteDecimalMath(item.facturaDetraccion, 2),
      facturaPendientePago: FormatteDecimalMath(item.facturaPendientePago, 2)
    }
  })
}
export const FacturaVentaAdapterGetData = (data) => {
  return {...data,
    facturaVentaFecha:data.facturaVentaFecha.split("T")[0],
    facturaVentaCantidad: FormatteDecimalMath(data.facturaVentaCantidad, 2),
    facturaVentaImporte: FormatteDecimalMath(data.facturaVentaImporte, 2),
    facturaVentaDetraccion: FormatteDecimalMath(data.facturaVentaDetraccion, 2),
    facturaVentaPendientePago: FormatteDecimalMath(data.facturaVentaPendientePago, 2)
  }
}
export const InformeIngresoGastoAdapterSave = (data) => {
    return {
      facturaVentaEstadoId:data.facturaVentaEstado,
      facturaNumero:data.facturaNumero,
      facturaVentaFecha:data.facturaVentaFecha,
      facturaCantidad:data.cantidadModel,
      facturaUnidadMedida:data.unidadMedidaModel,
      facturaImporteTotal:data.importeTotalModel,
      facturaDetraccion:data.detraccionTotalModel,
      facturaPendientePago:data.pendientePagoModel,
      facturaVentaPersonas: data.sembradorSeleccionadosList?.map(persona => ({personaId :persona.personaId})),
      userCreatedName: 'ADMIN',
      userCreatedAt: obtenerFechaLocal({date: new Date()}),
            
    }
}
