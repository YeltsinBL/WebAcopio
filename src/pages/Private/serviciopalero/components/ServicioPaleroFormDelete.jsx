import { obtenerFechaLocal } from "~utils/index"
import { servicioPaleroSave } from "~services/servicio"
import { Footer, FooterButton, ModalDelete } from "~components/common"

export const ServicioPaleroFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const servicioDto={
      servicioId: data.servicioTransporteId,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const servicio = await servicioPaleroSave({ method:'DELETE', servicioPalero: servicioDto })
    if (servicio) return sendDataDismissModel(data.servicioTransporteId)
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
    <ModalDelete title={'Eliminar Servicio Palero'} message={`¿Estás seguro(a) que deseas eliminar el Servicio Palero: ${data.servicioTransporteFecha} - ${data.servicioTransporteCarguilloTitular}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
