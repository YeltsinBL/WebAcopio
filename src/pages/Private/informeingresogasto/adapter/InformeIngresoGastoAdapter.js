import { 
  convertirFechaDDMMYYYY, convertirFechaToISO, convertirFechaToYMD, FormatteDecimalMath,
  obtenerFechaLocal, obtenerSoloFechaLocal 
} from "~utils/index"

export const InformeIngresoGastoAdapterLiquidacion = (liquidacionesList)=>{
  return liquidacionesList.map(liquidacion =>{
    return {...liquidacion, 
      liquidacionFechaInicio: convertirFechaDDMMYYYY(liquidacion.liquidacionFechaInicio),
      liquidacionFechaFin   : convertirFechaDDMMYYYY(liquidacion.liquidacionFechaFin),
      liquidacionPesoBruto: (FormatteDecimalMath(liquidacion.liquidacionPesoBruto,3)),
      liquidacionPesoNeto: (FormatteDecimalMath(liquidacion.liquidacionPesoNeto,3)),
      liquidacionToneladaPrecioCompra: (FormatteDecimalMath(liquidacion.liquidacionToneladaPrecioCompra,2)),
      liquidacionToneladaTotal: (FormatteDecimalMath(liquidacion.liquidacionToneladaTotal,2)),
    }
  })
}
export const InformeIngresoGastoAdapterCorte = (cortesList)=>{
  return cortesList.map(corte =>{
    return {...corte, 
      corteFecha: convertirFechaDDMMYYYY(corte.corteFecha),
      cortePrecio : FormatteDecimalMath(corte.cortePrecio,2),
      cortePesoBrutoTotal : FormatteDecimalMath(corte.cortePesoBrutoTotal,3),
      corteTotal : FormatteDecimalMath(corte.corteTotal,2)
    }
  })
}

export const InformeIngresoGastoAdapterFilter = (data) =>{
  const { 
    fechaDesdeFilter, fechaHastaFilter, sembradorIdFilter, estadoFilter
  } = data
  if(fechaDesdeFilter == '' && fechaHastaFilter == '' && sembradorIdFilter == 0 && estadoFilter == 0)
    return null
  return {
    fechaDesde: fechaDesdeFilter, fechaHasta: fechaHastaFilter, 
    sembradorId: sembradorIdFilter, estadoId: estadoFilter
  }
}
export const InformeIngresoGastoAdapterList = (data) => {
  return data.map((item) => {
    return { ...item, 
      informeFecha: convertirFechaDDMMYYYY(item.informeFecha),
      informeFacturaTotal: FormatteDecimalMath(item.informeFacturaTotal, 2),
      informeCostoTotal: FormatteDecimalMath(item.informeCostoTotal, 2),
      informeTotal: FormatteDecimalMath(item.informeTotal, 2),
      informeStatus: item.informeStatus ? 'Activo':'Inactivo'
    }
  })
}

export const InformeIngresoGastoAdapterSave = (data) => {
  let save ={
    informeFacturaTotal: data.facturaTotalModel,
    informeCostoTotal:data.costoTotalModel,
    informeTotal: data.utilidadTotalModel,
    informeResultado: data.resultadoModel
  }
  const costos = [
    {
      informeCostoPrecio: data.sumaPrecioLiquidacionModel,
      informeCostoTonelada: data.sumaPesoBrutoLiquidacionModel,
      informeCostoTotal: data.sumaTotalLiquidacionModel,
      informeCostoOrden: 1 // liquidacion
    },{
      informeCostoPrecio: data.sumaPrecioCorteModel,
      informeCostoTonelada: data.sumaPesoBrutoCorteModel,
      informeCostoTotal: data.sumaTotalCorteModel,
      informeCostoOrden: 2 // corte
    },{
      informeCostoPrecio: data.sumaPrecioPaleroModel,
      informeCostoTonelada: data.sumaPesoBrutoPaleroModel,
      informeCostoTotal: data.sumaTotalPaleroModel,
      informeCostoOrden: 3 // pala
    },{
      informeCostoPrecio: data.sumaPrecioTransporteModel,
      informeCostoTonelada: data.sumaPesoBrutoTransporteModel,
      informeCostoTotal: data.sumaTotalTransporteModel,
      informeCostoOrden: 4 // transporte
    },{
      informeCostoPrecio: data.sumaPrecioImpuestosModel,
      informeCostoTonelada: data.sumaPesoBrutoImpuestosModel,
      informeCostoTotal: data.sumaTotalImpuestosModel,
      informeCostoOrden: 5 // impuestos
    },{
      informeCostoPrecio: data.sumaPrecioOtrosGastosModel,
      informeCostoTonelada: data.sumaPesoBrutoOtrosGastosModel,
      informeCostoTotal: data.sumaTotalOtrosGastosModel,
      informeCostoOrden: 6 // otros
    }
  ]
  if(data.informeId>0){
    return { ...save,
      informeId:data.informeId
    }
  }else{
    const facturas= data.facturaList?.map(detalle => (formatterFactura(detalle)))
    const liquidaciones= data.liquidacionSeleccionadosList?.map(detalle => (formatterSeleccionados(detalle)))
    const cortes= data.corteSeleccionadosList?.map(detalle => (formatterSeleccionados(detalle)))
    const transportes= data.servicioTransporteSeleccionadosList?.map(detalle => (formatterSeleccionados(detalle)))
    const paleros= data.servicioPaleroSeleccionadosList?.map(detalle => (formatterSeleccionados(detalle)))
    
    return {...save,
      userCreatedAt: obtenerFechaLocal({date: new Date()}),
      userCreatedName: 'ADMIN',
      personaId:data.personaIdModel,
      tierraId: data.tierraIdModel,
      proveedorId: data.proveedorIdModel,
      informeFecha: data.informeFecha,
      informeFacturas: facturas,
      informeCostos: costos,
      informeServiciosTransportes: transportes,
      informeServiciosPaleros: paleros,
      informeCortes: cortes,
      informeLiquidaciones: liquidaciones

    }
  }
}
const formatterFactura = (data) => {
  return {
    informeFacturaFecha:  convertirFechaToYMD(convertirFechaToISO(data.informeFacturaFecha)),
    informeFacturaNumero: data.informeFacturaNumero,
    informeFacturaImporte: FormatteDecimalMath(data.informeFacturaImporte, 2)
  }
}
const formatterSeleccionados = (data) => {
  return {
    id: data.liquidacionId || data.corteId || data.servicioId,
  }
}

export const InformeIngresoGastoAdapterGetData = (data) => {
  const facturas= data.informeFacturas?.map(detalle => (formatterGetFactura(detalle)))
  const costos= data.informeCostos?.map(detalle => (formatterGetCosto(detalle)))
  const transportes= data.informeServiciosTransportes?.map(detalle => (formatterGetServicio(detalle)))
  const paleros= data.informeServiciosPaleros?.map(detalle => (formatterGetServicio(detalle)))
  const cortes= data.informeCortes?.map(detalle => (formatterGetCorte(detalle)))
  const liquidaciones= data.informeLiquidaciones?.map(detalle => (formatterGetLiquidacion(detalle)))
  
  const costoLiquidaciones = costos.find(item => item.informeCostoOrden === 1)
  const costoCorte = costos.find(item => item.informeCostoOrden === 2)
  const costoPalero = costos.find(item => item.informeCostoOrden === 3)
  const costoTransporte = costos.find(item => item.informeCostoOrden === 4)
  const impuestos = costos.find(item => item.informeCostoOrden === 5)
  const otrosGastos = costos.find(item => item.informeCostoOrden === 6)

  return {...data,
    informeFecha : obtenerSoloFechaLocal({date: data.informeFecha}),
    informeFacturaTotal : FormatteDecimalMath(data.informeFacturaTotal,2),
    informeCostoTotal: FormatteDecimalMath(data.informeCostoTotal,2),
    informeTotal: FormatteDecimalMath(data.informeTotal,2),
    informeStatus: data.informeStatus ? 'Activo':'Inactivo',
    informeFacturas : facturas,
    informeCostos: costos,
    informeServiciosTransportes: transportes,
    informeServiciosPaleros: paleros,
    informeCortes: cortes,
    informeLiquidaciones: liquidaciones,
    costoLiquidaciones, costoCorte,
    costoPalero, costoTransporte,
    impuestoPrecio:impuestos.informeCostoPrecio,
    impuestoPesoBruto:impuestos.informeCostoTonelada,
    impuestoTotal:impuestos.informeCostoTotal,
    otrosPrecio:otrosGastos.informeCostoPrecio,
    otrosPesoBruto:otrosGastos.informeCostoTonelada,
    otrosTotal:otrosGastos.informeCostoTotal,
  }
}
export const InformeIngresoGastoAdapterAnular = (data) => {
  return {
    informeId:data.informeId,
    userModifiedAt: obtenerFechaLocal({date: new Date()}),
    userModifiedName: 'ADMIN'
  }
}
const formatterGetFactura = (data) => {
  return {...data,
    informeFacturaFecha:  convertirFechaDDMMYYYY(convertirFechaToYMD(convertirFechaToISO(data.informeFacturaFecha))),
    informeFacturaImporte: FormatteDecimalMath(data.informeFacturaImporte, 2)
  }
}
const formatterGetCosto = (data) => {
  return {...data,
    informeCostoPrecio:  FormatteDecimalMath(data.informeCostoPrecio,2),
    informeCostoTonelada: FormatteDecimalMath(data.informeCostoTonelada, 3),
    informeCostoTotal: FormatteDecimalMath(data.informeCostoTotal,2)
  }
}
const formatterGetServicio = (data) => {
  return {...data,
    servicioCarguilloTitular: data.carguilloTitular,
    servicioFecha:  convertirFechaDDMMYYYY(obtenerSoloFechaLocal({date: data.servicioFecha})),
    servicioPrecio:  FormatteDecimalMath(data.servicioPrecio,2),
    servicioPesoBruto: FormatteDecimalMath(data.servicioPesoBruto, 3),
    servicioTotal: FormatteDecimalMath(data.servicioTotal,2)
  }
}
const formatterGetCorte = (data) => {
  return {...data,
    corteFecha:  convertirFechaDDMMYYYY(obtenerSoloFechaLocal({date: data.corteFecha})),
    cortePesoBrutoTotal:  FormatteDecimalMath(data.cortePesoBrutoTotal,3),
    cortePrecio: FormatteDecimalMath(data.cortePrecio, 2),
    corteTotal: FormatteDecimalMath(data.corteTotal,2)
  }
}
const formatterGetLiquidacion = (data) => {
  return {...data,
    liquidacionFechaInicio:  convertirFechaDDMMYYYY(obtenerSoloFechaLocal({date: data.liquidacionFechaInicio})),
    liquidacionFechaFin:  convertirFechaDDMMYYYY(obtenerSoloFechaLocal({date: data.liquidacionFechaFin})),
    liquidacionPesoBruto:  FormatteDecimalMath(data.liquidacionPesoBruto,3),
    liquidacionPesoNeto: FormatteDecimalMath(data.liquidacionPesoNeto, 3),
    liquidacionToneladaTotal: FormatteDecimalMath(data.liquidacionToneladaTotal,2),
    liquidacionToneladaPrecioCompra: FormatteDecimalMath(data.liquidacionToneladaPrecioCompra, 2)
  }
}
