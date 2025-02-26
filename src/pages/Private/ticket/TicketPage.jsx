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
import { TicketAdapterGetData } from './adapter/TicketAdapter'
import { toast, Toaster } from 'sonner'
import { TicketAdapterList } from '~/adapters/AdapterTicket'

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
    const toastLoadingCustom = toast.loading('Cargando...')
    const tickets = await searchTickets({
      ingenio, transportista, viaje, fechaDesde,
      fechaHasta, estado
    })
    if(tickets.result === false)
      return toast.error(tickets.message, {id: toastLoadingCustom, style: { color:'red' }})
    toast.success(tickets.message, {id: toastLoadingCustom})
    setListTicket(TicketAdapterList(tickets.data)|| [])
  }

  // Listado Filtro
  const handleDataFromChild = (data) => getTickets(data)

  // Obtener
  const handleRowSelect = async(rowData) => {
    if(rowData.ticketId != null){
      const toastLoadingCustom = toast.loading('Cargando...')
      const ticket = await ticketGetById({id:rowData.ticketId})
      if(ticket.result === false)
        return toast.error(ticket.message, {id: toastLoadingCustom, style: { color:'red' }})
      toast.success(ticket.message, {id: toastLoadingCustom})
      setSelectedRowData(TicketAdapterGetData(ticket.data))
    }else setSelectedRowData(null)  
    setShowModel(false)
  }
  // Guardar
  const handleShowModel = (data) => {
    if(data.result) getTickets({})
    setShowModel(true)
  }
  // Eliminar
  const eliminarTicket = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getTickets({})
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
      <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default TicketPage