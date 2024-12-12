import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer, FooterButton, Header } from '../components/common'
import { searchTickets, ticketGetById } from '../services/ticket'
import { TicketFilter, TicketModalDelete, TicketModel, TicketTable } from '../components/ticket'

export const TicketPage = () => {
  const [listTicket, setListTicket] = useState([])
  const navigate = useNavigate()
  /* Model */
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [idModalDelete, setIdModalDelete] = useState(0)

  useEffect(() => {
    getTickets()
  }, [])
  const getTickets = async(filter) => {
    const tickets = await searchTickets(filter)
    setListTicket(tickets|| [])
  }
  const handleGoBack = () => {
    navigate('/')
  }
  // Listado Filtro
  const handleDataFromChild = (data) => {
    const {
        ingenio, transportista, viaje, fechaDesde, fechaHasta, estado
    } = data
    if(ingenio=='' && transportista=='' && viaje=='' && fechaDesde=='' && fechaHasta=='' && estado==''){
      return getTickets()
    }
    return getTickets({ingenio, transportista, viaje, fechaDesde, fechaHasta, estado})
  }
  // Obtener
  const handleRowSelect = async(rowData) => {
    if(rowData.id != null){
      const ticket = await ticketGetById({id:rowData.id})
      setSelectedRowData(ticket)
    }else setSelectedRowData(rowData)  
    setShowModel(false)
  }
  // Guardar
  const handleShowModel = (data) => {
    if(data.id==0) return setShowModel(true)
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
  // Eliminar
  const eliminarTicket = (id) => {
    setIdModalDelete(id)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.id > 0) setListTicket(listTicket.filter(producto => producto.id !== data.id))
    setShowModalDelete(false)
  }
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Tickets'/>
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {showModel ?
          <>
            <TicketFilter onFiltersValue={handleDataFromChild}/>
            <TicketTable TICKET_DATA={listTicket} onRowSelect={handleRowSelect} onDeleteSelect={eliminarTicket} />    
            <Footer>
              <FooterButton accion={handleRowSelect} name={"Nuevo"}/>
              <FooterButton accion={handleGoBack} name={"Salir"}/>
            </Footer>
          </>:
          <>
            <TicketModel onShowModel={handleShowModel} data={selectedRowData}/>
          </>
        }       
        {showModalDelete ? <TicketModalDelete onShowModel={handleShowModelDelete} data={idModalDelete}/> : ''}
        </main>
    </div>
  )
}
