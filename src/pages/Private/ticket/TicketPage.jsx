import { useEffect, useState } from 'react'
import { useClosePage } from '~hooks/common'
import { 
  TicketFilter, TicketFormDelete, TicketForm, TicketTable 
} from './components'
import { obtenerFechaInicialMes, obtenerSoloFechaLocal } from '~utils/index'
import { searchTickets, ticketGetById } from '~services/ticket'
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main
} from '~components/common'

const TicketPage = () => {
  const handleGoBack = useClosePage()
  const [listTicket, setListTicket] = useState([])
  /* Model */
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [modalDelete, setModalDelete] = useState({})

  useEffect(() => {
    getTickets({})
  }, [])
  const getTickets = async({
    ingenio='', transportista='', viaje='',
    fechaDesde=obtenerFechaInicialMes(), 
    fechaHasta=obtenerSoloFechaLocal({date: new Date()}), estado='',
  }) => {
    const tickets = await searchTickets({
      ingenio, transportista, viaje, fechaDesde,
      fechaHasta, estado
    })
    setListTicket(tickets|| [])
  }

  // Listado Filtro
  const handleDataFromChild = (data) => getTickets(data)

  // Obtener
  const handleRowSelect = async(rowData) => {
    if(rowData.ticketId != null){
      const ticket = await ticketGetById({id:rowData.ticketId})
      setSelectedRowData(ticket)
    }else setSelectedRowData(null)  
    setShowModel(false)
  }
  // Guardar
  const handleShowModel = (data) => {
    if(data.ticketId>0) getTickets({})
    setShowModel(true)
  }
  // Eliminar
  const eliminarTicket = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.ticketId > 0) getTickets({})
    setShowModalDelete(false)
  }
  return (
    <ContainerPageCustom>
      <Header title='Tickets'/>
      <Main>
      {showModel ?
        <>
          <TicketFilter onFiltersValue={handleDataFromChild}/>
          <TicketTable TICKET_DATA={listTicket} onRowSelect={handleRowSelect} onDeleteSelect={eliminarTicket} />    
          <Footer>
            <FooterButton accion={handleRowSelect} name={"Nuevo"}/>
            <FooterButton accion={handleGoBack} name={"Salir"}/>
          </Footer>
        </>:
        <TicketForm onShowModel={handleShowModel} data={selectedRowData}/>        
      }       
      {showModalDelete ? <TicketFormDelete onShowModel={handleShowModelDelete} data={modalDelete}/> : ''}
      </Main>
    </ContainerPageCustom>
  )
}
export default TicketPage