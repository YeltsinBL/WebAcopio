import { useEffect, useState } from "react"
import { FormatteDecimal } from "~utils/index"

export const useCalcularRecojoTotal = (cantidadCamion, precioCamion, cantidadDias, precioDias) => {
  const [recojoTotal, setRecojoTotal] = useState("")
  useEffect(() => {
    if (cantidadCamion > 0 && precioCamion > 0 && cantidadDias > 0 && precioDias > 0) {
      const totalCamion = cantidadCamion * precioCamion
      const totalDias = cantidadDias * precioDias
      const total = parseFloat(FormatteDecimal(totalCamion,2)) + parseFloat(FormatteDecimal(totalDias,2))
      setRecojoTotal(FormatteDecimal(total,2))
    } else {
      setRecojoTotal("")
    }
  }, [cantidadCamion, precioCamion, cantidadDias, precioDias])

  return recojoTotal
}
  