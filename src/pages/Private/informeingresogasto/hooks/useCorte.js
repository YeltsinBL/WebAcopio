import { useEffect, useState } from "react"
import { informeListCorte } from "~services/informe"
import { InformeIngresoGastoAdapterCorte } from "../adapter/InformeIngresoGastoAdapter"

export const useCorte = (tierraId) => {
  const [corteList, setCorteList] = useState([])

  useEffect(() => {
    getcorte()
  }, [])

  const getcorte = async () => {
    const cortes = await informeListCorte(tierraId)
    setCorteList(InformeIngresoGastoAdapterCorte(cortes))
  }

  return { corteList }
}
