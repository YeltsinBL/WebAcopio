import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { 
  ContainerPageCustom, Footer, FooterButton, Header, Main 
} from "~components/common"
import { useClosePage } from "~hooks/common"
import { 
  ClienteFilter, ClienteFormDelete, ClienteTable 
} from "./components"
import { clienteAdapterList } from "./adapter/ClienteAdapter"
import { searchCliente } from "~services/cliente"

const ClientePage = () => {
  const handleGoBack = useClosePage()
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [modalDelete, setModalDelete] = useState({})
  const [clienteList, setclienteList] = useState([])

  useEffect(() => {
    getCliente({ nombre:'', estadoId:'' })
  }, [])
  const getCliente = async(filter) => {
    const clientes = await searchCliente(filter)
    setclienteList(clienteAdapterList(clientes)|| [])
  }

  const handleDataFromChild = (data) => getCliente(data)

  // Guardar
  const handleRowSelect = async(data) => {
    if(data.result) getCliente({ nombre:'', estadoId:'' })    
  }

  // Eliminar
  const eliminarTicket = (data) => {
    setModalDelete(data)
    setShowModalDelete(true)
  }
  const handleShowModelDelete = (data) =>{
    if(data.result) getCliente({ nombre:'', estadoId:'' })    
    setShowModalDelete(false)
  }

  return (
    <ContainerPageCustom>
      <Header title='Cliente'/>
      <Main>
        <ClienteFilter onClienteFilters={handleDataFromChild}/>
        <ClienteTable data={clienteList} onSave={handleRowSelect} onDelete={eliminarTicket} />    
        <Footer>
            <FooterButton accion={handleGoBack} name={"Salir"}/>
        </Footer>          
        {showModalDelete && <ClienteFormDelete onShowModel={handleShowModelDelete} data={modalDelete}/> }
        <Toaster />
      </Main>
    </ContainerPageCustom>
  )
}
export default ClientePage