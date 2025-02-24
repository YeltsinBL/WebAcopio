import { 
  ComboBoxCustom, ContainerPopupCustom, FilterOption, Footer, FooterButton, 
  InputDecimalCustom, InputNumberCustom, InputTextCustom, MessageValidationInput, 
  SectionModelPopup 
} from "~components/common"
import { useInitialProducto, useValidationProducto } from "../hooks"
import { productoAdapterSave } from "../adapter/ProductoAdapter"
import { productoSave } from "~services/producto"
import { toast } from "sonner"

export const ProductoForm = ({data, onShowModel}) => {
  const {
    productoId, productoNombre, setProductoNombre, 
    productoPrecio, setProductoPrecio,
    productoTipoList, productoTipoId, setProductoTipoId,
    seleccionProductoTipo, productStockInicial, setProductStockInicial,
  } = useInitialProducto(data)
  const {validate, errores} = useValidationProducto()

  const handleProductoTipoChange = (option) =>
    setProductoTipoId((option==''|| isNaN(option))?'':option)

  const handleGuardar = async(e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const {isValid} = validate(
      {productoNombre, productoTipoId, productoPrecio, productStockInicial }
    )
    if(isValid){
      let dataAdapter = productoAdapterSave({ 
        productoId, productoNombre, productoPrecio, productoTipoId, productStockInicial
      })
      const response = await productoSave(productoId > 0 ?'PUT':'POST', dataAdapter)
      if(response.result === false) 
        return toast.error(response.message, {id: toastLoadingCustom, style: { color:'red' }})
      toast.success(response.message, {id: toastLoadingCustom})
      return onShowModel(response)
    }    
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({result:false })
  }
  return (
    <ContainerPopupCustom>
      <SectionModelPopup title={(productoId > 0 ? 'Editar':'Registrar') + ' Producto'}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'ProductoTipoModel'} name={'Tipo'}>
              <ComboBoxCustom initialOptions={productoTipoList} selectedOption={seleccionProductoTipo} 
                onSelectionChange={handleProductoTipoChange}
                className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                    errores.productoTipo ? "border-red-500" : ""
                }`}
                colorOptions={"text-black"} />
              {errores.productoTipo && <MessageValidationInput mensaje={errores.productoTipo}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'NameModel'} name={'Nombre'}>
              <InputTextCustom placeholder="Ingrese el nombre" valueError={errores.nombre}
                textValue={productoNombre} onChange={setProductoNombre}/>
              {errores.nombre && <MessageValidationInput  mensaje={errores.nombre}/> }
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'StockModel'} name={'Stock Inicial'}>
              <InputNumberCustom placeholder="Ingrese el stock inicial" valueError={errores.stock}
                textValue={productStockInicial} onChange={setProductStockInicial} />
              {errores.stock && <MessageValidationInput mensaje={errores.stock}/> }
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'PrecioModel'} name={'Precio Venta'}>
              <InputDecimalCustom placeholder="Ingrese el precio" valueError={errores.precio}
                textValue={productoPrecio} onChange={setProductoPrecio} decimales={2} />
              {errores.precio && <MessageValidationInput mensaje={errores.precio}/> }
            </FilterOption>
          </div>
        </div>
        <Footer>
          <FooterButton name={'Guardar'} accion={handleGuardar}/>
          <FooterButton name={'Cancelar'} accion={handleCancelar}/>
        </Footer>
      </SectionModelPopup>
    </ContainerPopupCustom>
  )
}