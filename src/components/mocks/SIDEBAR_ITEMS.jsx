import { BarChart2, Home, MapIcon, RadarIcon, Users } from "lucide-react"
export const SIDEBAR_ITEMS = [
    {
        name:"Principal", icon:Home, color:"#6366f1", href:"/"
    },
    {
        name:"Proveedor", icon:Users, color:"#6366f1", href:"/proveedor"
    },
    {
      group: "Gestionar Tierra",
      icon:MapIcon,
      items: [
        {
            name:"Tierras", icon:MapIcon, color:"#6366f1", href:"/tierras"
        },
        {
            name:"Asignar Tierras", icon:RadarIcon, color:"#6366f1", href:"/asignartierra"
        },
      ],
    },
    {
        name:"Cosecha", icon:BarChart2, color:"#6366f1", href:"/cosecha"
    },
    // { 
    //   name: "Reportes", 
    //   href: "/reports", 
    //   icon: BarChart2, 
    //   color: "#6366f1" 
    // },
  ];