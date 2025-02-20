import { useEffect, useState } from "react"
import { searchDistribuidor } from "~services/distribuidor"
import { 
  FormatteDecimalMath, formatterDataCombo, obtenerSoloFechaLocal
} from "~utils/index"

export const useCompraInitialForm = (data) => {

  const [compraId, setCompraId] = useState(0)
  const [fechaModel, setFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [comprobanteModel, setComprobanteModel] = useState(0)
  const [numeroModel, setNumeroModel] = useState('')
  const [distribuidorModel, setDistribuidorModel] = useState(0)
  const [totalModel, setTotalModel] = useState(0)
  const [servicioEstado, setservicioEstado] = useState('Activo')
  const [detalleCompra, setDetalleCompra] = useState([])
  const [detalleCompraRecojo, setDetalleCompraRecojo] = useState([])

  const [productoId, setProductoId] = useState(0)
  const [productoModal, setProductoModal] = useState('')
  const [cantidadModal, setCantidadModal] = useState(0)
  const [precioModal, setPrecioModal] = useState(0)
  const [subImporteModal, setSubImporteModal] = useState(0)
  const [showPopup, setShowPopup] = useState(false)

  const [productoRecojoId, setProductoRecojoId] = useState(0)
  const [recojoFechaModel, setRecojoFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [recojoGuiaModel, setRecojoGuiaModel] = useState('')
  const [productoRecojoModal, setProductoRecojoModal] = useState('')
  const [cantidadRecojoModal, setCantidadRecojoModal] = useState(0)
  const [recogidosRecojoModal, setRecogidosRecojoModal] = useState(0)
  const [pendienteRecojoModal, setPendienteRecojoModal] = useState(0)
  const [totalCantidadModel, setTotalCantidadModel] = useState(0)
  const [totalPendienteActualModel, setTotalPendienteActualModel] = useState(0)
  const [totalPendienteModel, setTotalPendienteModel] = useState(0)

  const [distribuidorList, setDistribuidorList] = useState([])
  const seleccionTipoComprobante = data?.tipoComprobanteId ? {id: data.tipoComprobanteId, nombre: data.tipoComprobanteNombre } : null
  const seleccionDistribuidor = data?.tipoComprobanteId ? {id: data.distribuidorId, nombre: data.distribuidorNombre } : null

  const headers = ['Producto', 'Cantidad', 'Precio', 'SubImporte', 'Recogidos', 'Pendientes', 'Acciones']
  const headersRecojo = ['Fecha', 'Guía','Producto', 'Por Recoger', 'Recogidos', 'Pendiente', 'Acciones']

  useEffect(() => {
    getDistribuidor()
  }, [])

  useEffect(()=>{
    console.log(data)
    if(data){
      setCompraId(data.compraId)
      setFechaModel(data.compraFecha)
      setComprobanteModel(data.tipoComprobanteId)
      setNumeroModel(data.compraNumeroComprobante)
      setDistribuidorModel(data.distribuidorId)
      setTotalModel(data.compraTotal)
      setservicioEstado(data.compraStatus)
      setDetalleCompra(data.compraDetalles)
      setDetalleCompraRecojo(data.compraDetallesRecojo)
      setTotalPendienteModel(data.pendienteRecojo)
    }
  }, [data])
  useEffect(() =>{
    if(precioModal >= 0 && cantidadModal >= 0)
      return setSubImporteModal(FormatteDecimalMath(precioModal * cantidadModal,2))
    return setSubImporteModal(0)
  },[precioModal, cantidadModal])
  useEffect(() =>{
    const total = detalleCompra.reduce((acumulador, item) => {
      return {
        totalCantidad: acumulador.totalCantidad + parseInt(item.cantidad),
        totalSubtotal: acumulador.totalSubtotal + parseFloat(item.precio * item.cantidad)
      }
    }, { totalCantidad: 0, totalSubtotal: 0 })
    setTotalModel(total.totalSubtotal)
    setTotalCantidadModel(total.totalCantidad)
  }, [detalleCompra])
  useEffect(() =>{
    if(cantidadRecojoModal >= 0 && recogidosRecojoModal >= 0)
      return setPendienteRecojoModal(parseInt(cantidadRecojoModal) - parseInt(recogidosRecojoModal))
    return setPendienteRecojoModal(0)
  },[recogidosRecojoModal])
  useEffect(() =>{
    const total = detalleCompraRecojo.reduce((total, num) =>{
      return total + parseInt(num.compraDetalleRecogidos)
    }, 0)
    return setTotalPendienteActualModel(total)
  }, [detalleCompraRecojo])
  useEffect(()=>{
    setTotalPendienteModel(totalCantidadModel-totalPendienteActualModel)
  },[totalCantidadModel, totalPendienteActualModel])

  const getDistribuidor = async() =>{
    const distribuidores = await searchDistribuidor({
        ruc:'', name:'', estado:true
    })
    const formatter= distribuidores?.map(tipo =>(
      formatterDataCombo(tipo.distribuidorId, tipo.distribuidorNombre)
    ))
    setDistribuidorList(formatter)
  }
  return {
    compraId, fechaModel, setFechaModel,
    comprobanteModel, setComprobanteModel,
    numeroModel, setNumeroModel,
    distribuidorModel, setDistribuidorModel,
    totalModel, servicioEstado, 
    detalleCompra, setDetalleCompra,
    detalleCompraRecojo, setDetalleCompraRecojo,
    productoId, setProductoId,
    productoModal, setProductoModal,
    cantidadModal, setCantidadModal,
    precioModal, setPrecioModal,
    subImporteModal, showPopup, setShowPopup,
    productoRecojoId, setProductoRecojoId,
    recojoFechaModel, setRecojoFechaModel,
    recojoGuiaModel, setRecojoGuiaModel,
    productoRecojoModal, setProductoRecojoModal,
    cantidadRecojoModal, setCantidadRecojoModal,
    recogidosRecojoModal, setRecogidosRecojoModal,
    pendienteRecojoModal, setPendienteRecojoModal,
    totalPendienteModel, distribuidorList, 
    seleccionTipoComprobante, seleccionDistribuidor,
    headers, headersRecojo,
  }
}