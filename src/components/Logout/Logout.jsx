import { ButtonCustom } from "~components/common"
import { LogOutSession } from "~hooks/common"

export const Logout = () => {
  const logOut = LogOutSession()
  return (
    <ButtonCustom
      extraClassName={' '}
      name={'Cerrar Sesión'}
      onClick={logOut}
     />
  )
}