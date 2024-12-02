import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import TicketFilter from '../components/ticket/ticketFilter'
import TicketTable from '../components/ticket/TicketTable'
import { TICKET_DATA } from '../components/mocks/DataList'
import Footer from '../components/common/Footer'
import FooterButton from '../components/common/FooterButton'

const TicketPage = () => {
  const [listTicket, setListTicket] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getTickets()
  }, [])
  const getTickets = () => {
    setListTicket(TICKET_DATA || [])
  }
  const handleGoBack = () => {
    navigate('/')
  }
  const handleDataFromChild = (data) => {
    const {
        ingenio, transportista, viaje, fechaDesde, fechaHasta, estado
    } = data
    console.log(ingenio=='', transportista=='', viaje=='', fechaDesde=='', fechaHasta=='', estado=='')
    if(ingenio=='' & transportista=='' & viaje=='' & fechaDesde=='' & fechaHasta=='' & estado==''){
      return getTickets()
    }
    const filtered = TICKET_DATA.filter((product) => {
      const matchesIngenio = ingenio ? product.ingenio.toLowerCase().includes(ingenio.toLowerCase()) : true
      const matchesTransportista = transportista ? product.transportista.toLowerCase().includes(transportista.toLowerCase()) : true
      const matchesViaje = viaje ? product.viaje.toLowerCase().includes(viaje.toLowerCase()) : true
      const matchesFechaDesde = fechaDesde ? product.fecha >= new Date(fechaDesde) : true
      const matchesFechaHasta = fechaHasta ? product.fecha <= new Date(fechaHasta) : true
      const matchesEstado = estado ? product.estado.toLowerCase().includes(estado.toLowerCase()) : true
  
      // Devuelve verdadero si el producto coincide con todos los filtros aplicados
      return matchesIngenio && matchesTransportista && matchesViaje
        && matchesFechaDesde && matchesFechaHasta && matchesEstado
    })
    setListTicket(filtered)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Tickets'/>
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <TicketFilter onFiltersValue={handleDataFromChild}/>
          <TicketTable TICKET_DATA={listTicket} />    
          <Footer>
            <button 
                className="bg-[#313395] text-white active:bg-gray-700 
                hover:bg-gray-500 font-bold uppercase text-sm px-4 py-2 rounded-lg"
                onClick={() =>({})}>
              Nuevo
            </button>
            <FooterButton accion={handleGoBack} name={"Salir"}/>
          </Footer>
        </main>
    </div>
  )
}

export default TicketPage