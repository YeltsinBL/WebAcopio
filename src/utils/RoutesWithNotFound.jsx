import { Route, Routes } from "react-router-dom"
import { ContainerPageCustom, Header } from "../components/common"

export const RoutesWithNotFound = ({children}) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={
        <NotFoundPage />
        } />
    </Routes>
  )
}

const NotFoundPage =() => {
  return (
    <ContainerPageCustom>
      <Header title='Página no encontrada'/>
    </ContainerPageCustom>
  )
}