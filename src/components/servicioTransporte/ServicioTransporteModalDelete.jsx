import { servicioTransporteSave } from "~services/servicio"
import { Footer, FooterButton, ModalDelete } from "~components/common"
import { obtenerFechaLocal } from "~utils/index"

export const ServicioTransporteModalDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const servicioDto={
      servicioId: data.servicioId,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const servicio = await servicioTransporteSave({ method:'DELETE', servicioTransporte: servicioDto })
    if (servicio) return sendDataDismissModel(data.servicioId)
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
    <ModalDelete title={'Eliminar Servicio Transporte'} message={`¿Estás seguro(a) que deseas eliminar el Servicio Transporte: ${data.servicioFecha} - ${data.servicioCarguilloTitular}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
