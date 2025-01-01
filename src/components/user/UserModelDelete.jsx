import { userSave } from "../../services/user";
import { obtenerFechaLocal } from "../../utils";
import { Footer, FooterButton, ModalDelete } from "../common";

export default function UserModelDelete({onShowModel, data}) {
    console.log(data)
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const usuario={
      userId: data.userId,
      userModifiedAt : obtenerFechaLocal({date: new Date()}),
      userModifiedName: "ADMIN"
    }
    const servicio = await userSave('DELETE', usuario )
    if (servicio) return sendDataDismissModel(data.userId)
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
    <ModalDelete title={'Eliminar Usuario'} 
      message={`¿Estás seguro que desea eliminar al usuario: ${data.userName}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}