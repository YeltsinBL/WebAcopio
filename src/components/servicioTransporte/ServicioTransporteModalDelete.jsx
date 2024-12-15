import { servicioTransporteSave } from "../../services/serviciotransporte"
import { obtenerFechaLocal } from "../../utils"
import { Footer, FooterButton, ModalDelete } from "../common"

export const ServicioTransporteModalDelete = ({onShowModel, id}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const servicioDto={
      servicioTransporteId: id,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const servicio = await servicioTransporteSave({ method:'DELETE', servicioTransporte: servicioDto })
    if (servicio) return sendDataDismissModel(id)
    return sendDataDismissModel(0)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel(0)
  }
  const sendDataDismissModel = (valor) => {
    onShowModel(valor)
  }
  return (
    <ModalDelete title={'Eliminar Servicio Transporte'} message={'¿Estás seguro(a) que deseas eliminar el Servicio Transporte?'}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
