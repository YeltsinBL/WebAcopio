import { asignaTierraSave } from "~services/asignartierra"
import { AsignaTierraAdapterDelete } from "../adapter/AsignarTierraAdapter"
import { Footer, FooterButton, ModalDelete } from "~components/common"

export const AsignaTierraFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e) => {
    e.preventDefault()
    const asigna = await asignaTierraSave('DELETE',AsignaTierraAdapterDelete(data))
    if(asigna) return sendDataDismissModel(data.asignarTierraId)
    return sendDataDismissModel(0)
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    sendDataDismissModel(0)
  }
  const sendDataDismissModel = (valor) => {
    onShowModel({asignarTierraId:valor})
  }
  return (
    <ModalDelete title={'Eliminar la Asignación de Tierra'} 
      message={`¿Estás seguro(a) que deseas eliminar la Asignación de Tierra: UC-${data.asignarTierraTierraUC}/UT-${data.asignarTierraProveedorUT}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
