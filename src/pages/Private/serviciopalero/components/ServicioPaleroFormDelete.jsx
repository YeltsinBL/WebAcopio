import { toast } from "sonner"
import { obtenerFechaLocal } from "~utils/index"
import { servicioPaleroSave } from "~services/servicio"
import { Footer, FooterButton, ModalDelete } from "~components/common"

export const ServicioPaleroFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const servicioDto={
      servicioId: data.servicioId,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const servicio = await servicioPaleroSave({ method:'DELETE', servicioPalero: servicioDto })
    if(!servicio.result) 
      return toast.error(servicio.message, { id: toastLoadingCustom, style: { color:'red' }})
    toast.success(servicio.message, {id: toastLoadingCustom})
    return sendDataDismissModel(servicio)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel({result:false})
  }
  const sendDataDismissModel = (valor) => onShowModel(valor)

  return (
    <ModalDelete title={'Eliminar Servicio Palero'} message={`¿Estás seguro(a) que deseas eliminar el Servicio Palero: ${data.servicioFecha} - ${data.servicioCarguilloTitular}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
