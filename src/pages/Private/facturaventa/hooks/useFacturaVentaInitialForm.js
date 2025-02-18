import { useEffect, useState } from "react"
import { FormatteDecimalMath, obtenerSoloFechaLocal } from "~utils/index"

export const useFacturaVentaInitialForm = (data) => {
  const [facturaVentaId, setFacturaVentaId] = useState(0)
  const [facturaVentaFecha, setFacturaVentaFecha] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [facturaVentaEstado, setFacturaVentaEstado] = useState(0)
  const [facturaNumero, setFacturaNumero] = useState('')
  const [cantidadModel, setCantidadModel] = useState(0)
  const [unidadMedidaModel, setUnidadMedidaModel] = useState('TONELADAS')
  const [importeTotalModel, setImporteTotalModel] = useState(0)
  const [sembradorSeleccionadosList, setSembradorSeleccionadosList] = useState([])

  const [detraccionTotalModel, setDetraccionTotalModel] = useState(0)
  const [pendientePagoModel, setPendientePagoModel] = useState(0)
  const seleccionEstado = data?.facturaVentaEstadoId ? {id: data.facturaVentaEstadoId, nombre: data.facturaVentaEstado } : null
  const [showPopup, setShowPopup] = useState(false)
  useEffect(()=>{
    if(data){
      setFacturaVentaId(data.facturaVentaId)
      setFacturaVentaFecha(data.facturaVentaFecha)
      setFacturaVentaEstado(data.facturaVentaEstado)
      setFacturaNumero(data.facturaVentaNumero)
      setCantidadModel(data.facturaVentaCantidad)
      setUnidadMedidaModel(data.facturaVentaUnidadMedida)
      setImporteTotalModel(data.facturaVentaImporte)
      setSembradorSeleccionadosList(data.facturaVentaPersonas)
      setDetraccionTotalModel(data.facturaVentaDetraccion)
      setPendientePagoModel(data.facturaVentaPendientePago)
    }
  }, [data])

  useEffect(() =>{
    const calculate = (parseFloat(importeTotalModel) || 0) - (parseFloat(detraccionTotalModel) || 0)
    setPendientePagoModel(FormatteDecimalMath(calculate, 2) )
  }, [importeTotalModel, detraccionTotalModel])
  return {
    facturaVentaId, facturaVentaEstado, setFacturaVentaEstado, 
    facturaVentaFecha, setFacturaVentaFecha, facturaNumero, setFacturaNumero, 
    sembradorSeleccionadosList, setSembradorSeleccionadosList,
    cantidadModel, setCantidadModel, unidadMedidaModel, setUnidadMedidaModel,
    importeTotalModel, setImporteTotalModel,
    detraccionTotalModel, setDetraccionTotalModel,
    pendientePagoModel, setPendientePagoModel,seleccionEstado,
    showPopup, setShowPopup,
  }
}