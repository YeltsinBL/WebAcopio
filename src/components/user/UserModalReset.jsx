import { AuthorizationActivateResetPassword } from "../../services/authorization"
import { Footer, FooterButton, ModalDelete } from "../common"

export const UserModalReset = ({onShowModel, data}) => {
  const handleGuardar =async(e)=>{
    e.preventDefault()
    const rest = await AuthorizationActivateResetPassword(data.userId)
    if(rest) return sendDataDismissModel(data.userId)
    return sendDataDismissModel(0)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel(0)
  }
  const sendDataDismissModel = (valor) => {
    onShowModel({id:valor})
  }
  return (
    <ModalDelete title={"Reestablecer Contraseña"} message={`¿Estás seguro(a) de reestablecer la contraseña del usuario: ${data.userName}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Reestablecer'}/>
        <FooterButton accion={handleCancelar} name={"Cancelar"}/>
      </Footer>
    </ModalDelete> 
  )
}
