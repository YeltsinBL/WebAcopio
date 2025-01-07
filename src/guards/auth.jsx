import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const AuthGuard = ({privateValidation}) => {
  const userState = useSelector((store) => store.user)
  return userState?.resultado ? (
    privateValidation ? (
      <Outlet />
    ):(
      <Navigate replace to={"/"} />
    )
  ): (
    <Navigate replace to={'login'} />
  )
}