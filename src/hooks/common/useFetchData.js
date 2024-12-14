import { useCallback, useEffect, useState } from 'react'
import { searchRecojoEstados } from '../../services/recojo'

export const useFetchData = () => {
  const [data, setData] = useState(null) // Almacena los datos obtenidos
  const [loading, setLoading] = useState(false) // Indica si está cargando
  const [error, setError] = useState(null) // Almacena errores si ocurren
  
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await searchRecojoEstados()
      setData(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return { data, loading, error, refetch: fetchData };
}
