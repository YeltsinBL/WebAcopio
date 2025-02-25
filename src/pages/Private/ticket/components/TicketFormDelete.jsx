import { ticketSave } from '~services/ticket'
import { TicketAdapterAnular } from '../adapter/TicketAdapter'
import { Footer, FooterButton, ModalDelete } from '~components/common'

export const TicketFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async (e) => {
    e.preventDefault()
    const resp = await ticketSave('DELETE',TicketAdapterAnular(data))
    if(resp) return sendDataDismissModel(data.ticketId)
    return sendDataDismissModel(0)
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    sendDataDismissModel(0)
  }
  const sendDataDismissModel = (valor) => {
    onShowModel({ticketId:valor})
  }
  return (
    <ModalDelete title={"Eliminar Ticker"} message={`¿Estás seguro(a) que deseas eliminar el ticket: ${data.ticketCampo}-${data.ticketViaje}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={"Eliminar"}/>
        <FooterButton accion={handleCancelar} name={"Cancelar"}/>
      </Footer>
    </ModalDelete> 
  )
}
