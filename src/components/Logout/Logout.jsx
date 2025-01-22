import { ButtonCustom } from "~components/common"
import { useLogOutSession } from "~hooks/common"

export const Logout = () => {
  const logOut = useLogOutSession()
  return (
    <ButtonCustom
      extraClassName={' '}
      name={'Cerrar Sesión'}
      onClick={logOut}
     />
  )
}