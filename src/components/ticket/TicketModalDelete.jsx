import { ticketDelete } from '../../services/ticket'
import { Footer, FooterButton, ModalDelete, obtenerFechaLocal } from '../common'

export const TicketModalDelete = ({onShowModel, data}) => {
  const handleGuardar = async (e) => {
    e.preventDefault()
    const resp = await ticketDelete({
      id:data,
      userModifiedName: "ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    })
    if(resp) return sendDataDismissModel(data)
    return sendDataDismissModel(0)
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    sendDataDismissModel(0)
  }
  const sendDataDismissModel = (valor) => {
    onShowModel({id:valor})
  }
  return (
    <ModalDelete title={"Eliminar Ticker"} message={"¿Estás seguro(a) que deseas eliminar el ticket?"}>
      <Footer>
        <FooterButton accion={handleGuardar} name={"Eliminar"}/>
        <FooterButton accion={handleCancelar} name={"Cancelar"}/>
      </Footer>
    </ModalDelete> 
  )
}
