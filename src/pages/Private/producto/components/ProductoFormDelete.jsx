import { 
  Footer, FooterButton, ModalDelete 
} from "~components/common"
import { productoSave } from "~services/producto"
import { productoAdapterChangeStatus } from "../adapter/ProductoAdapter"
import { toast } from "sonner"

export const ProductoFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()    
    const toastLoadingCustom = toast.loading('Cargando...')
    let dataAdapter = productoAdapterChangeStatus( data )
    const servicio = await productoSave('DELETE', dataAdapter )
    if (!servicio.result) 
      toast.error(servicio.message, {id: toastLoadingCustom, style: { color:'red' }})
    else toast.success(servicio.message, {id: toastLoadingCustom})
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
    <ModalDelete title={'Desactivar Producto'} 
      message={`¿Estás seguro que desea desactivar al producto: ${data.productoNombre}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Desactivar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}