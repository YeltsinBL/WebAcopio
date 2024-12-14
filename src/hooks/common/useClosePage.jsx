import { useNavigate } from "react-router-dom"

export function useClosePage  () {
    const navigate = useNavigate()
    const handleGoBack= ()=>{
      navigate('/')
    }
    return handleGoBack
  }