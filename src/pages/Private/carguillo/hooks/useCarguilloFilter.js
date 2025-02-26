import { useEffect, useState } from "react"
import { getCarguilloTipoList } from "~services/carguillo"
import { formatterDataCombo } from "~utils/index"

export const useCarguilloFilter = () => {
  const [carguilloTipo, setCarguilloTipo] = useState('')
  const [carguilloTitular, setCarguilloTitular] = useState('')

  const [carguilloTipoList, setCarguilloTipoList] = useState([])

  useEffect(() => {
    getCaguilloLists()
  },[])
  const getCaguilloLists = async(value) =>{
    const tipos = await getCarguilloTipoList(value)
    const formatter = tipos?.map(tipo =>(
      formatterDataCombo(tipo.carguilloTipoId,tipo.carguilloTipoDescripcion)
    ))
    setCarguilloTipoList(formatter)
  }
  return {
    carguilloTipo, setCarguilloTipo,
    carguilloTitular, setCarguilloTitular,
    carguilloTipoList, 
  }
}