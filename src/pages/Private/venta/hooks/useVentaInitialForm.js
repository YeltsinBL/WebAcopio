import { useEffect, useState } from "react"
import { searchTipoComprobante } from "~services/tipos"
import { searchVentaCliente, searchVentaEstado, searchVentaTipo } from "~services/venta"
import { FormatteDecimalMath, formatterDataCombo, obtenerSoloFechaLocal } from "~utils/index"

export const useVentaInitialForm = (data) => {
  const [ventaId, setVentaId] = useState(0)
  const [fechaModel, setFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  //const [comprobanteModel, setComprobanteModel] = useState(0)
  const [ventaTipoModel, setVentaTipoModel] = useState(0)
  const [ventaDiaModel, setVentaDiaModel] = useState(0)
  const [ventaEstadoModel, setVentaEstadoModel] = useState({id: 0, nombre: 'Activo' })
  const [numeroModel, setNumeroModel] = useState('')
  const [personaModel, setPersonaModel] = useState(0)
  const [totalModel, setTotalModel] = useState(0)
  const [detalleVenta, setDetalleVenta] = useState([])

  const [productoId, setProductoId] = useState(0)
  const [productoModal, setProductoModal] = useState('')
  const [stockModal, setStockModal] = useState(0)
  const [cantidadModal, setCantidadModal] = useState(0)
  const [precioModal, setPrecioModal] = useState(0)
  const [subImporteModal, setSubImporteModal] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  
  //const [comprobantesList, setComprobantesList] = useState([])
  const [personaList, setPersonaList] = useState([])
  const [ventaTipoList, setventaTipoList] = useState([])
  const [ventaEstadoList, setventaEstadoList] = useState([])

  const [seleccionTipoComprobante, setSeleccionTipoComprobante]= useState({id: 0, nombre: 'Orden de Entrega' })
  //const seleccionTipoComprobante = data?.tipoComprobanteId ? {id: data.tipoComprobanteId, nombre: data.tipoComprobanteNombre } : null
  const seleccionPersona = data?.tipoComprobanteId ? {id: data.personaId, nombre: data.personaNombre } : null
  const seleccionVentaTipo = data?.ventaTipoId ? {id: data.ventaTipoId, nombre: data.ventaTipoNombre } : null
  
  const [fechaPagadoModel, setFechaPagadoModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [pagando, setPagando ]= useState(true)
  const [pagadoModel, setPagadoModel] = useState(0)
  const [bancoModel, setBancoModel] = useState("")
  const [cteModel, setCteModel] = useState("")
  const [efectivo, setEfectivo] = useState(false)
  const [pendientePagarModel, setPendientePagar] = useState(0)
  const [detallePagado, setDetallePagado] = useState([])
  const [totalPagadoModel, setTotalPagadoModel] = useState(0)
  
  useEffect(() => {
    getComprobantes()
    getPersona()
    getVentaTipo()
    getVentaEstado()
  }, [])
  useEffect(()=>{
    if(data){
      setVentaId(data.ventaId)
      setFechaModel(data.ventaFecha)
      //setComprobanteModel(data.tipoComprobanteId)
      setNumeroModel(data.numeroModel)
      setVentaTipoModel(data.ventaTipoId)
      setVentaDiaModel(data.ventaDia)
      setVentaEstadoModel({id: data.ventaEstadoId, nombre: data.ventaEstadoNombre })
      setPersonaModel(data.personaId)
      setTotalModel(data.ventaTotal)
      setDetalleVenta(data.ventaDetalles)
      
      setDetallePagado(data.detallePagos || [])
      setPagando(data.ventaId >0 && data.ventaPendientePagar > 0)
    }
  }, [data])
  const getComprobantes = async() => {
    const estados = await searchTipoComprobante()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.tipoComprobanteId, tipo.tipoComprobanteNombre)
    ))
    //setComprobantesList(formatter)
    const filtro = formatter.filter(estado => estado.nombre =='Orden de Entrega')
    setSeleccionTipoComprobante(filtro[0])
  }

  const getPersona = async() => setPersonaList(await searchVentaCliente())  
  const getVentaTipo = async() => setventaTipoList(await searchVentaTipo())
  const getVentaEstado = async() => setventaEstadoList(await searchVentaEstado())

  useEffect(() =>{
    if(precioModal >= 0 && cantidadModal >= 0)
      return setSubImporteModal(FormatteDecimalMath(precioModal * cantidadModal,2))
    return setSubImporteModal(0)
  },[precioModal, cantidadModal])
  useEffect(() =>{
    const total = detalleVenta.reduce(getSum, 0)
    if(total > 0) return setTotalModel(FormatteDecimalMath(total, 2))
    return setTotalModel(0)
  }, [detalleVenta])
  const getSum=(total, num) =>{
    return total + parseFloat(num.productoPrecioVenta * num.cantidad)
  }
  useEffect(()=>{
    if(totalPagadoModel >= 0 && totalModel > 0) 
      return setPendientePagar(FormatteDecimalMath(totalModel - totalPagadoModel, 2))
    return setPendientePagar(0)
  }, [totalModel, totalPagadoModel])
  useEffect(()=>{
    const total = detallePagado
      .reduce((total, item) => total + parseFloat(item.detallePagoPagado), 0)
    setTotalPagadoModel(FormatteDecimalMath(total,2))
  }, [detallePagado])
  return {
    ventaId, fechaModel, setFechaModel, 
    //comprobanteModel, setComprobanteModel,
    numeroModel, personaModel, setPersonaModel,
    totalModel, detalleVenta, setDetalleVenta, 
    productoId, setProductoId, productoModal, setProductoModal, 
    cantidadModal, setCantidadModal, precioModal, setPrecioModal, 
    subImporteModal, showPopup, setShowPopup, 
    personaList, seleccionTipoComprobante, seleccionPersona,
    stockModal, setStockModal, ventaTipoList, ventaEstadoList,
    seleccionVentaTipo, ventaTipoModel, setVentaTipoModel,
    ventaEstadoModel, setVentaEstadoModel, ventaDiaModel, setVentaDiaModel
    ,fechaPagadoModel, setFechaPagadoModel, pagando, 
    pagadoModel, setPagadoModel, bancoModel, setBancoModel,
    cteModel, setCteModel, totalPagadoModel,
    efectivo, setEfectivo, detallePagado, setDetallePagado,
    pendientePagarModel
  }
}