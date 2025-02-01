import { useEffect, useState } from "react"

export const useInitialDistribuidor = (data) => {
  const [distribuidorId, setDistribuidorId] = useState(0)
  const [distribuidorRuc, setDistribuidorRuc] = useState("")
  const [distribuidorNombre, setDistribuidorNombre] = useState("")

  useEffect(() => {
    if (data) {
      setDistribuidorId(data.distribuidorId || 0)
      setDistribuidorRuc(data.distribuidorRuc || "")
      setDistribuidorNombre(data.distribuidorNombre || "")
    }
  }, [data])
  return {
    distribuidorId, distribuidorNombre, distribuidorRuc, 
    setDistribuidorId, setDistribuidorNombre, setDistribuidorRuc
  }
}