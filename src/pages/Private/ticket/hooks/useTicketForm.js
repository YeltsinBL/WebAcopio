import { useEffect, useState } from "react"
import { getCarguilloPlacasList, searchCarguilloList } from "~services/carguillo"
import { FormatteDecimalMath, formatterDataCombo, obtenerSoloFechaLocal } from "~utils/index"

export const useTicketForm = (data) => {
  const [idModel, setIdModel] = useState(0)
  const [ingenioModel, setIngenioModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [viajeModel, setViajeModel] = useState('')
  const [carguilloId, setCarguilloId] = useState('')
  const [choferModel, setChoferModel] = useState('')
  const [fechaModel, setFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [camionModel, setCamionModel] = useState('')
  const [camionPesoModel, setCamionPesoModel] = useState(0)
  const [vehiculoModel, setVehiculoModel] = useState('')
  const [vehiculoPesoModel, setVehiculoPesoModel] = useState(0)
  const [unidadPesoModel, setUnidadPesoModel] = useState('TN')
  const [pesoBrutoModel, setPesoBrutoModel] = useState(0)
  const [estadoModel, setEstadoModel] = useState('Activo')
  const [carguilloList, setCarguilloList] = useState([])
  const [placaCamionList, setPlacaCamionList] = useState([])
  const [placaVehiculoList, setPlacaVehiculoList] = useState([])
  const [seleccionPlacaCamion, setseleccionPlacaCamion] = useState(
    data?.carguilloDetalleCamionId ? 
    {id:data?.carguilloDetalleCamionId, nombre: data?.ticketCamion} : null)
  const [seleccionPlacaVehiculo, setseleccionPlacaVehiculo] = useState(
    data?.carguilloDetalleVehiculoId ? 
    {id:data?.carguilloDetalleVehiculoId, nombre: data?.ticketVehiculo} : null)    
  const [carguilloPaleroId, setCarguilloPaleroId] = useState(0)
  const [carguilloPaleroList, setCarguilloPaleroList] = useState([])
  const seleccionCarguillo = data?.carguilloId ? {id:data?.carguilloId, nombre: data?.ticketTransportista} : null
  const seleccionCarguilloPalero = data?.carguilloPaleroId ? {id:data?.carguilloPaleroId, nombre: data?.paleroNombre} : null
  
  useEffect(() =>{
    listCarguillos()
  }, [])
  useEffect(() => {
    if (data) {
      setIdModel(data.ticketId || 0)
      setIngenioModel(data.ticketIngenio || '')
      setCampoModel(data.ticketCampo || '')
      setViajeModel(data.ticketViaje || '')
      setCarguilloId(data.carguilloId || '')
      setChoferModel(data.ticketChofer || '')
      setFechaModel(
        data.ticketFecha ||
        obtenerSoloFechaLocal({date: new Date()}))
      setCamionModel(data.carguilloDetalleCamionId || "")
      setCamionPesoModel(data.ticketCamionPeso || 0)
      setVehiculoModel(data.carguilloDetalleVehiculoId || "")
      setVehiculoPesoModel(data.ticketVehiculoPeso || 0)
      setUnidadPesoModel(data.ticketUnidadPeso || 'TN')
      setPesoBrutoModel(data.ticketPesoBruto || 0)
      setEstadoModel(data.ticketEstadoDescripcion || 'Activo')
      setCarguilloPaleroId(data.carguilloPaleroId || 0)  
    }
  }, [data])

  useEffect(()=> {
    const camionPeso = parseFloat(camionPesoModel) > 0 ? parseFloat(camionPesoModel) : 0
    const vehiculoPeso = parseFloat(vehiculoPesoModel) > 0 ? parseFloat(vehiculoPesoModel) : 0
    const calculate = camionPeso + vehiculoPeso
    setPesoBrutoModel( FormatteDecimalMath(calculate,3) )
  }, [camionPesoModel, vehiculoPesoModel])

  useEffect(()=>{
    if(carguilloId>0){
      listCarguilloPlacas(carguilloId)
    }
  },[carguilloId])
  const listCarguillos = async() =>{
    const carguillos = await searchCarguilloList({
      tipoCarguilloId:2, titular:'', estado:true})
    const formatter = carguillos.data.map(carguillo => 
      (formatterDataCombo(carguillo.carguilloId,carguillo.carguilloTitular)))
    setCarguilloList(formatter)
    const paleros = await searchCarguilloList({
        tipoCarguilloId:1, titular:'', estado:true})
      const formatterPalero = paleros.data.map(carguillo => 
        (formatterDataCombo(carguillo.carguilloId,carguillo.carguilloTitular)))
      setCarguilloPaleroList(formatterPalero)
  }
  const listCarguilloPlacas =async(carguilloId)=>{
    const placaCamiones = await getCarguilloPlacasList(carguilloId)
    setPlacaCamionList( 
      placaCamiones.carguilloTipoCamion.map(placa =>
      (formatterDataCombo(placa.carguilloDetalleId,placa.carguilloDetallePlaca)))
    )
    setPlacaVehiculoList(
      placaCamiones.carguilloTipoVehiculo.map(placa =>
        (formatterDataCombo(placa.carguilloDetalleId,placa.carguilloDetallePlaca)))
    )
  }
  return {
    idModel, ingenioModel, setIngenioModel,
    campoModel, setCampoModel,
    viajeModel, setViajeModel,
    carguilloId, setCarguilloId,
    choferModel, setChoferModel,
    fechaModel, setFechaModel,
    camionModel, setCamionModel,
    camionPesoModel, setCamionPesoModel,
    vehiculoModel, setVehiculoModel,
    vehiculoPesoModel, setVehiculoPesoModel,
    unidadPesoModel, setUnidadPesoModel,
    pesoBrutoModel, setPesoBrutoModel,
    estadoModel, setEstadoModel,
    carguilloList, placaCamionList, setPlacaCamionList,
    placaVehiculoList, setPlacaVehiculoList,
    seleccionPlacaCamion, setseleccionPlacaCamion,
    seleccionPlacaVehiculo, setseleccionPlacaVehiculo,
    seleccionCarguillo, carguilloPaleroId, setCarguilloPaleroId,
    seleccionCarguilloPalero, carguilloPaleroList,
  }
}