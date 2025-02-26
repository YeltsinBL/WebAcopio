import { ticketSave } from '~services/ticket'
import { TicketAdapterAnular } from '../adapter/TicketAdapter'
import { Footer, FooterButton, ModalDelete } from '~components/common'
import { toast } from 'sonner'

export const TicketFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async (e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const resp = await ticketSave('DELETE',TicketAdapterAnular(data))
    if(resp.result) {
      toast.success(resp.message, {id: toastLoadingCustom})
      return onShowModel(resp)
    }
    toast.error(resp.message, {id: toastLoadingCustom, style: { color:'red' }})
    return sendDataDismissModel()
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    sendDataDismissModel()
  }
  const sendDataDismissModel = () => {
    onShowModel({result:false})
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
