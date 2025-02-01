import { 
  Footer, FooterButton, ModalDelete 
} from "~components/common"
import { productoSave } from "~services/producto"
import { productoAdapterChangeStatus } from "../adapter/ProductoAdapter"
import { ServicesResponseAdapter } from "~/adapters/ServicesResponseAdapter"

export const ProductoFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    let dataAdapter = productoAdapterChangeStatus( data )
    const servicio = await productoSave('DELETE', dataAdapter )
    if (servicio.result) 
      return sendDataDismissModel(ServicesResponseAdapter(servicio))
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
    <ModalDelete title={'Desactivar Producto'} 
      message={`¿Estás seguro que desea desactivar al producto: ${data.productoNombre}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Desactivar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}