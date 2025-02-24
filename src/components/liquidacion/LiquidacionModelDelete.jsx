import { toast } from "sonner";
import { 
  Footer, FooterButton, ModalDelete 
} from "~components/common";
import { liquidacionSave } from "~services/liquidacion";
import { obtenerFechaLocal } from "~utils/index";

export function LiquidacionModelDelete({onShowModel, data}) {
  const handleGuardar = async (e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const proveedor = await liquidacionSave({
      method:'DELETE', 
      liquidacion:{
        liquidacionId: data.liquidacionId,
        userModifiedName: "ADMIN",
        userModifiedAt: obtenerFechaLocal({date: new Date()})
      }
    })
    if (!proveedor.result) 
      return toast.error(proveedor.message, { id: toastLoadingCustom, style: { color:'red' }})
    toast.success(proveedor.message, {id: toastLoadingCustom})
    return sendDataDismissModel(proveedor)
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    sendDataDismissModel({result:false})
  }
  const sendDataDismissModel = (valor) => {
    onShowModel(valor)
  }
  return (
    <ModalDelete title={'Anular Liquidación'}
      message={`¿Estás seguro(a) que desea anular la liquidación para: ${data.personaNombre}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}