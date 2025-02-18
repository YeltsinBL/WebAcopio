import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, 
  InputDecimalCustom, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, 
  TableBodyCustom, TableButton, TableContainerCustom, TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { 
  useFacturaVentaEstado, useFacturaVentaInitialForm, useFacturaVentaValidation 
} from "../hooks"
import { Trash2 } from "lucide-react"
import { FacturaVentaPopupPersona } from "./FacturaVentaPopupPersona"
import { toast } from "sonner"
import { FacturaVentaSave } from "~services/facturaventa"
import { InformeIngresoGastoAdapterSave } from "../adapter/FacturaVentaAdapter"

export const FacturaVentaForm = ({onShowModel, data}) => {
  const {
    facturaVentaId, facturaVentaEstado, setFacturaVentaEstado, 
    facturaVentaFecha, setFacturaVentaFecha, facturaNumero, setFacturaNumero, 
    cantidadModel, setCantidadModel, unidadMedidaModel, setUnidadMedidaModel,
    importeTotalModel, setImporteTotalModel,
    detraccionTotalModel, setDetraccionTotalModel,
    pendientePagoModel, setPendientePagoModel,seleccionEstado,
    sembradorSeleccionadosList, setSembradorSeleccionadosList,
    showPopup, setShowPopup,
  } = useFacturaVentaInitialForm(data)
  const { estadoList } = useFacturaVentaEstado()
  const {validate, errores} = useFacturaVentaValidation()
    
  const headers = ['Sembrador', 'Acción']

  const handleSelectionEstadoChange = (option) =>
    setFacturaVentaEstado((option==''|| isNaN(option))?'':option)

  const handleShowModel = () => setShowPopup(true)
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      const adaptedData = data.map(item => ({
        personaId: item.personId,
        personaNombre: item.proveedorNombre
      }))
      if(sembradorSeleccionadosList.length > 0){
        const mergedArray = [
          ...sembradorSeleccionadosList,
          ...adaptedData
            .filter((item2) => !sembradorSeleccionadosList.some((item1) => item1.personaId === item2.personId))
        ]
        setSembradorSeleccionadosList(mergedArray)
      } else setSembradorSeleccionadosList(adaptedData)      
    }
    setShowPopup(false)
  }
  const eliminarSembrador= (data)=>
    setSembradorSeleccionadosList(sembradorSeleccionadosList.filter(product => product.personaId !== data.personaId))
  
  const handleGuardar = async(e) => {    
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const valueData={
      facturaVentaId, facturaVentaEstado, 
      facturaVentaFecha, facturaNumero, 
      cantidadModel, unidadMedidaModel,
      importeTotalModel, 
      detraccionTotalModel,
      pendientePagoModel,
      sembradorSeleccionadosList,      
    }
    const { isValid } = validate({values:valueData})
    
    if(isValid){
      const save = InformeIngresoGastoAdapterSave(valueData)    
      console.log(save)
      const response = await FacturaVentaSave(facturaVentaId > 0? 'PUT':'POST', save)
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
    onShowModel({result:false})
  }
  return (
    <>
      <SectionModel title={(facturaVentaId > 0 ? 'Información de':'Registrar') + ' Factura Venta'}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3">
          <FilterOption htmlFor={'FechaModel'} name={'Fecha de Emisión'}>
            <InputDateCustom fechaValue={facturaVentaFecha}
              valueError={errores.fecha}
              setFechaValue={setFacturaVentaFecha} readOnly={facturaVentaId >0} />
            {errores.fecha && <MessageValidationInput mensaje={errores.fecha}/>}
          </FilterOption>
          <FilterOption htmlFor="NumeroModel" name={'N° Factura'}>
            <InputTextCustom textValue={facturaNumero} placeholder='Ingrese el número de la factura' 
              onChange={setFacturaNumero} valueError={errores.numero} readOnly={facturaVentaId>0} />
            {errores.numero && <MessageValidationInput mensaje={errores.numero}/> }
          </FilterOption>
          <FilterOption htmlFor={'CantidadModel'} name={'Cantidad'}>
            <InputDecimalCustom readOnly={facturaVentaId>0} onChange={setCantidadModel}
              decimales={2} textValue={cantidadModel} valueError={errores.cantidad}
              placeholder='Ejm: 100.56' />
            {errores.cantidad && <MessageValidationInput mensaje={errores.cantidad}/>}
          </FilterOption>
          <FilterOption htmlFor="UnidadMedidaModel" name={'Unidad Medida'}>
            <InputTextCustom textValue={unidadMedidaModel} placeholder='Ingrese la unidad de medida' 
              onChange={setUnidadMedidaModel} valueError={errores.unidadMedida} readOnly={facturaVentaId>0} />
            {errores.unidadMedida && <MessageValidationInput mensaje={errores.unidadMedida}/> }
          </FilterOption>
          <FilterOption htmlFor={'ImporteTotalModel'} name={'Importe Total'}>
            <InputDecimalCustom readOnly={facturaVentaId>0} onChange={setImporteTotalModel}
              decimales={2} textValue={importeTotalModel} valueError={errores.importe}
              placeholder='Ejm: 100.56' />
            {errores.importe && <MessageValidationInput mensaje={errores.importe}/>}
          </FilterOption>
          <FilterOption htmlFor={'DetraccionModel'} name={'Monto Detracción'}>
            <InputDecimalCustom readOnly={facturaVentaId>0} onChange={setDetraccionTotalModel}
              decimales={2} textValue={detraccionTotalModel} valueError={errores.detraccion}
              placeholder='Ejm: 100.56' />
            {errores.detraccion && <MessageValidationInput mensaje={errores.detraccion}/>}
          </FilterOption>
          <FilterOption htmlFor={'PendientePagoModel'} name={'Pendiente Pago'}>
            <InputDecimalCustom readOnly={facturaVentaId>0} onChange={setPendientePagoModel}
              decimales={2} textValue={pendientePagoModel} valueError={errores.pendientePago}
              placeholder='Ejm: 100.56' />
            {errores.pendientePago && <MessageValidationInput mensaje={errores.pendientePago}/>}
          </FilterOption>
          <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
            <ComboBoxCustom initialOptions={estadoList} selectedOption={seleccionEstado}
              onSelectionChange={handleSelectionEstadoChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.estado ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"} allDisabled={facturaVentaId > 0}
            />
            {errores.estado && <p className="text-red-500 text-sm">{errores.estado}</p>}
          </FilterOption>
        </div>
      </SectionModel>
      <TableContainerCustom>
        <TableHeaderCustom grid>
        <div className={'grid grid-cols-1 gap-6 md:flex justify-between items-center mb-6 '}>
          <TitleCustom titulo={'Lista de Sembradores'}  />  
          <ButtonCustom extraClassName={`${facturaVentaId > 0 ? 'hidden' : ''} `} 
              name={'Seleccionar'} onClick={handleShowModel} />    
        </div>
        </TableHeaderCustom>
        <TableBodyCustom headers={headers}>
          {sembradorSeleccionadosList.length > 0 ? (
            sembradorSeleccionadosList.map((detalle) => (
              <tr key={detalle.personaId} >
                <TableTd hidden>{detalle.personaId}</TableTd>
                <TableTd>{detalle.personaNombre}</TableTd>
                <TableTd>
                  { facturaVentaId > 0 || (
                  <TableButton className={'text-red-400 hover:text-red-300 '} 
                    onRowSelect={()=>eliminarSembrador(detalle)}>
                    <Trash2 size={18} />
                  </TableButton>
                  )}
                </TableTd>
              </tr>
            ))
          ): ( <NoRegistros colSpan={headers.length}/> )}
        </TableBodyCustom>
        {errores.detalle && <MessageValidationInput mensaje={errores.detalle}/>}
      </TableContainerCustom>
      <Footer>
        {facturaVentaId > 0 || ( <FooterButton accion={handleGuardar} name={'Guardar'} /> )}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup && <FacturaVentaPopupPersona headers={headers} onShowModel={resspuestaShowModel} />}
    </>
  )
}