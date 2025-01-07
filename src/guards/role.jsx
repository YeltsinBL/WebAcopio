import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const RoleGuard = () => {
  const location = useLocation()
  const moduleState = useSelector((store) => store.modules)
  const currentPath = location.pathname.replace("/", "").toLowerCase()
  const moduleExists = moduleState.includes(currentPath.toLowerCase())
  return moduleExists
    ? <Outlet /> : <Navigate replace to={'/'} />
}