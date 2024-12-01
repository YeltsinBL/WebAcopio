import { Menu } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom"
import { SIDEBAR_ITEMS } from "./mocks/SIDEBAR_ITEMS";


const Sidebar = () => {
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
            <nav className='mt-8 flex-grow'>
                {SIDEBAR_ITEMS.map((item, index) =>
                    // Si el item tiene un grupo, renderizar como un grupo
                    item.group ? (
                    <div key={index} className="mb-4">
                        {/* Cabecera del grupo */}
                        <div
                        // className="flex justify-between items-center px-4 py-2 text-gray-400 text-xs uppercase cursor-pointer hover:text-white"
                        className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                        onClick={() => toggleGroup(item.group)}
                        >
                            <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                            {isSidebarOpen && (
                                <>
                                    <span className="ml-4 whitespace-nowrap pr-3">{item.group}</span>
                                    <span>{expandedGroups[item.group] ? "▲" : "▼"}</span>
                                </>
                            )}
                        </div>
                        {/* Items del grupo */}
                        {expandedGroups[item.group] && (
                        <div>
                            {item.items.map((subItem) => (
                            <Link key={subItem.href} to={subItem.href}>
                                <div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                                <subItem.icon size={20} style={{ color: subItem.color, minWidth: "20px" }} />
                                {isSidebarOpen && (
                                    <span className="ml-4 whitespace-nowrap">{subItem.name}</span>
                                )}
                                </div>
                            </Link>
                            ))}
                        </div>
                        )}
                    </div>
                    ) : (
                    // Si el item no tiene un grupo, renderizarlo como item independiente
                    <Link key={item.href} to={item.href}>
                        <div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                        {isSidebarOpen && (
                            <span className="ml-4 whitespace-nowrap">{item.name}</span>
                        )}
                        </div>
                    </Link>
                    )
                )}
			</nav>
        </div>

    </div>
  )
}

export default Sidebar