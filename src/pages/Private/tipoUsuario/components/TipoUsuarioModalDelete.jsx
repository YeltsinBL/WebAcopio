import { 
  Footer, FooterButton, ModalDelete
} from "../../../../components/common"
import { typeUserSave } from "../../../../services/tipousuario"
import { obtenerFechaLocal } from "../../../../utils"

export const TipoUsuarioModalDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const tipo={
      tipoUsuarioId: data.tipoUsuarioId,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const servicio = await typeUserSave('DELETE', tipo )
    if (servicio) return sendDataDismissModel(data.tipoUsuarioId)
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
    <ModalDelete title={'Eliminar Tipo Usuario'} 
      message={`¿Estás seguro que desea eliminar al tipo de usuario: ${data.tipoUsuarioNombre}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}