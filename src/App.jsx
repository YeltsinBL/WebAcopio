import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { AsignarTierraPage, CarguilloPage, CortePage, CosechaPage, 
  HomePage, ProveedorPage, RecojoPage, ServicioTransportePage, TicketPage, TierrasPage 
} from "./pages"

function App() {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>

      {/*Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-80'/>
        <div className='absolute inset-0 backdrop-blur-sm'/>
      </div>

      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/proveedor' element={<ProveedorPage />} />
        <Route path='/tierras' element={<TierrasPage />} />
        <Route path='/asignartierra' element={<AsignarTierraPage />} />
        <Route path='/cosecha' element={<CosechaPage />} />
        <Route path='/ticket' element={<TicketPage />} />
        <Route path='/corte' element={<CortePage />} />
        <Route path='/carguillo' element={<CarguilloPage />} />
        <Route path='/recojo' element={<RecojoPage />} />
        <Route path='/serviciotransporte' element={<ServicioTransportePage />} />
      </Routes>
    </div>
  )
}

export default App
