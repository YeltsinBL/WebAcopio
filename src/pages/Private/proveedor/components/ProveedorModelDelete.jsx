import { toast } from "sonner"
import { 
  Footer, FooterButton, ModalDelete 
} from "~components/common"
import { proveedorSave } from "~services/proveedor"
import { obtenerFechaLocal } from "~utils/index"

export const ProveedorModelDelete = ({onShowModel, data}) => {
    const handleGuardar = async (e) => {
        e.preventDefault()
        const toastLoadingCustom = toast.loading('Cargando...')
        const proveedor = await proveedorSave('DELETE', {
          proveedorId:data.proveedorId,
          userModifiedName: "ADMIN",
          userModifiedAt: obtenerFechaLocal({date: new Date()})
        })
        if (proveedor.result) {
          setTimeout(() => {
            toast.dismiss(toastLoadingCustom)
          })
          return sendDataDismissModel(proveedor.data)
        }
        return toast.error(proveedor.errorMessage, { id: toastLoadingCustom, style: { color:'red' }})
      }
      const handleCancelar = (e) => {
        e.preventDefault()
        sendDataDismissModel(0)
      }
      const sendDataDismissModel = (valor) => {
        onShowModel({id:valor})
      }
  return (
    <ModalDelete title={'Desactivar Proveedor'}
      message={`¿Estás seguro(a) que desea desactivar al proveedor: ${data.proveedorUT}?`}>
      <Footer>
        <FooterButton accion={handleGuardar} name={'Eliminar'} />
        <FooterButton accion={handleCancelar} name={'Cancelar'}/>
      </Footer>
    </ModalDelete>
  )
}
