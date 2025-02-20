import { useState } from "react"

export const useClienteInitialForm = () => {
  const [clienteId, setClienteId] = useState(0)
  const [clienteDni, setClienteDni] = useState("")
  const [clienteNombre, setClienteNombre] = useState("")
  const [clienteApePaterno, setClienteApePaterno] = useState("")
  const [clienteApeMaterno, setClienteApeMaterno] = useState("")
  const header = ['DNI','Cliente', 'Activo', 'Acciones']
  
  return {
    clienteId, clienteNombre, clienteDni, clienteApePaterno, clienteApeMaterno,
    setClienteId, setClienteNombre, setClienteDni, setClienteApePaterno,
    setClienteApeMaterno, header
  }
}