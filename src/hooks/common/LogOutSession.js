import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetUser, UserKey } from '~redux/states/user'
import { clearLocalStorage } from '~utils/localStorage'

export const LogOutSession = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return () => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate('login', {replace:true})
  }
}
