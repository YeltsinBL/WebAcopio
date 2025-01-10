import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from '../../../components/common'
import { 
  TicketFilter, TicketFormDelete, TicketForm, TicketTable 
} from './components'
import { searchTickets, ticketGetById } from '../../../services/ticket'
import { convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimal } from '../../../utils'

const TicketPage = () => {
  const [listTicket, setListTicket] = useState([])
  const navigate = useNavigate()
  /* Model */
  const [showModel, setShowModel] = useState(true)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [modalDelete, setModalDelete] = useState({})

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
    if(rowData.ticketId != null){
      const ticket = await ticketGetById({id:rowData.ticketId})
      setSelectedRowData(ticket)
    }else setSelectedRowData(null)  
    setShowModel(false)
  }
  // Guardar
  const handleShowModel = (data) => {
    if(data.ticketId>0) getTickets()
    setShowModel(true)
  }
  // Eliminar
  const eliminarTicket = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.ticketId > 0) getTickets()
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