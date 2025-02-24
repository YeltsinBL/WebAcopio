import { toast } from "sonner"
import { servicioTransporteSave } from "~services/servicio"
import { Footer, FooterButton, ModalDelete } from "~components/common"
import { obtenerFechaLocal } from "~utils/index"

export const ServicioTransporteModalDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const servicioDto={
      servicioId: data.servicioId,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const servicio = await servicioTransporteSave({ method:'DELETE', servicioTransporte: servicioDto })
    if (!servicio.result) 
      return toast.error(servicio.message, { id: toastLoadingCustom, style: { color:'red' }})
    toast.success(servicio.message, {id: toastLoadingCustom})
    return sendDataDismissModel(servicio)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel({result:false})
  }
  const sendDataDismissModel = (valor) => {
    onShowModel(valor)
  }
  return (
    <ModalDelete title={'Anular Servicio Transporte'} message={`¿Estás seguro(a) que deseas anular el Servicio Transporte: ${data.servicioFecha} - ${data.servicioCarguilloTitular}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Anular'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
