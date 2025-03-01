import { useEffect, useState } from "react"
import { obtenerSoloFechaLocal } from "~utils/index"

export const useInitialRecojoModal = (data) => {
  const [recojoId, setRecojoId] = useState("")
  const [fechaInicioModel, setFechaInicioModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [fechaFinModel, setFechaFinModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [campoModel, setCampoModel] = useState("")
  const [cantidadCamionModel, setCantidadCamionModel] = useState("")
  const [precioCamionModel, setPrecioCamionModel] = useState("")
  const [cantidadDiasModel, setCantidadDiasModel] = useState("")
  const [precioDiasModel, setPrecioDiasModel] = useState("")
  const [recojoEstado, setRecojoEstado] = useState("Activo")

  useEffect(() => {
    if (data) {
      setRecojoId(data.recojoId )
      setCampoModel(data.recojoCampo )
      setFechaInicioModel(data.recojoFechaInicio)
      setFechaFinModel(data.recojoFechaFin)
      setCantidadCamionModel(data.recojoCamionesCantidad)
      setPrecioCamionModel(data.recojoCamionesPrecio)
      setCantidadDiasModel(data.recojoDiasCantidad)
      setPrecioDiasModel(data.recojoDiasPrecio)
      setRecojoEstado(data.recojoEstadoDescripcion)
    }
  }, [data])

  return {
    recojoId, fechaInicioModel, fechaFinModel,
    cantidadCamionModel,
    precioCamionModel, cantidadDiasModel,
    precioDiasModel, recojoEstado,campoModel,
    setRecojoId, setFechaInicioModel,
    setFechaFinModel,
    setCantidadCamionModel, setPrecioCamionModel,
    setCantidadDiasModel, setPrecioDiasModel,
    setRecojoEstado, setCampoModel
  }
}