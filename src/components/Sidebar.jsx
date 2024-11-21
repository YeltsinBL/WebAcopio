import { BarChart2, Home, MapIcon, Menu, RadarIcon, Users } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const SIDEBAR_ITEMS = [
    {
        name:"Principal", icon:Home, color:"#6366f1", href:"/"
    },
    {
        name:"Proveedor", icon:Users, color:"#6366f1", href:"/proveedor"
    },
    {
        name:"Tierras", icon:MapIcon, color:"#6366f1", href:"/tierras"
    },
    {
        name:"Asignar Tierras", icon:RadarIcon, color:"#6366f1", href:"/asignartierra"
    },
    {
        name:"Cosecha", icon:BarChart2, color:"#6366f1", href:"/cosecha"
    }

]
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								{isSidebarOpen && (
									<span className='ml-4 whitespace-nowrap' >
										{item.name}
									</span>
								)}
							</div>
						</Link>
					))}
				</nav>
        </div>

    </div>
  )
}

export default Sidebar