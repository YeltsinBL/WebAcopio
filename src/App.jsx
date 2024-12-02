import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProveedorPage from "./pages/ProveedorPage"
import TierrasPage from "./pages/TierrasPage"
import AsignarTierraPage from "./pages/AsignarTierraPage"
import CosechaPage from "./pages/CosechaPage"
import Sidebar from "./components/Sidebar"
import TicketPage from "./pages/TicketPage"

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
      </Routes>
    </div>
  )
}

export default App
