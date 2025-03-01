import { Route } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import { RoutesWithNotFound } from "../../utils"
import { lazy } from "react"
import { RoleGuard } from "../../guards"

const HomePage = lazy(() => import('./HomePage'))
const UserPage = lazy(() => import('./user/UserPage'))
const TipoUsuarioPage = lazy(() => import('./tipoUsuario/TipoUsuarioPage'))
const ProveedorPage  = lazy(() => import('./proveedor/ProveedorPage'))
const TierrasPage = lazy(() => import ('./tierras/TierrasPage'))
const AsignarTierraPage = lazy(() => import ('./asignatierra/AsignarTierraPage'))
const CosechaPage = lazy(() => import ('./cosecha/CosechaPage'))
const TicketPage = lazy(() => import ('./ticket/TicketPage'))
const CortePage = lazy(() => import ('./corte/CortePage'))
const CarguilloPage = lazy(() => import ('./carguillo/CarguilloPage'))
const RecojoPage = lazy(() => import ('./recojo/RecojoPage'))
const ServicioTransportePage = lazy(() => import ('./serviciotransporte/ServicioTransportePage'))
const LiquidacionPage = lazy(() => import ('./liquidacion/LiquidacionPage'))
const TesoreriaPage = lazy(() => import ('./tesoreria/TesoreriaPage'))
const ServicioPaleroPage = lazy(() => import('./serviciopalero/ServicioPaleroPage'))
const ReporteMasivoPage = lazy(() => import('./reportemasivo/ReporteMasivoPage'))

const ProdutoPage = lazy(() => import('./producto/ProductoPage'))
const DistribuidorPage = lazy(() => import('./distribuidor/DistribuidorPage'))
const CompraPage = lazy(() => import('./compra/CompraPage'))
const VentaPage = lazy(() => import('./venta/VentaPage'))
const InformeIngresoGastoPage = lazy(() => import('./informeingresogasto/InformeIngresoGastoPage'))
const PagoIngreso = lazy(() => import('./facturaventa/FacturaVentaPage'))
const Cliente = lazy(() => import('./cliente/ClientePage'))
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
        <Route path='/liquidacionpago' element={<TesoreriaPage />} />
        <Route path='/serviciopalero' element={<ServicioPaleroPage />} />
        <Route path='/reportemasivo' element={<ReporteMasivoPage />} />
        <Route path='/producto' element={<ProdutoPage />} />
        <Route path='/distribuidor' element={<DistribuidorPage />} />
        <Route path='/compra' element={<CompraPage />} />
        <Route path='/venta' element={<VentaPage />} />
        <Route path='/informe' element={<InformeIngresoGastoPage />} />
        <Route path='/pagoingreso' element={<PagoIngreso />} />
        <Route path='/cliente' element={<Cliente />} />
        </Route>
      </RoutesWithNotFound>
    </>
  )
}
export default PrivateRoute