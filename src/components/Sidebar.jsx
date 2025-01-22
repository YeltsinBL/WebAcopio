import { Menu } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom"
import * as Icons from "lucide-react"
import { useLogOutSession, useFetchModule } from "~hooks/common"

const Sidebar = () => {
  const LogOut= useLogOutSession()
  const {modulesList, moduleError} = useFetchModule()
  if(modulesList.length == 0 && moduleError.error) LogOut()
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  // Estado para manejar qué grupo está expandido
  const [expandedGroups, setExpandedGroups] = useState({});
  // Alternar el estado expandido de un grupo
  const toggleGroup = (groupName) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [groupName]: !prevState[groupName], // Alternar el grupo
    }));
  };
  const renderIcon = (iconName, style) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent style={{color: style , minWidth: "20px" }} /> : null;
  };
  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 
        ${isSidebarOpen ? 'w-64' : 'w-20'}`}
    >
      <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
        >
          <Menu size={24}/>
        </button>
        <nav className='mt-1 flex-grow overflow-y-auto scrollbar-hide'>          
          {modulesList.map((module) => (
              module.subModules.length > 0 ? (
              <div key={module.moduleId} className="mb-4">
                  {/* Cabecera del grupo */}
                  <div
                  className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                  onClick={() => toggleGroup(module.moduleName)}
                  >
                      {renderIcon(module.moduleIcon, module.moduleColor)}
                      {isSidebarOpen && (
                      <>
                          <span className="ml-4 whitespace-nowrap pr-3">{module.moduleName}</span>
                          <span>{expandedGroups[module.moduleName] ? "▲" : "▼"}</span>
                      </>
                      )}
                  </div>
                  {/* Items del grupo */}
                  {expandedGroups[module.moduleName] && (
                  module.subModules.map((submodule) => (
                      <OptionModule key={submodule.moduleId} module={submodule} isSidebarOpen={isSidebarOpen}>
                      {renderIcon(submodule.moduleIcon, submodule.moduleColor)}
                      </OptionModule>
                  ))
                  )}
              </div>
              ):(
              // Si el módulo no tiene un grupo
              <OptionModule key={module.moduleId} module={module} isSidebarOpen={isSidebarOpen}>
              {renderIcon(module.moduleIcon, module.moduleColor)}
              </OptionModule>)
          ))}
		</nav>
      </div>
    </div>
  )
}

const OptionModule = ({module,isSidebarOpen, children}) => {
  return(
    <Link key={module.moduleRoute} to={`/${module.moduleRoute}`}>
      <div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
        {children}
        {isSidebarOpen && (
          <span className="ml-4 whitespace-nowrap">{module.moduleName}</span>
        )}
      </div>
    </Link>
  )
}

export default Sidebar