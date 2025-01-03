import { useEffect, useState } from "react"
import { searchUserModules } from "../../services/user";

export const useFetchModule = () => {
  const [modulesList, setModulesList] = useState([])

  useEffect(() => {
    const getModules = async() =>{
      const modules = await searchUserModules('flor')
      setModulesList(modules)
    }
    getModules()
  }, []);
  return {modulesList}
}