import { useEffect, useState } from "react"
import { searchAsignaTierra } from "~services/asignartierra"
import { 
  convertirFechaToYMD, FormatteDecimalMath, formatterDataCombo, 
  obtenerSoloFechaLocal 
} from "~utils/index"

export const useCorteForm = (data) => {
  const [idModel, setIdModel] = useState(0)
  const [ucModel, setUcModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [fechaModel, setFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [precioModel, setPrecioModel] = useState(0)
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState(0)
  const [totalModel, setTotalModel] = useState(0)
  const [estadoModel, setEstadoModel] = useState('Activo')
  const [proveedoresModel, setProvedoresModel] = useState('')
  const [ticketSelected, setTicketSelected] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [showPopupImagen, setShowPopupImagen] = useState(false)

  const seleccionTierra = data?.tierraId ? {id: data.tierraId, nombre: data.tierraUC } : null
  const [ucLista, setUcLista] = useState([])
  const [ucListaCombo, setUcListaCombo] = useState([])
  const [listaImagenes, setListaImagenes] = useState([])
  const [listaImagenesFile, setListaImagenesFile] = useState([])
  const [listaComentarios, setListaComentarios] = useState([])
  const headers = ['Ingenio', 'Viaje', 'Fecha', 'Vehículo', 'Camión', 'Transportista', 
    'Vehículo Peso', 'Camión Peso', 'Peso Bruto','Palero','Campo', 'Estado','Acción']

  useEffect(()=> {
    getListUC()
    setListaImagenesFile([])
    setListaComentarios([])
  },[])
  useEffect(()=>{
    if(data){
      setIdModel(data.corteId)
      setUcModel(data.tierraUC)
      setCampoModel(data.tierraCampo)
      setFechaModel(convertirFechaToYMD(data.corteFecha))
      setPrecioModel(data.cortePrecio)
      setSumaPesoBrutoModel(data.cortePesoBrutoTotal)
      setTotalModel(data.corteTotal)
      setEstadoModel(data.corteEstadoDescripcion)
      setTicketSelected(data.corteDetail)
      setProvedoresModel(data.proveedoresNombres)
      setListaImagenes(data.corteImagenes)
    }
  }, [data])

  useEffect(() => {
    const total = ticketSelected.reduce((total, num) =>{
      return total + parseFloat(num.ticketPesoBruto)
    }, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketSelected])

  useEffect(()=>{
    if(precioModel > 0 && sumaPesoBrutoModel > 0) 
      return setTotalModel(FormatteDecimalMath(precioModel * sumaPesoBrutoModel,2))
    return setTotalModel('')
  },[precioModel, sumaPesoBrutoModel])

  const getListUC = async() => {
    const ucs = await searchAsignaTierra()
    setUcLista(ucs)
    const formatter= ucs?.map(tipo =>
      (formatterDataCombo(tipo.asignarTierraTierraId, tipo.asignarTierraTierraUC)))
    setUcListaCombo(formatter)
  }

  return {
    idModel, ucModel, setUcModel,
    campoModel, setCampoModel,
    fechaModel, setFechaModel,
    precioModel, setPrecioModel,
    sumaPesoBrutoModel, totalModel,
    estadoModel, proveedoresModel, setProvedoresModel,
    ticketSelected, setTicketSelected,
    showPopup, setShowPopup,
    ucLista, ucListaCombo, seleccionTierra, headers,
    listaImagenes, setListaImagenes,
    showPopupImagen, setShowPopupImagen, listaImagenesFile, 
    setListaImagenesFile, listaComentarios, setListaComentarios,
  }
}