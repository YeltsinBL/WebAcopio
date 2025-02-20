import { Edit, PlusSquare, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, 
  InputDecimalCustom, InputNumberCustom, InputTextCustom, 
  MessageValidationInput, NoRegistros, SectionModel, TableBodyCustom, 
  TableButton, 
  TableContainerCustom, TableFooterCustom, TableHeaderCustom, TableTd,
  TitleCustom
} from "~components/common"
import { 
  convertirFechaDDMMYYYY, convertirFechaToISO, convertirFechaToYMD, FormatteDecimalMath,
  obtenerSoloFechaLocal
} from "~utils/index"
import { CompraProductoPopup } from "."
import { compraAdapterSave } from "../adapter/CompraAdapter"
import { compraSave } from "~services/compra"
import { useCompraInitialForm, useCompraValidation } from "../hooks"
import { useTipoComprobante } from "../hooks/useTipoComprobante"

export const CompraForm = ({onShowModel, data}) => {
  const {
    compraId, fechaModel, setFechaModel,
    comprobanteModel, setComprobanteModel,
    numeroModel, setNumeroModel,
    distribuidorModel, setDistribuidorModel,
    totalModel, servicioEstado, 
    detalleCompra, setDetalleCompra,
    detalleCompraRecojo, setDetalleCompraRecojo,
    productoId, setProductoId,
    productoModal, setProductoModal,
    cantidadModal, setCantidadModal,
    precioModal, setPrecioModal,
    subImporteModal, showPopup, setShowPopup,
    productoRecojoId, setProductoRecojoId,
    recojoFechaModel, setRecojoFechaModel,
    recojoGuiaModel, setRecojoGuiaModel,
    productoRecojoModal, setProductoRecojoModal,
    cantidadRecojoModal, setCantidadRecojoModal,
    recogidosRecojoModal, setRecogidosRecojoModal,
    pendienteRecojoModal, setPendienteRecojoModal,
    totalPendienteModel, distribuidorList, 
    seleccionTipoComprobante, seleccionDistribuidor,
    headers, headersRecojo,
  } = useCompraInitialForm(data)

  const {comprobantesList} = useTipoComprobante()
  const {validate, errores } = useCompraValidation()

  const handleComprobanteChange = (option) =>
    setComprobanteModel((option==''|| isNaN(option))?'':option)
  const handleSelectionDistribuidorChange = (option) =>
    setDistribuidorModel((option==''|| isNaN(option))?'':option)

  const handleShowModel = () => {
    setShowPopup(true)
  }
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      if(detalleCompra.length > 0){
        const mergedArray = [
          ...detalleCompra,
          ...data
            .filter((item2) => !detalleCompra.some((item1) => item1.productoId === item2.productoId))
        ]
        setDetalleCompra(mergedArray)
      } else setDetalleCompra(data)
      
    }
    setShowPopup(false)
  }
  const onRowSelect = (data) => {
    setProductoId(data.productoId)
    setProductoModal(data.productoNombre)
    setCantidadModal(data.cantidad || 0)
    setPrecioModal(data.precio || 0)
  }
  const eliminarProducto= (data)=>{
    setDetalleCompra(detalleCompra.filter(product => product.productoId !== data.productoId))
  }
  const handleUpdateProduct = (e) => {
    e.preventDefault()
    const { isValid } = validate(
      { product: true, values:{ cantidadModal, precioModal }}
    )
    if(isValid){
      const updateDetalle = detalleCompra.map((item) =>
        item.productoId === productoId ? {...item,
            cantidad:cantidadModal,
            precio:FormatteDecimalMath(precioModal, 2),
            pendientes:cantidadModal
        }:item)
      
      const nuevoProducto = {
        compraDetalleRecojoId: `temp-${Date.now()}`,
        productoId: productoId,
        compraDetalleRecojoFecha:convertirFechaDDMMYYYY(obtenerSoloFechaLocal({date: new Date()})),
        compraDetalleRecojoGuia:'',
        productoNombre: productoModal,
        compraDetallePorRecoger: cantidadModal,
        compraDetalleRecogidos: 0,
        compraDetallePendientes: cantidadModal
      }
      
      if (detalleCompraRecojo.length === 0) 
        setDetalleCompraRecojo([nuevoProducto])
      else {
        // Verificamos si el producto ya existe
        const indiceProducto = detalleCompraRecojo.findIndex(producto => producto.productoId === nuevoProducto.productoId)
      
        if (indiceProducto !== -1) {
          // Si el producto existe, actualizamos sus datos
          const updateDetalleRecojo = detalleCompraRecojo.map((item, index) =>
            index === indiceProducto
              ? { ...item, compraDetallePorRecoger:cantidadModal ,compraDetalleRecogidos: 0, compraDetallePendientes: cantidadModal }
              : item
          )
          setDetalleCompraRecojo(updateDetalleRecojo)
        } else {
          // Si el producto no existe, lo agregamos al array
          setDetalleCompraRecojo([...detalleCompraRecojo, nuevoProducto])
        }
      }
      toast.success('Valores actualizado')
      setDetalleCompra(updateDetalle)
      setProductoId(0)
      setProductoModal('')
      setCantidadModal(0)
      setPrecioModal(0)
    }
  }

  const handleUpdateProductRecojo = (e) => {
    e.preventDefault()    
    const { isValid } = validate(
      { productRecojo: true, values:{ recogidosRecojoModal }}
    )
    if(isValid){
      const updateDetalleRecojo = detalleCompraRecojo.map((item) =>
        item.compraDetalleRecojoId === productoRecojoId ? {...item,
          compraDetalleRecojoFecha:convertirFechaDDMMYYYY(recojoFechaModel),
          compraDetalleRecojoGuia:recojoGuiaModel,
          compraDetalleRecogidos:recogidosRecojoModal,
          compraDetallePendientes:pendienteRecojoModal
        }:item)
      toast.success('Recojode producto actualizado')
      setDetalleCompraRecojo(updateDetalleRecojo)
      setProductoRecojoId(0)
      setRecojoFechaModel(obtenerSoloFechaLocal({date: new Date()}))
      setRecojoGuiaModel('')
      setProductoRecojoModal('')
      setCantidadRecojoModal(0)
      setRecogidosRecojoModal(0)
      setPendienteRecojoModal(0)
    }
  }
  const onRowSelectRecojo =(data)=>{
    setProductoRecojoId(data.compraDetalleRecojoId)
    setRecojoFechaModel(convertirFechaToYMD(convertirFechaToISO(data.compraDetalleRecojoFecha)))
    setRecojoGuiaModel(data.compraDetalleRecojoGuia)
    setProductoRecojoModal(data.productoNombre)
    setCantidadRecojoModal(data.compraDetallePorRecoger || 0)
    setRecogidosRecojoModal(data.compraDetalleRecogidos || 0)
    setPendienteRecojoModal(data.compraDetallePendientes || 0)
  }
  const onRowSelectToRecojo = (data) =>{
    const updateAdicionalesList = [...detalleCompraRecojo, {
      compraDetalleRecojoId: `temp-${Date.now()}`,
      productoId: data.productoId,
      compraDetalleRecojoFecha:convertirFechaDDMMYYYY(obtenerSoloFechaLocal({date:new Date()})),
      compraDetalleRecojoGuia:'',
      productoNombre: data.productoNombre,
      compraDetallePorRecoger: data.pendientes ==0 ? data.cantidad :data.pendientes,
      compraDetalleRecogidos:0,
      compraDetallePendientes: data.pendientes ==0 ? data.cantidad :data.pendientes
    }]
    setDetalleCompraRecojo(updateAdicionalesList)    
    toast.success('Producto agregado a recoger')
  }
  const eliminarProductoRecojo= (data)=>{
    setDetalleCompraRecojo(detalleCompraRecojo
      .filter(product => product.compraDetalleRecojoId !== data.compraDetalleRecojoId))
  }

  const handleGuardar = async(e) => {    
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const { isValid } = validate(
      { save: true, 
        values:{ 
          fechaModel, comprobanteModel, numeroModel,
          distribuidorModel, detalleCompra, totalModel,
        }
      }
    )
    if(isValid){
      const save = compraAdapterSave({
        compraId, fechaModel, comprobanteModel,
        numeroModel, distribuidorModel, totalModel, totalPendienteModel,
        detalleCompra, detalleCompraRecojo})
      const response = await compraSave(compraId > 0? 'PUT':'POST', save)
      if(!response.result)
        return toast.error(response.message, { id: toastLoadingCustom, style: { color:'red' }})
      toast.success(response.message, {id: toastLoadingCustom})
      return onShowModel(response)
    }
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({compraId:0})
  }
  return (
    <>
      <SectionModel title={(compraId > 0 ? (servicioEstado != 'Activo' ?'Información':'Modificar'):'Registrar') + ' Compra'}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pt-3'>
          <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
            <InputDateCustom fechaValue={fechaModel}
              valueError={errores.fechaModel ? true: false}
              setFechaValue={setFechaModel} readOnly={servicioEstado != 'Activo'} />
            {errores.fechaModel && <MessageValidationInput mensaje={errores.fechaModel}/>}
          </FilterOption>
          <FilterOption htmlFor={'TipoComprobanteModel'} name={'Comprobante'}>
            <ComboBoxCustom initialOptions={comprobantesList} selectedOption={seleccionTipoComprobante}
              onSelectionChange={handleComprobanteChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.comprobante ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"} allDisabled={servicioEstado != 'Activo'}
            />
            {errores.comprobante && <MessageValidationInput mensaje={errores.comprobante}/>}
          </FilterOption>
          <FilterOption htmlFor={'ComprobanteNumeroModel'} name={'N° Comprobante'}>
            <InputTextCustom textValue={numeroModel} readOnly={servicioEstado != 'Activo'}
              placeholder={'Ejm: N° del Factura'} onChange={setNumeroModel}
              valueError={errores.numero} />
            {errores.numero && <MessageValidationInput mensaje={errores.numero}/>}
          </FilterOption>
          <FilterOption htmlFor={'DistribuidorModel'} name={'Distribuidor'}>
            <ComboBoxCustom  initialOptions={distribuidorList} selectedOption={seleccionDistribuidor} 
              onSelectionChange={handleSelectionDistribuidorChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.distribuidor ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              allDisabled={servicioEstado != 'Activo'}
              />
            {errores.distribuidor && <MessageValidationInput mensaje={errores.distribuidor}/>}
          </FilterOption>
          <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
            <InputTextCustom textValue={servicioEstado} readOnly={true} />
          </FilterOption>
        </div>
      </SectionModel>

      <TableContainerCustom>
        <TableHeaderCustom grid>
        <div className={'grid grid-cols-1 gap-6 md:flex justify-between items-center mb-6 '}>
          <TitleCustom titulo={'Lista de Productos'}  />  
          <ButtonCustom extraClassName={`${compraId > 0 ? 'hidden' : ''} `} 
              name={'Seleccionar'} onClick={handleShowModel} />    
        </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
            <FilterOption htmlFor={'ProductoNombreModal'} name={'Producto'}>
              <InputTextCustom textValue={productoModal} placeholder="Automático" readOnly/>
            </FilterOption>
            <FilterOption htmlFor={'CantidadModal'} name={'Cantidad'}>
              <InputNumberCustom textValue={cantidadModal} valueError={errores.cantidad}
                placeholder="Ingrese la cantidad de compra" onChange={setCantidadModal} 
                readOnly={compraId > 0} />
              {errores.cantidad && <MessageValidationInput mensaje={errores.cantidad}/>}
            </FilterOption>
            <FilterOption htmlFor={'PrecioModal'} name={'Precio'}>
              <InputDecimalCustom textValue={precioModal} valueError={errores.precio}
                placeholder={'Ingrese precio de compra'} onChange={setPrecioModal}
                readOnly={compraId > 0} decimales={2} />
              {errores.precio && <MessageValidationInput mensaje={errores.precio}/>}
            </FilterOption>
            <FilterOption htmlFor={'SubImporteModal'} name={'SubImporte'}>
              <InputTextCustom textValue={subImporteModal} readOnly/>
            </FilterOption>
            <ButtonCustom extraClassName={`${productoId == 0 ? 'hidden' : ''} max-h-9 mt-6 max-w-fit `} 
              name={'Actualizar'} onClick={handleUpdateProduct} />
          </div>
        </TableHeaderCustom>
        <TableBodyCustom headers={headers}>
          {detalleCompra.length > 0 ? (
            detalleCompra.map((detalle) => (
              <tr key={detalle.productoId} >
                <TableTd hidden>{detalle.productoId}</TableTd>
                <TableTd>{detalle.productoNombre}</TableTd>
                <TableTd>{detalle.cantidad}</TableTd>
                <TableTd>{detalle.precio}</TableTd>
                <TableTd>{FormatteDecimalMath(detalle.cantidad * detalle.precio,2)}</TableTd>
                <TableTd>{detalle.recogidos}</TableTd>
                <TableTd>{detalle.pendientes}</TableTd>
                <TableTd>
                  { detalle.cantidad - detalle.recogidos > 0 && compraId > 0 &&
                  (<>
                  <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                    onRowSelect={()=>onRowSelectToRecojo(detalle)}>
                    <PlusSquare size={18} style={{color: "green"  }}  />
                  </TableButton>
                  </>)}
                  { compraId == 0 &&
                  (<>
                  <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                    onRowSelect={()=>onRowSelect(detalle)}>
                    <Edit size={18} />
                  </TableButton>
                  <TableButton className={'text-red-400 hover:text-red-300 '} 
                    onRowSelect={()=>eliminarProducto(detalle)}>
                    <Trash2 size={18} />
                  </TableButton>
                  </>)}
                </TableTd>
              </tr>
            ))
          ): ( <NoRegistros colSpan={headers.length}/> )}
        </TableBodyCustom>
        {errores.detalle && <MessageValidationInput mensaje={errores.detalle}/>}
        <TableFooterCustom>
          <FilterOption htmlFor={'totalModel'} name={'Total Importe'}>
            <InputTextCustom textValue={totalModel} placeholder='Automático'
              valueError={errores.total} readOnly />
            {errores.total && <MessageValidationInput mensaje={errores.total}/>}
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>

      <TableContainerCustom>
        <TableHeaderCustom grid>
          <div className={'grid grid-cols-1 gap-6 md:flex justify-between items-center mb-6 '}>
            <TitleCustom titulo={'Productos Recogidos'}  />  
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
            <FilterOption htmlFor={'RecojoFechaModel'} name={'Fecha'}>
              <InputDateCustom fechaValue={recojoFechaModel}
                valueError={errores.recojoFecha}
                setFechaValue={setRecojoFechaModel} readOnly={productoRecojoId == 0} />
              {errores.recojoFecha && <MessageValidationInput mensaje={errores.recojoFecha}/>}
            </FilterOption>
            <FilterOption htmlFor={'RecojoGuia'} name={'Guía'}>
              <InputTextCustom onChange={setRecojoGuiaModel} textValue={recojoGuiaModel} 
                placeholder="Ingrese la guía" readOnly={productoRecojoId == 0} />
            </FilterOption>
            <FilterOption htmlFor={'ProductoNombreRecojoModal'} name={'Producto'}>
              <InputTextCustom textValue={productoRecojoModal} placeholder="Automático" readOnly/>
            </FilterOption>
            <FilterOption htmlFor={'CantidadRecojoModal'} name={'Por Recoger'}>
              <InputNumberCustom textValue={cantidadRecojoModal} readOnly/>
            </FilterOption>
            <FilterOption htmlFor={'recogidosRecojoModal'} name={'Recogidos'}>
              <InputNumberCustom textValue={recogidosRecojoModal} valueError={errores.recogidos}
                placeholder={'Ingrese cantidad recogida'} onChange={setRecogidosRecojoModal}
                readOnly={productoRecojoId == 0} />
              {errores.recogidos && <MessageValidationInput mensaje={errores.recogidos}/>}
            </FilterOption>
            <FilterOption htmlFor={'PendienteRecojoModal'} name={'Pendientes'}>
              <InputTextCustom textValue={pendienteRecojoModal} readOnly/>
            </FilterOption>
            <ButtonCustom extraClassName={`${productoRecojoId == 0 ? 'hidden' : ''} max-h-9 mt-6 max-w-fit `} 
              name={'Actualizar'} onClick={handleUpdateProductRecojo} />
          </div>
        </TableHeaderCustom>
        <TableBodyCustom headers={headersRecojo}>
          {detalleCompraRecojo.length > 0 ? (
            detalleCompraRecojo.map((detalle) => (
              <tr key={detalle.compraDetalleRecojoId} >
                <TableTd hidden>{detalle.compraDetalleRecojoId}</TableTd>
                <TableTd hidden>{detalle.productoId}</TableTd>
                <TableTd>{detalle.compraDetalleRecojoFecha}</TableTd>
                <TableTd>{detalle.compraDetalleRecojoGuia}</TableTd>
                <TableTd>{detalle.productoNombre}</TableTd>
                <TableTd>{detalle.compraDetallePorRecoger}</TableTd>
                <TableTd>{detalle.compraDetalleRecogidos}</TableTd>
                <TableTd>{detalle.compraDetallePendientes}</TableTd>
                <TableTd>                
                  { typeof detalle.compraDetalleRecojoId === "string" && detalle.compraDetalleRecojoId.startsWith("temp") &&
                  (<>
                  <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                    onRowSelect={()=>onRowSelectRecojo(detalle)}>
                    <Edit size={18} />
                  </TableButton>
                  <TableButton className={'text-red-400 hover:text-red-300 '} 
                    onRowSelect={()=>eliminarProductoRecojo(detalle)}>
                    <Trash2 size={18} />
                  </TableButton>
                  </>)}
                </TableTd>
              </tr>
            ))
          ): ( <NoRegistros colSpan={headersRecojo.length}/> )}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'totalModel'} name={'Pendiente Total'}>
            <InputTextCustom textValue={totalPendienteModel} placeholder='Automático' 
              readOnly />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>

      <Footer>
        {servicioEstado != 'Activo' || ( <FooterButton accion={handleGuardar} name={'Guardar'} /> )}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup ? <CompraProductoPopup onShowModel={resspuestaShowModel} />    : ''}
    </>
  )
}