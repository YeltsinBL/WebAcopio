import { 
  Footer, FooterButton, ModalDelete 
} from "~components/common"
import { distribuidorAdapterChangeStatus } from "../adapter/DistribuidorAdapter"
import { distribuidorSave } from "~services/distribuidor"
import { toast } from "sonner"

export const DistribuidorFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()    
    const toastLoadingCustom = toast.loading('Cargando...')
    let dataAdapter = distribuidorAdapterChangeStatus( data )
    const servicio = await distribuidorSave('DELETE', dataAdapter )
    if (servicio.result) {
      toast.success(servicio.message, {id: toastLoadingCustom})
      return sendDataDismissModel(servicio)
    }
    toast.error(servicio.message, {id: toastLoadingCustom, style: { color:'red' }})
    return sendDataDismissModel({result:false})
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel({result:false})
  }
  const sendDataDismissModel = (valor) => {
    onShowModel(valor)
  }
  return (
    <ModalDelete title={'Desactivar Distribuidor'} 
      message={`¿Estás seguro que desea desactivar al Distribuidor: ${data.distribuidorNombre}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Desactivar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}