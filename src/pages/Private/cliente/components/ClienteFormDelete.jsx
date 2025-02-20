import { toast } from "sonner"
import { Footer, FooterButton, ModalDelete } from "~components/common"
import { clienteAdapterChangeStatus } from "../adapter/ClienteAdapter"
import { clienteSave } from "~services/cliente"

export const ClienteFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()    
    const toastLoadingCustom = toast.loading('Cargando...')
    let dataAdapter = clienteAdapterChangeStatus( data )
    const servicio = await clienteSave('DELETE', dataAdapter )
    if (!servicio.result) {
      toast.error(servicio.message, {id: toastLoadingCustom, style: { color:'red' }})
      return sendDataDismissModel(servicio)
    }
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
    <ModalDelete title={'Desactivar Cliente'} 
      message={`¿Estás seguro que desea desactivar al cliente: ${data.clienteNombre}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Desactivar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}