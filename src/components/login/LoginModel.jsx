import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { 
  FilterOption, Footer, FooterButton, MessageValidationInput, SectionModel 
} from "~components/common"
import { 
  AuthorizationLogIn, AuthorizationResetPassword, AuthorizationVerifyPassword 
} from "~services/authorization"
import { useClosePage } from "~hooks/common"
import { createUser, resetUser, UserKey } from "~redux/states/user"
import { clearModuleNames } from "~redux/states/modules"
import { Spinner } from "~assets/icons"
import { Eye, EyeOff } from "lucide-react"
import { clearLocalStorage } from "~utils/localStorage"
import { obtenerFechaLocal } from "~utils/index"

export const LoginModel = () => {
  
  const handleGoBack = useClosePage()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRef = useRef()
  //const errRef = useRef()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  //const [errMsg, setErrMsg] = useState('')
  const [errores, setErrores] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  useEffect(() => {
      userRef.current.focus();
      clearLocalStorage(UserKey)
      dispatch(resetUser())
      dispatch(clearModuleNames())
      navigate("/login", {replace: true})
  }, [])

  const togglePasswordVisibility = () => 
    setShowPassword(!showPassword)
  const toggleNewPasswordVisibility = () => 
    setShowNewPassword(!showNewPassword)
  
  const validation= () => {
    const nuevosErrores = {}
    if(!user) nuevosErrores.userName = 'El campo Usuario es obligatorio'
    if(!pwd) nuevosErrores.password = 'El campo Contraseña es obligatorio'
    if(changePassword && !newPassword) nuevosErrores.newPassword = 'El campo Nueva Contraseña es obligatorio'    
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(validation() && !changePassword){
      const verify = await AuthorizationVerifyPassword({userName: user, userPassword: pwd})
      if(verify) {        
        setLoading(false)
        return setChangePassword(verify)
      }
      const login = await AuthorizationLogIn({userName: user, userPassword: pwd})
      setLoading(false)
      if(login.resultado) {
        dispatch(createUser({...login}))
        return handleGoBack()
      }
      return setErrores({validate : login.error})
    }
    if(validation() && changePassword){
      const reset = await AuthorizationResetPassword({
          userName: user,
          userPassword: newPassword,
          userModifiedAt: obtenerFechaLocal({date: new Date()}),
          userModifiedName: user
      })
      if(reset) {
        setPwd('')
        setChangePassword(!reset)
      }
      setLoading(false)
      return
    }
  }

  return (    
    <div className="flex justify-center items-center h-full">
      <SectionModel title={'Iniciar Sesión'} >
      <div className='grid gap-4 pt-3'>
          <FilterOption htmlFor={'username'} name={'Usuario'}>
          <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 
                ${ errores.userName ? "border-red-500" : "" }
              `}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder={'Ingrese su Usuario'}
          />
          {errores.userName && <MessageValidationInput mensaje={errores.userName}/>}
          </FilterOption>
          <FilterOption htmlFor={'password'} name={'Contraseña'}>
            <InputFieldPassword
              type={showPassword ? "text" : "password"}
              id={'password'}
              value={pwd}
              setValue={setPwd}
              placeholder={'Ingrese su Contraseña'}
              valueError={errores.password}
            />
            <span className="absolute right-8  cursor-pointer"
              onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errores.password && <MessageValidationInput mensaje={errores.password}/>}
          </FilterOption>
          {changePassword && (
          <FilterOption htmlFor={'newPassword'} name={'Nueva Contraseña'}>
            <InputFieldPassword
              type={showNewPassword ? "text" : "password"}
              id={'newPassword'}
              value={newPassword}
              setValue={setNewPassword}
              placeholder={'ingrese su Nueva Contraseña'}
              valueError={errores.newPassword}
            />
            <span className="absolute right-8  cursor-pointer"
              onClick={toggleNewPasswordVisibility}>
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errores.newPassword && <MessageValidationInput mensaje={errores.newPassword}/>}
          </FilterOption>)}
          <div className='flex flex-col items-center gap-1 w-1/8'>
            {loading && <Spinner />}
          </div>
            {errores.validate && <MessageValidationInput mensaje={errores.validate}/>}
          <Footer>
          <FooterButton name={changePassword?'Reestablecer contraseña': 'Iniciar Sesión'} accion={handleSubmit} />
          </Footer>
      </div>
      </SectionModel>
    </div>   
  )
}

const InputFieldPassword = ({id, type, value, setValue, placeholder, valueError}) => {
    return (
        <input
            type={type}
            id={id}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 
              ${ valueError ? "border-red-500" : "" }
            `}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            required
            placeholder={placeholder}
        />
    )
}