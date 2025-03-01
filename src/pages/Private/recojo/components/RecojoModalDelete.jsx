import { 
  Footer, FooterButton, ModalDelete 
} from '~components/common'
import { recojoSave } from '~services/recojo'
import { RecojoAdapterDelete } from '../adapter/RecojoAdapter'

export const RecojoModalDelete = ({onShowModel, id}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const recojo = await recojoSave({ method:'DELETE', recojo: RecojoAdapterDelete(id) })
    if (recojo) return sendDataDismissModel(id)
    return sendDataDismissModel(0)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel(0)
  }
  const sendDataDismissModel = (valor) => {
    onShowModel(valor)
  }
  return (
    <ModalDelete title={'Eliminar Recojo'} message={'¿Estás seguro(a) que deseas eliminar el recojo?'}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
