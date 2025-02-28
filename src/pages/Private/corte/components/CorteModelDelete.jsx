import { toast } from "sonner"
import { 
  Footer, FooterButton, ModalDelete 
} from "~components/common"
import { corteDelete } from "~services/corte"
import { corteAdapterDelete } from "../adapter/CorteAdapter"

export const CorteModelDelete = ({onShowModel, data}) => {
  const handleGuardar =async(e)=>{
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const corte = await corteDelete('DELETE', corteAdapterDelete(data))
    if(!corte.result) 
      return toast.error(corte.message, { id: toastLoadingCustom, style: { color:'red' }})
    toast.success(corte.message, {id: toastLoadingCustom})
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
    <ModalDelete title={"Eliminar Corte"} message={"¿Estás seguro(a) que deseas eliminar el corte?"}>
      <Footer>
        <FooterButton accion={handleGuardar} name={"Eliminar"}/>
        <FooterButton accion={handleCancelar} name={"Cancelar"}/>
      </Footer>
    </ModalDelete> 
  )
}
