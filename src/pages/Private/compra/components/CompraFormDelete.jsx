import { Footer, FooterButton, ModalDelete } from "~components/common"
import { compraSave } from "~services/compra"
import { compraAdapterDelete } from "../adapter/CompraAdapter"

export const CompraFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    let dataAdapter = compraAdapterDelete( data )
    const servicio = await compraSave('DELETE', dataAdapter )
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
    <ModalDelete title={'Anular Compra'} 
      message={`¿Estás seguro que deseas anular la Compra: ${data.compraNumeroComprobante}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Anular'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}