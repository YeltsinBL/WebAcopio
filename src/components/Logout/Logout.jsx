import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearLocalStorage } from "../../utils"
import { resetUser, UserKey } from "../../redux/states/user"
import { ButtonCustom } from "../common"

export const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOut = () => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate('login', {replace:true})
  }
  return (
    <ButtonCustom 
      extraClassName={' '}
      name={'Cerrar Sesión'}
      onClick={logOut}
     />
  )
}