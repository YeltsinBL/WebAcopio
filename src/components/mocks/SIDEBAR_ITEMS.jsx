import { AlignHorizontalDistributeCenter, Banknote, BarChart2, Bus, BusIcon, Home, MapIcon, RadarIcon, Sheet, TicketCheck, Users } from "lucide-react"
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
    { 
      name: "Carguillo", 
      href: "/carguillo", 
      icon: Bus, 
      color: "#6366f1" 
    },
    { 
      name: "Ticket", 
      href: "/ticket", 
      icon: TicketCheck, 
      color: "#6366f1" 
    },
    { 
      name: "Corte", 
      href: "/corte", 
      icon: AlignHorizontalDistributeCenter, 
      color: "#6366f1" 
    },
    { 
      name: "Recojo", 
      href: "/recojo", 
      icon: Sheet, 
      color: "#6366f1" 
    },
    { 
      name: "Servicio Transporte", 
      href: "/serviciotransporte", 
      icon: BusIcon, 
      color: "#6366f1" 
    },
    { 
      name: "Liquidación", 
      href: "/liquidacion", 
      icon: Banknote, 
      color: "#6366f1" 
    },
    // { 
    //   name: "Reportes", 
    //   href: "/reports", 
    //   icon: BarChart2, 
    //   color: "#6366f1" 
    // },
  ];