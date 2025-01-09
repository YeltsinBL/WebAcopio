import { 
  Footer, FooterButton, ModalDelete 
} from "../../../../components/common"
import { tierraSave } from "../../../../services/tierra"
import { obtenerFechaLocal } from "../../../../utils"

export const TierraFormDelete = ({onShowModel, data}) => {
    const handleGuardar = async(e) => {
      e.preventDefault()
      const tierra = await tierraSave('DELETE',{
        tierraId: data.tierraId,
        userModifiedName: "ADMIN",
        userModifiedAt: obtenerFechaLocal({date: new Date()})})
      if(tierra) return sendDataDismissModel(data.tierraId)
      return sendDataDismissModel(0)
    }
     const handleCancelar = (e) => {
      e.preventDefault()
      sendDataDismissModel(0)
    }
    const sendDataDismissModel = (valor) => {
      onShowModel({tierraId:valor})
    }
  return (
    <ModalDelete title={'Desactivar Tierra'} 
      message={`¿Estás seguro(a) que deseas desactivar la Tierra: ${data.tierraUc}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>      
    </ModalDelete>
  )
}
