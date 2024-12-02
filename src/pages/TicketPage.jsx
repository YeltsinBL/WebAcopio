import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import TicketFilter from '../components/ticket/ticketFilter'
import TicketTable from '../components/ticket/TicketTable'
import { TICKET_DATA } from '../components/mocks/DataList'
import Footer from '../components/common/Footer'
import FooterButton from '../components/common/FooterButton'
import TicketModel from '../components/ticket/TicketModel'

const TicketPage = () => {
  const [listTicket, setListTicket] = useState([])
  const navigate = useNavigate()
  /* Model */
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)

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
  const handleRowSelect = async(rowData) => {
    setSelectedRowData(rowData)
    setShowModel(false)
  }
  const handleShowModel = (data) => {
    if(data.id==0) return setShowModel(true)
    data.fecha = new Date(`${data.fecha}T00:00:00`) // Formatear Fecha
    const existingIndex = listTicket.findIndex((item) => item.id === data.id)
    if (existingIndex >= 0) {
      // Reemplazar datos si el ID existe
      const updatedList = [...listTicket]
      updatedList[existingIndex] = data
      setListTicket(updatedList)
    } else {
      setListTicket([...listTicket, data])
    }
    setShowModel(true)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Tickets'/>
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {showModel ?
          <>
            <TicketFilter onFiltersValue={handleDataFromChild}/>
            <TicketTable TICKET_DATA={listTicket} />    
            <Footer>
              <FooterButton accion={handleRowSelect} name={"Nuevo"}/>
              <FooterButton accion={handleGoBack} name={"Salir"}/>
            </Footer>
          </>:
          <>
            <TicketModel onShowModel={handleShowModel} data={selectedRowData}/>
          </>
        }          
        </main>
    </div>
  )
}

export default TicketPage