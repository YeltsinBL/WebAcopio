import { useEffect, useState } from "react"
import { informeListRecojo } from "~services/informe"
import { InformeIngresoGastoAdapterRecojo } from "../adapter/InformeIngresoGastoAdapter"

export const useRecojo = () => {
  const [recojoList, setRecojoList] = useState([])

  useEffect(() => {
    getRecojo()
  }, [])

  const getRecojo = async () => {
    const recojos = await informeListRecojo()
    setRecojoList(InformeIngresoGastoAdapterRecojo(recojos))
  }

  return { recojoList }
}
