import { Route } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { RoutesWithNotFound } from "../../utils"
import { lazy } from "react"
import { RoleGuard } from "../../guards"

const HomePage = lazy(() => import('../HomePage'))
const UserPage = lazy(() => import('../UserPage'))
const TipoUsuarioPage = lazy(() => import('./tipoUsuario/TipoUsuarioPage'))
const ProveedorPage  = lazy(() => import('./proveedor/ProveedorPage'))
const TierrasPage = lazy(() => import ('../TierrasPage'))
const AsignarTierraPage = lazy(() => import ('../AsignarTierraPage'))
const CosechaPage = lazy(() => import ('../CosechaPage'))
const TicketPage = lazy(() => import ('../TicketPage'))
const CortePage = lazy(() => import ('../CortePage'))
const CarguilloPage = lazy(() => import ('../CarguilloPage'))
const RecojoPage = lazy(() => import ('../RecojoPage'))
const ServicioTransportePage = lazy(() => import ('../ServicioTransportePage'))
const LiquidacionPage = lazy(() => import ('../LiquidacionPage'))
const TesoreriaPage = lazy(() => import ('./tesoreria/TesoreriaPage'))
const PrivateRoute = () => {
  return (
    <>
      <Sidebar />
      <RoutesWithNotFound>
        <Route element={<RoleGuard />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/usuario' element={<UserPage />} />
        <Route path='/tipousuario' element={<TipoUsuarioPage />} />
        <Route path='/proveedor' element={<ProveedorPage />} />
        <Route path='/tierras' element={<TierrasPage />} />
        <Route path='/asignartierra' element={<AsignarTierraPage />} />
        <Route path='/cosecha' element={<CosechaPage />} />
        <Route path='/ticket' element={<TicketPage />} />
        <Route path='/corte' element={<CortePage />} />
        <Route path='/carguillo' element={<CarguilloPage />} />
        <Route path='/recojo' element={<RecojoPage />} />
        <Route path='/serviciotransporte' element={<ServicioTransportePage />} />
        <Route path='/liquidacion' element={<LiquidacionPage />} />
        <Route path='/tesoreria' element={<TesoreriaPage />} />
        </Route>
      </RoutesWithNotFound>
    </>
  )
}
export default PrivateRoute