import { useEffect, useState } from "react"
import { obtenerFechaLocal } from "../../utils"

export const useInitialRecojoModal = (data) => {
  const [recojoId, setRecojoId] = useState("")
  const [fechaInicioModel, setFechaInicioModel] = useState("")
  const [fechaFinModel, setFechaFinModel] = useState("")
  const [campoModel, setCampoModel] = useState("")
  const [cantidadCamionModel, setCantidadCamionModel] = useState("")
  const [precioCamionModel, setPrecioCamionModel] = useState("")
  const [cantidadDiasModel, setCantidadDiasModel] = useState("")
  const [precioDiasModel, setPrecioDiasModel] = useState("")
  const [recojoEstado, setRecojoEstado] = useState("Activo")

  useEffect(() => {
    if (data) {
      setRecojoId(data.recojoId || "")
      setCampoModel(data.campo || "")
      setFechaInicioModel(
        data.recojoFechaInicio
          || obtenerFechaLocal({ date: new Date() }).split("T")[0]
      )
      setFechaFinModel(
        data.recojoFechaFin
          || obtenerFechaLocal({ date: new Date() }).split("T")[0]
      )
      setCantidadCamionModel(data.recojoCamionesCantidad || "")
      setPrecioCamionModel(data.recojoCamionesPrecio || "")
      setCantidadDiasModel(data.recojoDiasCantidad || "")
      setPrecioDiasModel(data.recojoDiasPrecio || "")
      setRecojoEstado(data.recojoEstadoDescripcion || "Activo")
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