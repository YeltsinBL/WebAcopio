import { Footer, FooterButton, ModalDelete } from '../common'
import { recojoSave } from '../../services/recojo'
import { obtenerFechaLocal } from '../../utils'

export const RecojoModalDelete = ({onShowModel, id}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const recojoDto={
      recojoId: id,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const recojo = await recojoSave({ method:'DELETE', recojo: recojoDto })
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