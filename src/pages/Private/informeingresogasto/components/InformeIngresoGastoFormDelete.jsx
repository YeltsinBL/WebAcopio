import { toast } from "sonner"
import { informeSave } from "~services/informe"
import { 
  InformeIngresoGastoAdapterAnular 
} from "../adapter/InformeIngresoGastoAdapter"
import { Footer, FooterButton, ModalDelete } from "~components/common"

export const InformeIngresoGastoFormDelete = ({onShowModel, data}) => {
  const handleGuardar = async(e)=>{
    e.preventDefault()    
    const toastLoadingCustom = toast.loading('Cargando...')
    let dataAdapter = InformeIngresoGastoAdapterAnular( data )
    const servicio = await informeSave('DELETE', dataAdapter )
    if (!servicio.result) 
      toast.error(servicio.message, {id: toastLoadingCustom, style: { color:'red' }})
    else toast.success(servicio.message, {id: toastLoadingCustom})
    return sendDataDismissModel(servicio)
  }
  const handleCancelar =(e)=>{
    e.preventDefault()
    sendDataDismissModel({result:false})
  }
  const sendDataDismissModel = (valor) => {
    onShowModel(valor)
  }
  return (
    <ModalDelete title={'Anular Informe de Ingresos y Gastos'} 
      message={`¿Estás seguro que desea anular el informe de: ${data.personaNombre}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Anular'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}