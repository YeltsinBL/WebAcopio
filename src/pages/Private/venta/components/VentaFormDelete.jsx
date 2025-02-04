import { Footer, FooterButton, ModalDelete } from "~components/common"
import { ventaAdapterDelete } from "../adapter/VentaAdapter"
import { ventaSave } from "~services/venta"

export const VentaFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    let dataAdapter = ventaAdapterDelete( data )
    const servicio = await ventaSave('DELETE', dataAdapter )
    if (servicio.result) 
      return sendDataDismissModel(servicio)
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
    <ModalDelete title={'Anular Venta'} 
      message={`¿Estás seguro que deseas anular la venta: ${data.ventaNumeroDocumento}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Anular'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}