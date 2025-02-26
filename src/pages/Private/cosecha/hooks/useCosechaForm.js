import { useEffect, useState } from "react"
import { searchAsignaTierra } from "~services/asignartierra"
import { searchCosechaTipo } from "~services/cosecha"
import { formatterDataCombo, obtenerSoloFechaLocal } from "~utils/index"

export const useCosechaForm = (data) => {
  const [idModel, setIdModel] = useState(0)
  const [ucModel, setUCModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [utModel, setUTModel] = useState({proveedorId: 0, ut: '' })
  const [fechaModel, setFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [supervisorModel, setSupervisorModel] = useState('')
  const [hasModel, setHasModel] = useState('')
  const [sacModel, setSacModel] = useState('')
  const [redModel, setRedModel] = useState('')
  const [humedadModel, setHumedadModel] = useState('')
  const [cosechaModel, setCosechaModel] = useState('')

  const [tierras, setTierras] = useState([])
  const [cosechaTipo, setCosechaTipo] = useState([])
  const [listAsigna, setListAsigna] = useState([])
  
  const seleccionTierra = data?.cosechaTierraId ? {id: data?.cosechaTierraId, uc: data?.cosechaTierraUC } : null
  const seleccionProveedor = {proveedorId: data?.cosechaProveedorId ?? 0, ut: data?.cosechaProveedorUT ?? '' }
  const seleccionCosechaTipo = data?.cosechaCosechaId ? {id: data?.cosechaCosechaId, uc: data?.cosechaCosechaTipo } : null

  useEffect(() => {
    fetchListAsigna()
    fetchOptionCosechaTipo()
  }, [])
  useEffect(()=>{
    if (data) {
      setIdModel(data.cosechaId || 0)
      setUCModel(data.cosechaTierraId || 0)
      setCampoModel(data.cosechaTierraCampo || '')
      setUTModel(seleccionProveedor)
      setFechaModel(data.cosechaFecha || obtenerSoloFechaLocal({date: new Date()}))
      setSupervisorModel(data.cosechaSupervisor || '')
      setHasModel(data.cosechaHAS || '')
      setSacModel(data.cosechaSac || '')
      setRedModel(data.rcosechaReded || '')
      setHumedadModel(data.cosechaHumedad || '')
      setCosechaModel(data.cosechaCosechaId || 0)
    }
  }, [data])
  const fetchListAsigna= async() => {
    const responseTierra = await searchAsignaTierra()
    setListAsigna(responseTierra)
    const formatter= responseTierra?.map(tipo =>(
      formatterDataCombo(tipo.asignarTierraTierraId, tipo.asignarTierraTierraUC)))
    setTierras(formatter)
  }
  const fetchOptionCosechaTipo = async() => {
    const responseTipo = await searchCosechaTipo()
    const formatter= responseTipo?.map(tipo =>(
      formatterDataCombo(tipo.cosechaTipoId, tipo.descripcion)))
    setCosechaTipo(formatter)
  }

  return {
    idModel, ucModel, setUCModel,
    campoModel, setCampoModel,
    utModel, setUTModel,
    fechaModel, setFechaModel,
    supervisorModel, setSupervisorModel,
    hasModel, setHasModel,
    sacModel, setSacModel,
    redModel, setRedModel,
    humedadModel, setHumedadModel,
    cosechaModel, setCosechaModel,
    tierras, cosechaTipo, listAsigna, seleccionTierra, 
    seleccionCosechaTipo
  }
}