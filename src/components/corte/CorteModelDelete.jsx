import { toast } from "sonner"
import { 
  Footer, FooterButton, ModalDelete 
} from "~components/common"
import { corteSave } from "~services/corte"
import { obtenerFechaLocal } from "~utils/index"

export const CorteModelDelete = ({onShowModel, data}) => {
  const handleGuardar =async(e)=>{
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const corte = await corteSave('DELETE', {
      corteId: data.corteId,
      userModifiedName: "ADMIN",
      userModifiedAt: obtenerFechaLocal({date: new Date()})
    })
    if(!corte.result) 
      return toast.error(corte.errorMessage, { id: toastLoadingCustom, style: { color:'red' }})
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
    sendDataDismissModel(corte)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel({result: false})
  }
  const sendDataDismissModel = (valor) => {
    onShowModel(valor)
  }
  return (
    <ModalDelete title={"Eliminar Ticker"} message={"¿Estás seguro(a) que deseas eliminar el ticket?"}>
      <Footer>
        <FooterButton accion={handleGuardar} name={"Eliminar"}/>
        <FooterButton accion={handleCancelar} name={"Cancelar"}/>
      </Footer>
    </ModalDelete> 
  )
}
