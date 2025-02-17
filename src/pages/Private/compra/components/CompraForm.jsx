import { useEffect, useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, 
  InputDecimalCustom, InputNumberCustom, InputTextCustom, 
  MessageValidationInput, NoRegistros, SectionModel, TableBodyCustom, 
  TableButton, 
  TableContainerCustom, TableFooterCustom, TableHeaderCustom, TableTd,
  TitleCustom
} from "~components/common"
import { searchDistribuidor } from "~services/distribuidor"
import { searchTipoComprobante } from "~services/tipos"
import { FormatteDecimalMath, formatterDataCombo, obtenerSoloFechaLocal } from "~utils/index"
import { CompraProductoPopup } from "."
import { compraAdapterSave } from "../adapter/CompraAdapter"
import { compraSave } from "~services/compra"

export const CompraForm = ({onShowModel, data}) => {
  const [compraId, setCompraId] = useState(0)
  const [fechaModel, setFechaModel] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [comprobanteModel, setComprobanteModel] = useState(0)
  const [numeroModel, setNumeroModel] = useState('')
  const [distribuidorModel, setDistribuidorModel] = useState(0)
  const [totalModel, setTotalModel] = useState(0)
  const [servicioEstado, setservicioEstado] = useState('Activo')
  const [detalleCompra, setDetalleCompra] = useState([])

  const [productoId, setProductoId] = useState(0)
  const [productoModal, setProductoModal] = useState('')
  const [cantidadModal, setCantidadModal] = useState(0)
  const [precioModal, setPrecioModal] = useState(0)
  const [subImporteModal, setSubImporteModal] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  
  const [comprobantesList, setComprobantesList] = useState([])
  const [distribuidorList, setDistribuidorList] = useState([])
  const seleccionTipoComprobante = data?.tipoComprobanteId ? {id: data.tipoComprobanteId, nombre: data.tipoComprobanteNombre } : null
  const seleccionDistribuidor = data?.tipoComprobanteId ? {id: data.distribuidorId, nombre: data.distribuidorNombre } : null
  
  const [errores, setErrores] = useState({})
  const headers = ['Producto', 'Cantidad', 'Precio', 'SubImporte', 'Acciones']
  useEffect(() => {
    getComprobantes()
    getDistribuidor()
  }, [])
  useEffect(()=>{
    if(data){
      setCompraId(data.compraId)
      setFechaModel(data.compraFecha)
      setComprobanteModel(data.tipoComprobanteId)
      setNumeroModel(data.compraNumeroComprobante)
      setDistribuidorModel(data.distribuidorId)
      setTotalModel(data.compraTotal)
      setservicioEstado(data.compraStatus)
      setDetalleCompra(data.compraDetalles)
    }
  }, [data])
  useEffect(() =>{
    if(precioModal >= 0 && cantidadModal >= 0)
      return setSubImporteModal(FormatteDecimalMath(precioModal * cantidadModal,2))
    return setSubImporteModal(0)
  },[precioModal, cantidadModal])
  useEffect(() =>{
    const total = detalleCompra.reduce(getSum, 0)
    if(total > 0) return setTotalModel(FormatteDecimalMath(total, 2))
    return setTotalModel(0)
  }, [detalleCompra])
  const getSum=(total, num) =>{
    return total + parseFloat(num.precio * num.cantidad)
  }
  const getComprobantes = async() => {
    const estados = await searchTipoComprobante()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.tipoComprobanteId, tipo.tipoComprobanteNombre)
    ))
    setComprobantesList(formatter)
  }
  const getDistribuidor = async() =>{
    const distribuidores = await searchDistribuidor({
        ruc:'', name:'', estado:true
    })
    const formatter= distribuidores?.map(tipo =>(
      formatterDataCombo(tipo.distribuidorId, tipo.distribuidorNombre)
    ))
    setDistribuidorList(formatter)
  }
  const handleComprobanteChange = (option) =>
    setComprobanteModel((option==''|| isNaN(option))?'':option)
  const handleSelectionDistribuidorChange = (option) =>
    setDistribuidorModel((option==''|| isNaN(option))?'':option)

  const validarCampos = (save = false, product = false) => {
    const nuevosErrores = {}
    if(save){
      if (!fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
      if (!comprobanteModel) nuevosErrores.comprobante = "El campo TIPO COMPROBANTE es obligatorio."
      if (!numeroModel) nuevosErrores.numero = "El campo N° COMPROBANTE es obligatorio."
      if (!distribuidorModel) nuevosErrores.distribuidor = "El campo DISTRIBUIDOR es obligatorio."
      if (detalleCompra.length ==0) nuevosErrores.detalle = "Seleccione al menos un producto"
      if (!totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
      if(
          detalleCompra.length > 0 && 
          detalleCompra.filter((data) => data.cantidad ==0 || data.precio ==0).length > 0
        ){
        toast.warning('No se puede guardar una compra con CANTIDAD o PRECIO en cero', {style: { 
            background: 'black',
            color:' yellow' }} )
      }
    }
    if (product){
      if (!cantidadModal) nuevosErrores.cantidad = "El campo CANTIDAD es obligatorio."
      if (!precioModal) nuevosErrores.precio = "El campo PRECIO es obligatorio."
    }  
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
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
        ];
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
    if(validarCampos(false,true)){
      const updateDetalle = detalleCompra.map((item) =>
        item.productoId === productoId ? {...item,
            cantidad:cantidadModal,
            precio:FormatteDecimalMath(precioModal, 2)
        }:item)
      setDetalleCompra(updateDetalle)
      setProductoId(0)
      setProductoModal('')
      setCantidadModal(0)
      setPrecioModal(0)
    }
  }
  const handleGuardar = async(e) => {    
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    if(validarCampos(true,false)){
      const save = compraAdapterSave({
        compraId, fechaModel, comprobanteModel,
        numeroModel, distribuidorModel, totalModel,
        detalleCompra})
    
      const response = await compraSave(compraId > 0? 'PUT':'POST', save)
      if(!response.result)
        return toast.error(response.message, { id: toastLoadingCustom, style: { color:'red' }})
      setTimeout(() => {
        toast.dismiss(toastLoadingCustom)
      })
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
                {/* <TableTd>{detalle.subImporte}</TableTd> */}
                <TableTd>{FormatteDecimalMath(detalle.cantidad * detalle.precio,2)}</TableTd>
                <TableTd>
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
          <FilterOption htmlFor={'totalModel'} name={'Total'}>
            <InputTextCustom textValue={totalModel} placeholder='Automático'
              valueError={errores.total} readOnly />
            {errores.total && <MessageValidationInput mensaje={errores.total}/>}
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