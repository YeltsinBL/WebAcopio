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
          toast.success(proveedor.message, {id: toastLoadingCustom})
          return onShowModel(proveedor)
        }
        return toast.error(proveedor.message, { id: toastLoadingCustom, style: { color:'red' }})
      }
      const handleCancelar = (e) => {
        e.preventDefault()
        return onShowModel({result:false})
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
