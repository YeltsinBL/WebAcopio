import { useEffect, useState } from "react"
import { searchUserModules } from "../../services/user";
import { useDispatch, useSelector } from "react-redux";
import { setModuleNames } from "../../redux/states/modules";

export const useFetchModule = () => {
  const dispatch = useDispatch()
  const [modulesList, setModulesList] = useState([])
  const userState = useSelector((store) => store.user)

  useEffect(() => {
    const getModules = async() =>{
      const modules = await searchUserModules(userState.token)
      setModulesList(modules)
      const moduleNames = modules.flatMap(module => {
        if (module.subModules.length === 0) {
          // Si no tiene subModules, devolver el moduleName de la cabecera
          return [module.moduleRoute.toLowerCase()]
        } else {
          // Si tiene subModules, devolver los moduleName de los subModules
          return module.subModules.map(subModule => subModule.moduleRoute.toLowerCase())
        }
      })
      dispatch(setModuleNames(moduleNames))
    }
    getModules()
  }, []);
  return {modulesList}
}