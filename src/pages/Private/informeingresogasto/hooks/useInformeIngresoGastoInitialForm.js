import { useEffect, useState } from "react"
import { FormatteDecimalMath, obtenerSoloFechaLocal } from "~utils/index"

export const useInformeIngresoGastoInitialForm = (data) => {
  const [informeId, setInformeId] = useState(0)
  const [informeFecha, setInformeFecha] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [informeEstado, setInformeEstado] = useState('Activo')
  const [personaIdModel, setPersonaIdModel] = useState("")
  const [proveedorIdModel, setProveedorIdModel] = useState(0)
  const [tierraIdModel, setTierraIdModel] = useState("")
  const [campoModel, setCampoModel] = useState("")
  const [utModel, setUtModel] = useState("")
  const [facturaTotalModel, setFacturaTotalModel] = useState(0)
  const [costoTotalModel, setCostoTotalModel] = useState(0)
  const [utilidadTotalModel, setUtilidadTotalModel] = useState(0)

  const [facturaFechaModel, setFacturaFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [facturaNumeroModel, setFacturaNumeroModel] = useState('')
  const [facturaImporteModel, setFacturaImporteModel] = useState(0)  
  const [facturaList, setFacturaList] = useState([])

  const [servicioTransporteSeleccionadosList, setServicioTransporteSeleccionadosList] = useState([])
  const [servicioPaleroSeleccionadosList, setServicioPaleroSeleccionadosList] = useState([])
  const [corteSeleccionadosList, setCorteSeleccionadosList] = useState([])
  const [liquidacionSeleccionadosList, setLiquidacionSeleccionadosList] = useState([])

  const [showPopupServicioTransporte, setShowPopupServicioTransporte] = useState(false)
  const [showPopupServicioPalero, setShowPopupServicioPalero] = useState(false)
  const [showPopupCorte, setShowPopupCorte] = useState(false)
  const [showPopupLiquidacion, setShowPopupLiquidacion] = useState(false)
  
  const [sumaPesoBrutoTransporteModel, setSumaPesoBrutoTransporteModel] = useState(0)
  const [sumaPrecioTransporteModel, setSumaPrecioTransporteModel] = useState(0)
  const [sumaTotalTransporteModel, setSumaTotalTransporteModel] = useState(0)

  const [sumaPesoBrutoPaleroModel, setSumaPesoBrutoPaleroModel] = useState(0)
  const [sumaPrecioPaleroModel, setSumaPrecioPaleroModel] = useState(0)
  const [sumaTotalPaleroModel, setSumaTotalPaleroModel] = useState(0)

  const [sumaPesoBrutoCorteModel, setSumaPesoBrutoCorteModel] = useState(0)
  const [sumaPrecioCorteModel, setSumaPrecioCorteModel] = useState(0)
  const [sumaTotalCorteModel, setSumaTotalCorteModel] = useState(0)

  const [sumaPesoNetoLiquidacionModel, setSumaPesoNetoLiquidacionModel] = useState(0)
  const [sumaPesoBrutoLiquidacionModel, setSumaPesoBrutoLiquidacionModel] = useState(0)
  const [sumaPrecioLiquidacionModel, setSumaPrecioLiquidacionModel] = useState(0)
  const [sumaTotalLiquidacionModel, setSumaTotalLiquidacionModel] = useState(0)

  const [sumaPesoBrutoImpuestosModel, setSumaPesoBrutoImpuestosModel] = useState(0)
  const [sumaPrecioImpuestosModel, setSumaPrecioImpuestosModel] = useState(0)
  const [sumaTotalImpuestosModel, setSumaTotalImpuestosModel] = useState(0)

  const [sumaPesoBrutoOtrosGastosModel, setSumaPesoBrutoOtrosGastosModel] = useState(0)
  const [sumaPrecioOtrosGastosModel, setSumaPrecioOtrosGastosModel] = useState(0)
  const [sumaTotalOtrosGastosModel, setSumaTotalOtrosGastosModel] = useState(0)
  const [resultadoModel, setResultadoModel] = useState('')
  const seleccionPersona = data?.personaId ? {id: data.personaId, nombre: data.personaNombre } : null
  
  useEffect(() =>{
    if(data){
      console.log(data)
      setInformeId(data.informeId)
      setPersonaIdModel(data.personaId)
      setTierraIdModel(data.tierraId)
      setCampoModel(data.tierraCampo)
      setProveedorIdModel(data.proveedorId)
      setUtModel(data.proveedorUT)
      setInformeFecha(data.informeFecha)
      setInformeEstado(data.informeStatus)
      setFacturaTotalModel(data.informeFacturaTotal)
      setCostoTotalModel(data.informeCostoTotal)
      setUtilidadTotalModel(data.informeTotal)

      setFacturaList(data.informeFacturas)
      setServicioTransporteSeleccionadosList(data.informeServiciosTransportes)
      setServicioPaleroSeleccionadosList(data.informeServiciosPaleros)
      setCorteSeleccionadosList(data.informeCortes)
      setLiquidacionSeleccionadosList(data.informeLiquidaciones)

      setSumaPesoBrutoImpuestosModel(data.impuestoPesoBruto)
      setSumaPrecioImpuestosModel(data.impuestoPrecio)
      setSumaTotalImpuestosModel(data.impuestoTotal)
      setSumaPesoBrutoOtrosGastosModel(data.otrosPesoBruto)
      setSumaPrecioOtrosGastosModel(data.otrosPrecio)
      setSumaTotalOtrosGastosModel(data.otrosTotal)
      setResultadoModel(data.informeResultado)
    }
  }, [data])

  useEffect(() => {
    const total = facturaList.filter((item) => item.informeFacturaStatus === true).reduce(getSumFina, 0)
    if(total>0) return setFacturaTotalModel(FormatteDecimalMath(total,2))
    return setFacturaTotalModel(0)
  }, [facturaList])
  const getSumFina=(total, num) =>{
    return total + parseFloat(num.informeFacturaImporte)
  }
  useEffect(()=>{
    const sumaTotales = servicioTransporteSeleccionadosList.reduce((acumulador, servicio) => {
      return {
        precioTotal: acumulador.precioTotal + parseFloat(servicio.servicioPrecio),
        pesoBrutoTotal: acumulador.pesoBrutoTotal + parseFloat(servicio.servicioPesoBruto),
        total: acumulador.total + parseFloat(servicio.servicioTotal)
      };
    }, { precioTotal: 0, pesoBrutoTotal: 0, total: 0 })
    setSumaPesoBrutoTransporteModel(FormatteDecimalMath(sumaTotales.pesoBrutoTotal, 3))
    setSumaPrecioTransporteModel(FormatteDecimalMath(sumaTotales.precioTotal, 2))
    setSumaTotalTransporteModel(FormatteDecimalMath(sumaTotales.total, 2))
  },[servicioTransporteSeleccionadosList])

  useEffect(()=>{
    const sumaTotales = servicioPaleroSeleccionadosList.reduce((acumulador, servicio) => {
      return {
        precioTotal: acumulador.precioTotal + parseFloat(servicio.servicioPrecio),
        pesoBrutoTotal: acumulador.pesoBrutoTotal + parseFloat(servicio.servicioPesoBruto),
        total: acumulador.total + parseFloat(servicio.servicioTotal)
      };
    }, { precioTotal: 0, pesoBrutoTotal: 0, total: 0 })
    setSumaPesoBrutoPaleroModel(FormatteDecimalMath(sumaTotales.pesoBrutoTotal, 3))
    setSumaPrecioPaleroModel(FormatteDecimalMath(sumaTotales.precioTotal, 2))
    setSumaTotalPaleroModel(FormatteDecimalMath(sumaTotales.total, 2))
  },[servicioPaleroSeleccionadosList])
  useEffect(()=>{
    const sumaTotales = corteSeleccionadosList.reduce((acumulador, servicio) => {
      return {
        precioTotal: acumulador.precioTotal + parseFloat(servicio.cortePrecio),
        pesoBrutoTotal: acumulador.pesoBrutoTotal + parseFloat(servicio.cortePesoBrutoTotal),
        total: acumulador.total + parseFloat(servicio.corteTotal)
      };
    }, {  precioTotal: 0, pesoBrutoTotal: 0, total: 0 })
    setSumaPesoBrutoCorteModel(FormatteDecimalMath(sumaTotales.pesoBrutoTotal, 3))
    setSumaPrecioCorteModel(FormatteDecimalMath(sumaTotales.precioTotal, 2))
    setSumaTotalCorteModel(FormatteDecimalMath(sumaTotales.total,2))
  },[corteSeleccionadosList, sumaPesoBrutoCorteModel])
  useEffect(()=>{
    const sumaTotales = liquidacionSeleccionadosList.reduce((acumulador, servicio) => {
      return {
          precioTotal: acumulador.precioTotal + parseFloat(servicio.liquidacionToneladaPrecioCompra),
          pesoBrutoTotal: acumulador.pesoBrutoTotal + parseFloat(servicio.liquidacionPesoBruto),
          pesoNetoTotal: acumulador.pesoNetoTotal + parseFloat(servicio.liquidacionPesoNeto),
          total: acumulador.total + parseFloat(servicio.liquidacionToneladaTotal)
      };
    }, { precioTotal: 0, pesoBrutoTotal: 0,pesoNetoTotal: 0, total: 0 })
    setSumaPesoNetoLiquidacionModel(FormatteDecimalMath(sumaTotales.pesoNetoTotal, 3))
    setSumaPesoBrutoLiquidacionModel(FormatteDecimalMath(sumaTotales.pesoBrutoTotal, 3))
    setSumaPrecioLiquidacionModel(FormatteDecimalMath(sumaTotales.precioTotal, 2))
    setSumaTotalLiquidacionModel(FormatteDecimalMath(sumaTotales.total, 2))
  },[liquidacionSeleccionadosList])

  useEffect(()=>{
    if(parseFloat(sumaPesoBrutoImpuestosModel)>0 && parseFloat(sumaPrecioImpuestosModel)>0){
      var respuesta = parseFloat(sumaPesoBrutoImpuestosModel) * parseFloat(sumaPrecioImpuestosModel)
      return setSumaTotalImpuestosModel(FormatteDecimalMath(respuesta, 2))
    }
    return setSumaTotalImpuestosModel(0)
  }, [sumaPesoBrutoImpuestosModel, sumaPrecioImpuestosModel])
  useEffect(()=>{
    if(parseFloat(sumaPesoBrutoOtrosGastosModel)>0 && parseFloat(sumaPrecioOtrosGastosModel)>0){
      var respuesta = parseFloat(sumaPesoBrutoOtrosGastosModel) * parseFloat(sumaPrecioOtrosGastosModel)
      return setSumaTotalOtrosGastosModel(FormatteDecimalMath(respuesta, 2))
    }
    return setSumaTotalOtrosGastosModel(0)
  }, [sumaPesoBrutoOtrosGastosModel, sumaPrecioOtrosGastosModel])
  useEffect(()=>{
    setCostoTotalModel( 
      (parseFloat(sumaTotalTransporteModel) || 0)+ (parseFloat(sumaTotalPaleroModel) || 0)+
      (parseFloat(sumaTotalCorteModel) || 0)+ (parseFloat(sumaTotalLiquidacionModel) || 0)+
      (parseFloat(sumaTotalImpuestosModel) || 0)+ (parseFloat(sumaTotalOtrosGastosModel) || 0)
    )
  }, [sumaTotalTransporteModel, sumaTotalPaleroModel, sumaTotalCorteModel,
    sumaTotalLiquidacionModel, sumaTotalImpuestosModel, sumaTotalOtrosGastosModel])
  useEffect(()=>{
    setUtilidadTotalModel(
      FormatteDecimalMath((parseFloat(facturaTotalModel) || 0)- (parseFloat(costoTotalModel) || 0),2)
    )
  }, [facturaTotalModel, costoTotalModel])

  return {
    informeId, personaIdModel, setPersonaIdModel, proveedorIdModel, setProveedorIdModel,
    tierraIdModel, setTierraIdModel, campoModel, setCampoModel, utModel, setUtModel,
    informeFecha, setInformeFecha,
    seleccionPersona, facturaFechaModel, setFacturaFechaModel,
    facturaNumeroModel, setFacturaNumeroModel, facturaImporteModel, setFacturaImporteModel,
    facturaList, setFacturaList, informeEstado, facturaTotalModel,
    showPopupServicioTransporte, setShowPopupServicioTransporte,
    showPopupServicioPalero, setShowPopupServicioPalero,
    showPopupCorte, setShowPopupCorte,
    showPopupLiquidacion, setShowPopupLiquidacion,
    servicioTransporteSeleccionadosList, setServicioTransporteSeleccionadosList,
    servicioPaleroSeleccionadosList, setServicioPaleroSeleccionadosList,
    corteSeleccionadosList, setCorteSeleccionadosList,
    liquidacionSeleccionadosList, setLiquidacionSeleccionadosList,
    sumaPesoBrutoTransporteModel, sumaPrecioTransporteModel, sumaTotalTransporteModel,
    sumaPesoBrutoPaleroModel, sumaPrecioPaleroModel, sumaTotalPaleroModel,
    sumaPesoBrutoCorteModel, setSumaPesoBrutoCorteModel, sumaPrecioCorteModel,
    sumaTotalCorteModel, sumaPesoBrutoLiquidacionModel, sumaPrecioLiquidacionModel,
    sumaTotalLiquidacionModel, sumaPesoBrutoImpuestosModel, setSumaPesoBrutoImpuestosModel,
    sumaPesoNetoLiquidacionModel, sumaPrecioImpuestosModel, setSumaPrecioImpuestosModel, sumaTotalImpuestosModel, 
    sumaPesoBrutoOtrosGastosModel, setSumaPesoBrutoOtrosGastosModel,
    sumaPrecioOtrosGastosModel, setSumaPrecioOtrosGastosModel,
    sumaTotalOtrosGastosModel, costoTotalModel, utilidadTotalModel,
    resultadoModel, setResultadoModel,
  }
}