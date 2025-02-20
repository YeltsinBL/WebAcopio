import { Edit, Trash2 } from "lucide-react"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, InputDecimalCustom, 
  InputNumberCustom, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, TableBodyCustom, 
  TableButton, TableContainerCustom, TableFooterCustom, TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { VentaProductoPopup } from "./VentaProductoPopup"
import { useVentaValidation } from "../hooks/useVentaValidation"
import { useVentaInitialForm } from "../hooks/useVentaInitialForm"
import { convertirFechaDDMMYYYY, FormatteDecimalMath } from "~utils/index"
import { toast } from "sonner"
import { ventaAdapterSave } from "../adapter/VentaAdapter"
import { ventaSave } from "~services/venta"

export const VentaForm = ({onShowModel, data}) => {
  const headers = ['Stock', 'Producto', 'Precio', 'Cantidad', 'SubImporte', 'Acciones']
  const headersPagos= ['Fecha', 'Pagado','Efectivo','Banco','Cta.Cte.', 'Acción']
  
  const {ventaId, fechaModel, setFechaModel, 
    //comprobanteModel, setComprobanteModel,
    numeroModel, personaModel, setPersonaModel,
    totalModel, detalleVenta, setDetalleVenta, productoId, setProductoId,
    productoModal, setProductoModal, cantidadModal, setCantidadModal,
    precioModal, setPrecioModal, subImporteModal,
    showPopup, setShowPopup, personaList, 
    seleccionTipoComprobante, seleccionPersona,
    stockModal, setStockModal, ventaTipoList, seleccionVentaTipo,
    ventaEstadoList, ventaTipoModel, setVentaTipoModel,
    ventaEstadoModel, setVentaEstadoModel, ventaDiaModel, setVentaDiaModel
    ,fechaPagadoModel, setFechaPagadoModel, pagando, 
    pagadoModel, setPagadoModel, bancoModel, setBancoModel,
    cteModel, setCteModel,totalPagadoModel,
    efectivo, setEfectivo, detallePagado, setDetallePagado,
    pendientePagarModel
  } = useVentaInitialForm(data)
  const {validate, errores} = useVentaValidation()

  // const handleComprobanteChange = (option) =>
  //   setComprobanteModel((option==''|| isNaN(option))?'':option)
  const handleSelectionPersonaChange = (option) =>
    setPersonaModel((option==''|| isNaN(option))?'':option)
  const handleVentaTipoChange = (option) =>
  {
    setVentaTipoModel((option==''|| isNaN(option))?'':option)
    const filtro = ventaEstadoList.filter(estado => estado.nombre ==(option==2 ? 'Pagado':'Activo'))
    setVentaEstadoModel(filtro[0])
  }
  const handleShowModel = () => {
    setShowPopup(true)
  }
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      if(detalleVenta.length > 0){
        const mergedArray = [
          ...detalleVenta,
          ...data
            .filter((item2) => !detalleVenta.some((item1) => item1.productoId === item2.productoId))
        ];
        setDetalleVenta(mergedArray)
      } else setDetalleVenta(data)
      
    }
    setShowPopup(false)
  }
  const onRowSelect = (data) => {
    setProductoId(data.productoId)
    setProductoModal(data.productoNombre)
    setStockModal(data.productoCantidad)
    setCantidadModal(data.cantidad || 0)
    setPrecioModal(data.productoPrecioVenta || 0)
  }
  const eliminarProducto= (data)=>{
    setDetalleVenta(detalleVenta.filter(product => product.productoId !== data.productoId))
  }
  const handleUpdateProduct = (e) => {
    e.preventDefault()
    const { isValid } = validate(false,true,false, {
      cantidadModal, precioModal, stockModal
    })
    if(isValid){
      const updateDetalle = detalleVenta.map((item) =>
        item.productoId === productoId ? {...item,
          cantidad:cantidadModal,
          productoPrecioVenta:FormatteDecimalMath(precioModal, 2)
        }:item)
      setDetalleVenta(updateDetalle)
      setProductoId(0)
      setProductoModal('')
      setStockModal(0)
      setCantidadModal(0)
      setPrecioModal(0)
    }
  }
  const handleAgregarProveedor = (e) => {
    e.preventDefault()
    const { isValid } = validate(false,false,true,{
      fechaPagadoModel, pagadoModel, cteModel, efectivo,pendientePagarModel
    })
    if (isValid) {
      const updatePlacaList = [...detallePagado, 
        { detallePagoId: `temp-${Date.now()}`,
        detallePagoFecha: fechaPagadoModel,
        detallePagoPagado: pagadoModel,
        detallePagoEfectivo: efectivo,
        detallePagoBanco: bancoModel,
        detallePagoCtaCte: cteModel,
      }]
      setDetallePagado(updatePlacaList)
    }
    setPagadoModel(0)
    setBancoModel('')
    setCteModel('')
    setEfectivo(false)
  }
  const onRowDelete = (proveedor) => {
    if (typeof proveedor.detallePagoId === "string" && proveedor.detallePagoId.startsWith("temp")) {
      setDetallePagado(detallePagado.filter((item) => item.detallePagoId !== proveedor.detallePagoId))
    }
  }
  const handleGuardar = async(e) => {    
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const { isValid } = validate(true,false,false,{
        fechaModel, comprobanteModel:seleccionTipoComprobante , ventaDiaModel,
        personaModel, detalleVenta, totalModel,
        ventaTipoModel, ventaEstadoModel: ventaEstadoModel.id, pendientePagarModel,
        detallePagado
      })
    if(isValid){
      const save = ventaAdapterSave({
        ventaId, fechaModel, comprobanteModel:seleccionTipoComprobante , ventaDiaModel, personaModel,
        totalModel, ventaTipoModel, ventaEstadoModel: ventaEstadoModel.id, detalleVenta,
        detallePagado,totalPagadoModel, pendientePagarModel
      })
      const response = await ventaSave(ventaId > 0 ? 'PUT' : 'POST', save)
      if(!response.result)
        return toast.error(response.message, { id: toastLoadingCustom, style: { color:'red' }})
      toast.success(response.message, { id: toastLoadingCustom })
      return onShowModel(response)
    }
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({result:false})
  }
  return (
    <>
      <SectionModel title={(ventaId > 0 ? (ventaEstadoModel.nombre != 'Activo'?'Información':'Modificar'):'Registrar') + ' Venta'}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pt-3'>
          <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
            <InputDateCustom fechaValue={fechaModel}
              valueError={errores.fechaModel ? true: false}
              setFechaValue={setFechaModel} readOnly={ventaId > 0 && ventaEstadoModel.nombre != 'Activo'} />
            {errores.fechaModel && <MessageValidationInput mensaje={errores.fechaModel}/>}
          </FilterOption>
          {/* <FilterOption htmlFor={'TipoComprobanteModel'} name={'Comprobante'}>
            <ComboBoxCustom initialOptions={comprobantesList} selectedOption={seleccionTipoComprobante}
              onSelectionChange={handleComprobanteChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.comprobante ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}  /> 
          </FilterOption>*/}              
          <FilterOption htmlFor={'TipoComprobanteModel'} name={'Comprobante'}>
            <InputTextCustom textValue={seleccionTipoComprobante?.nombre} readOnly={true} />
            {errores.comprobante && <MessageValidationInput mensaje={errores.comprobante}/>}
          </FilterOption>
          <FilterOption htmlFor={'ComprobanteNumeroModel'} name={'N° Comprobante'}>
            <InputTextCustom textValue={numeroModel} readOnly placeholder={'Automático'}/>
          </FilterOption>
          <FilterOption htmlFor={'PersonaModel'} name={'Persona'}>
            <ComboBoxCustom initialOptions={personaList} selectedOption={seleccionPersona} 
              onSelectionChange={handleSelectionPersonaChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.persona ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              allDisabled={ventaId > 0 && ventaEstadoModel.nombre != 'Activo'} />
            {errores.persona && <MessageValidationInput mensaje={errores.persona}/>}
          </FilterOption>
          <FilterOption htmlFor={'VentaTipoModel'} name={'Tipo'}>
            <ComboBoxCustom initialOptions={ventaTipoList} selectedOption={seleccionVentaTipo} 
              onSelectionChange={handleVentaTipoChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.ventaTipo ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              allDisabled={ventaId > 0 && ventaEstadoModel.nombre != 'Activo'} />
            {errores.ventaTipo && <MessageValidationInput mensaje={errores.ventaTipo}/>}
          </FilterOption>
          { ventaTipoModel ==3 && (
            <FilterOption htmlFor={'ventaDiaModel'} name={'Días'}>
            <InputTextCustom textValue={ventaDiaModel} readOnly={ventaId > 0 && ventaEstadoModel.nombre != 'Activo'}
              placeholder={'Ejm: 5'} onChange={setVentaDiaModel}
              valueError={errores.numero} />
            {errores.numero && <MessageValidationInput mensaje={errores.numero}/>}
          </FilterOption>
          )}
          <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
            <InputTextCustom textValue={ventaEstadoModel.nombre} readOnly={true} />
          </FilterOption>
        </div>
      </SectionModel>
      <TableContainerCustom>
        <TableHeaderCustom grid>
          <div className={'grid grid-cols-1 gap-6 md:flex justify-between items-center mb-6 '}>
            <TitleCustom titulo={'Lista de Productos'}  />  
            <ButtonCustom extraClassName={`${ventaId > 0 ? 'hidden' : ''} `} 
              name={'Seleccionar'} onClick={handleShowModel} />    
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
            <FilterOption htmlFor={'ProductoNombreModal'} name={'Producto'}>
              <InputTextCustom textValue={productoModal} placeholder="Automático" readOnly/>
            </FilterOption>
            <FilterOption htmlFor={'CantidadModal'} name={'Cantidad'}>
              <InputNumberCustom textValue={cantidadModal} valueError={errores.cantidad}
                placeholder="Ingrese la cantidad de Venta" onChange={setCantidadModal} 
                readOnly={ventaId > 0} />
              {errores.cantidad && <MessageValidationInput mensaje={errores.cantidad}/>}
            </FilterOption>
            <FilterOption htmlFor={'PrecioModal'} name={'Precio'}>
              <InputDecimalCustom textValue={precioModal} valueError={errores.precio}
                placeholder={'Ingrese precio de Venta'} onChange={setPrecioModal}
                readOnly={ventaId > 0} decimales={2} />
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
            {detalleVenta.length > 0 ? (
            detalleVenta.map((detalle) => (
                <tr key={detalle.productoId} >
                <TableTd hidden>{detalle.productoId}</TableTd>
                <TableTd>{detalle.productoStock}</TableTd>
                <TableTd>{detalle.productoNombre}</TableTd>
                <TableTd>{detalle.productoPrecioVenta}</TableTd>
                <TableTd>{detalle.cantidad}</TableTd>
                <TableTd>{FormatteDecimalMath(detalle.cantidad * detalle.productoPrecioVenta,2)}</TableTd>
                <TableTd>
                  { ventaId == 0 &&
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
            <FilterOption htmlFor={'totalModel'} name={'Total'}>
            <InputTextCustom textValue={totalModel} placeholder='Automático'
                valueError={errores.total} readOnly />
            {errores.total && <MessageValidationInput mensaje={errores.total}/>}
            </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
      <TableHeaderCustom grid>
        <TitleCustom titulo={'Lista de Pagos'}  />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-3'>
            <FilterOption htmlFor={'FechaPagadoModel'} name={'Fecha Pagado'}>
              <InputDateCustom fechaValue={fechaPagadoModel}
                valueError={errores.fechaModel ? true: false}
                setFechaValue={setFechaPagadoModel} readOnly={!pagando} />
              {errores.fechaPagadoModel && <MessageValidationInput mensaje={errores.fechaPagadoModel}/>}
            </FilterOption>
            <FilterOption htmlFor={'utPagado'} name={'Pagado'}>
              <InputDecimalCustom onChange={setPagadoModel} placeholder={'Ingrese el monto que va ha pagar'} 
                textValue={pagadoModel} readOnly={!pagando}
                decimales={2}/>
              {errores.pagado && <MessageValidationInput mensaje={errores.pagado}/>}
            </FilterOption>
            <FilterOption htmlFor={'BancoModel'} name={'Banco'}>
              <InputTextCustom onChange={setBancoModel} placeholder='Ejm: Interbank'
                textValue={bancoModel} readOnly={!pagando} />
            </FilterOption>
            <FilterOption htmlFor={'CtaCteModel'} name={'Cta. Cte'}>
              <InputTextCustom onChange={setCteModel} placeholder='Ingrese el Cte del Sembrador'
                valueError={errores.ctacte} readOnly={!pagando}
                textValue={cteModel} />
              {errores.ctacte && <MessageValidationInput mensaje={errores.ctacte}/>}
            </FilterOption>
            <div className='pr-6'>
              <label htmlFor="EfectivoModel" className="text-white pr-3 ">Efectivo</label>
              <input type="checkbox" id="efectivo" 
                checked={efectivo} readOnly={!pagando}
                onChange={(e) => setEfectivo(e.target.checked)}/>
            </div>
            <ButtonCustom extraClassName={`${!pagando ? 'hidden' : ''} max-h-9 mt-6 md:w-28 `} name={'Agregar'} 
              onClick={handleAgregarProveedor}  />
          </div>
        </TableHeaderCustom>
        <TableBodyCustom headers={headersPagos}>
          {detallePagado.length > 0 ?(
            detallePagado.map((item)=>(
              <tr key={item.detallePagoId} >
                <TableTd hidden>{item.detallePagoId}</TableTd>
                <TableTd>{convertirFechaDDMMYYYY(item.detallePagoFecha)}</TableTd>
                <TableTd>{item.detallePagoPagado}</TableTd>
                <TableTd>{item.detallePagoEfectivo ? 'Si':'No'}</TableTd>
                <TableTd>{item.detallePagoBanco}</TableTd>
                <TableTd>{item.detallePagoCtaCte}</TableTd>
                <TableTd>
                  {
                    typeof item.detallePagoId === "string" && 
                    item.detallePagoId?.startsWith('temp') &&
                  <TableButton className={'text-red-400 hover:text-red-300'}
                    onRowSelect={()=>onRowDelete(item)}>
                    <Trash2 size={18} />
                  </TableButton>
                  }
                  
                </TableTd>
              </tr>
            ))
          ):(<NoRegistros colSpan={headers.length}/>)}
        </TableBodyCustom>
        {errores.detallePagos && <MessageValidationInput mensaje={errores.detallePagos}/>}
        <TableFooterCustom>
          <FilterOption htmlFor={'TotalPagado'} name={'Pagado'}>
            <InputDecimalCustom placeholder={'Automático'} textValue={totalPagadoModel}
              readOnly decimales={2} valueError={errores.totalPagado}/>
              {errores.totalPagado && <MessageValidationInput mensaje={errores.totalPagado}/>}
          </FilterOption>
          <FilterOption htmlFor={'TotalPendientePagar'} name={'Pendiente a Pagar'}>
            <InputDecimalCustom placeholder={'Automático'} textValue={pendientePagarModel}
              readOnly decimales={2}/>
          </FilterOption> 
        </TableFooterCustom>
      </TableContainerCustom>
      <Footer>
        {ventaId > 0 && ventaEstadoModel.nombre != 'Activo' || ( <FooterButton accion={handleGuardar} name={'Guardar'} /> )}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup && <VentaProductoPopup onShowModel={resspuestaShowModel} /> }
    </>
  )
}