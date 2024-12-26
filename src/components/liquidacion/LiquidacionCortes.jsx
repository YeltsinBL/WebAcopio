import { useEffect, useState } from "react"

export function LiquidacionCortes({onShowModel}) {
  const [cortesList, setCortesList] = useState([])
  useEffect(()=>{
    getCortesActive()
  }, [])
  const getCortesActive = () =>{
    
  }
  return (
    <div>LiquidacionCortes</div>
  )
}