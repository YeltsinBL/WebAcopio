import { lazy, Suspense } from "react"
import { Provider } from "react-redux"
import { Route, BrowserRouter } from "react-router-dom"
import store from './redux/store.js'
import { RoutesWithNotFound } from "./utils"
import { AuthGuard } from "./guards"
import { Loading } from "./components/Loading/Loading"

const LoginPage = lazy(() => import('./pages/Login'))
const PrivateRoute = lazy(()=>  import('./pages/Private/PrivateRoute'))
function App() {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>

      {/*Background */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-900 opacity-80'/>
        <div className='absolute inset-0 backdrop-blur-sm'/>
      </div>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path='/login' element={<LoginPage />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route path="*" element={ <PrivateRoute /> }/>
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  )
}

export default App
