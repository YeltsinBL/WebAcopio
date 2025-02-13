import { useEffect, useState } from "react"
import { informeListLiquidacion } from "~services/informe"
import { InformeIngresoGastoAdapterLiquidacion } from "../adapter/InformeIngresoGastoAdapter"

export const useLiquidacion = (proveedorId) => {
  const [liquidacionList, setLiquidacionList] = useState([])

  useEffect(()=>{
    getLiquidacion()
  },[])

  const getLiquidacion = async () => {
    const liquidaciones = await informeListLiquidacion(proveedorId)
    setLiquidacionList(InformeIngresoGastoAdapterLiquidacion(liquidaciones))
  }
  return { liquidacionList }
}