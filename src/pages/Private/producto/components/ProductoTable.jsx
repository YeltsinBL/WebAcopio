import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, FilterOption, InputDecimalCustom, InputTextCustom, MessageValidationInput, 
  NoRegistros, TableBodyCustom, TableButton, TableContainerCustom, 
  TableFooterCustom, TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { productoGetById, productoSave } from "~services/producto"
import { productoAdapterSave } from "../adapter/ProductoAdapter"
import { useInitialProducto, useValidationProducto } from "../hooks"
import { ServicesResponseAdapter } from "~/adapters/ServicesResponseAdapter"

export const ProductoTable = ({data, onSave, onDelete}) => {
  const header = ['Producto', 'Stock', 'Precio Venta', 'Activo', 'Acciones']
  const {
    productoId, setProductoId, 
    productoNombre, setProductoNombre, 
    productoPrecio,setProductoPrecio,
  } = useInitialProducto()
  const {validate, errores} = useValidationProducto()

  const handleCreateProduct = async(event) => {
    event.preventDefault()
    SaveProduct(0)
  }
  const handleUpdateProducto = async(event) => {
    event.preventDefault()
    SaveProduct(productoId)
  }
  const SaveProduct = async(id)=>{
    const toastLoadingCustom = toast.loading('Cargando...')
    const {isValid} = validate({productoNombre})
    if(isValid){
      let dataAdapter = productoAdapterSave({ 
        productoId:id, productoNombre, productoPrecio
      })
      const producto = await productoSave(id > 0 ?'PUT':'POST', dataAdapter)
      const response = ServicesResponseAdapter(producto)
      if(response.result === false) 
        return toast.error(response.errorMessage, {id: toastLoadingCustom, style: { color:'red' }})
      setProductoId(0)
      setProductoNombre('')
      setProductoPrecio(0)
      setTimeout(() => {
        toast.dismiss(toastLoadingCustom)
      })
      return onSave(ServicesResponseAdapter(producto))
    }    
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const onRowSelect = async(rowData) =>{
    if(rowData.productoId){
      const toastLoadingCustom = toast.loading('Cargando...')
      const producto = await productoGetById({id:rowData.productoId})
      const response = ServicesResponseAdapter(producto)
      if(response.result === false)
        return toast.error(response.errorMessage, {id: toastLoadingCustom, style: { color:'red' }})
      setProductoId(response.data.productoId)
      setProductoNombre(response.data.productoNombre)
      setProductoPrecio(response.data.productoPrecioVenta)
      toast.success(response.message, {id: toastLoadingCustom})
    }
  }

  return (
    <TableContainerCustom>
      <TableHeaderCustom grid>
        <TitleCustom titulo={'Lista de Productos'} />
        <TableFooterCustom>
          <FilterOption htmlFor={'NameModel'} name={'Nombre'}>
            <InputTextCustom placeholder="Ingrese el nombre" valueError={errores.nombre}
              textValue={productoNombre} onChange={setProductoNombre}/>
            {errores.nombre && <MessageValidationInput mensaje={errores.nombre}/> }
          </FilterOption>
          <FilterOption htmlFor={'PrecioModel'} name={'Precio Venta'}>
            <InputDecimalCustom placeholder="Ingrese el precio" valueError={errores.precio}
              textValue={productoPrecio} onChange={setProductoPrecio} decimales={2} />
            {errores.precio && <MessageValidationInput mensaje={errores.precio}/> }
          </FilterOption>
          <div className="grid grid-cols-1 md:flex md:gap-4">
          <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Agregar'} 
            onClick={handleCreateProduct} />
          {productoId>0 && (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} 
            name={'Actualizar'} 
            onClick={handleUpdateProducto} />
          )}
          </div>
        </TableFooterCustom>
      </TableHeaderCustom>
      <TableBodyCustom headers={header}>
        {data.length >0 ?
          data.map((user) =>(
          <tr key={user.productoId}>
          <TableTd hidden>{user.productoId}</TableTd>
          <TableTd>{user.productoNombre}</TableTd>
          <TableTd>{user.productoCantidad}</TableTd>
          <TableTd>{user.productoPrecioVenta}</TableTd>
          <TableTd>{user.productoStatus ? 'Activo':'Inactivo'}</TableTd>
          <TableTd>
          <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
              onRowSelect={()=>onRowSelect(user)}>
              <Edit size={18} />
          </TableButton>
          { user.productoStatus && (
          <TableButton className={'text-red-400 hover:text-red-300 '} 
              onRowSelect={()=>onDelete(user)}>
              <Trash2 size={18} />
          </TableButton>
          )}
          </TableTd>
          </tr>
          )):( <NoRegistros colSpan={header.length}/>)
        }        
      </TableBodyCustom>
    </TableContainerCustom>
  )
}