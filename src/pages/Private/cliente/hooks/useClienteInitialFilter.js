import { useState } from "react"

export const useClienteInitialFilter = () => {
  const [nameFilter, setNameFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  return { 
    nameFilter, setNameFilter, estadoFilter, setEstadoFilter, 
  }
}