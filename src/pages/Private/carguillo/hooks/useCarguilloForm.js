import { useEffect, useState } from "react"
import { getCarguilloTipoList } from "~services/carguillo"
import { formatterDataCombo } from "~utils/index"

export const useCarguilloForm = (data) => {
  const [carguilloId, setCarguilloId] = useState(0)
  const [tipoId, setTipoId] = useState('')
  const [titular, setTitular] = useState('')
  const [tipoTransporteId, setTipoTransporteId] = useState('')
  const [placa, setPlaca] = useState('')

  const seleccionTipo = data.carguilloTipoId ? {id:data.carguilloTipoId, nombre:data.carguilloTipoDescripcion} : null
  const [carguilloTipoList, setCarguilloTipoList] = useState([])
  const [carguilloTipoTransporteList, setCarguilloTipoTransporteList] = useState([])
  const [placasList, setPlacasList] = useState([])
  const TIPO_TRANSPORTISTAID = import.meta.env.VITE_TIPOTRANSPORTISTAId
  const [isRequiredPlaca, setIsRequiredPlaca] = useState(false)

  const headers= ['Tipo Transporte', 'Placa','Estado','Acción ']
  
  useEffect(()=>{
    getCarguilloTipo()
    getCarguilloTipoTransporte(false)
  }, [])
  useEffect(()=>{
    if(data){
      setCarguilloId(data.carguilloId || 0)
      setTitular(data.carguilloTitular || '')
      setTipoId(data.carguilloTipoId || '')
      setPlacasList(data.carguilloDetalle || [])
    }
  },[data])
  const getCarguilloTipo = async(value) =>{
    const tipos = await getCarguilloTipoList(value)
    const formatter = tipos?.map(tipo =>(formatterDataCombo(tipo.carguilloTipoId,tipo.carguilloTipoDescripcion)))
    setCarguilloTipoList(formatter)
  }
  const getCarguilloTipoTransporte = async(value) =>{
    const tipos = await getCarguilloTipoList(value)
    const formatter = tipos?.map(tipo =>(formatterDataCombo(tipo.carguilloTipoId,tipo.carguilloTipoDescripcion)))
    setCarguilloTipoTransporteList(formatter)
  }
  return {
    carguilloId, tipoId, setTipoId,
    titular, setTitular,
    tipoTransporteId, setTipoTransporteId,
    placa, setPlaca, seleccionTipo,
    carguilloTipoList, carguilloTipoTransporteList, 
    placasList, setPlacasList,
    isRequiredPlaca, setIsRequiredPlaca,
    TIPO_TRANSPORTISTAID, headers
  }
}