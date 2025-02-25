import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom,
  InputDecimalCustom, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, 
  TableBodyCustom, TableButton, TableContainerCustom, TableFooterCustom, TableHeaderCustom,
  TableTd, TitleCustom
} from "~components/common"
import { convertirFechaDDMMYYYY } from "~utils/index"
import { servicioTransporteSave } from "~services/servicio"
import { ServicioTransportePopup } from "./ServicioTransportePopup"
import { 
  ServicioTransporteAdapterSave 
} from "../adapter/ServicioTransporteAdapter"
import { useServicioTransporteForm, useServicioTransporteValidation } from "../hooks"

export const ServicioTransporteModal = ({onShowModel, data}) => {
  const {
      carguilloList, servicioIdModel, 
      fechaModel, setFechaModel, carguilloIdModel, setCarguilloIdModel,
      servicioPrecioModel, setServicioPrecioModel, sumaPesoBrutoModel, 
      totalModel, ticketSelected, setTicketSelected,
      servicioDescripcion, setServicioDescripcion, showPopup, setShowPopup,
      fechaPagadoModel, setFechaPagadoModel, pagando, 
      pagadoModel, setPagadoModel, bancoModel, setBancoModel,
      cteModel, setCteModel, totalPagadoModel,
      efectivo, setEfectivo, detallePagado, setDetallePagado,
      pendientePagarModel, seleccionCarguillo, headers, headersPagos
    } = useServicioTransporteForm(data)
    
  const {validate, errores} = useServicioTransporteValidation()

  const handleSelectionCarguilloChange = (option) => {
    setCarguilloIdModel(option)
    setTicketSelected([])
  }
  const handleShowModel = () => {
    const { isValid } = validate({
      values: { carguilloIdModel }
    })
    if(isValid){
      setShowPopup(true)
    }
  }
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      if(ticketSelected.length > 0){
        const mergedArray = [
          ...ticketSelected,
          ...data.filter((item2) => !ticketSelected.some((item1) => item1.ticketId === item2.ticketId)),
        ]
        setTicketSelected(mergedArray)
      }else setTicketSelected(data)
    }
    setShowPopup(false)
  }
  const handleAgregarPagos = (e) => {
    e.preventDefault()
    const { isValid } = validate({
      payment:true,
      values:{ fechaPagadoModel, pagadoModel, cteModel, efectivo,pendientePagarModel, carguilloIdModel }
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
      setPagadoModel(0)
      setBancoModel('')
      setCteModel('')
      setEfectivo(false)
    }
  }
  const onRowDeletePagos = (data) => {
    if (typeof data.detallePagoId === "string" && data.detallePagoId.startsWith("temp")) {
      setDetallePagado(detallePagado.filter((item) => item.detallePagoId !== data.detallePagoId))
    }
  }
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    let servicioModel = {
      servicioIdModel, servicioDescripcion,
      fechaModel, carguilloIdModel,
      servicioPrecioModel, sumaPesoBrutoModel,
      totalModel, ticketSelected, detallePagado,
      totalPagadoModel, pendientePagarModel
    }
    const { isValid } = validate({
      save:true,
      values: servicioModel
    })
    if (isValid) {
      const servicioSave = await servicioTransporteSave({
        method:servicioIdModel >0 ?'PUT':'POST', 
        servicioTransporte: ServicioTransporteAdapterSave(servicioModel)
      })
      if(!servicioSave.result) 
        return toast.error(servicioSave.message, { id: toastLoadingCustom, style: { color:'red' }})
      toast.success(servicioSave.message,{id: toastLoadingCustom})
      return onShowModel(servicioSave)
    }
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const onRowDelete= (data)=>{
    setTicketSelected(ticketSelected.filter(ticket => ticket.ticketId !== data.ticketId))
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({servicioTransporteId:0})
  }
  return (
    <>
      <SectionModel title={(servicioIdModel > 0 ? 'Información':'Registrar') + ' Servicio Transporte'}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pt-3'>
          <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
            <InputDateCustom fechaValue={fechaModel}
              valueError={errores.fechaModel ? true: false}
              setFechaValue={setFechaModel} readOnly={servicioIdModel > 0} />
            {errores.fechaModel && <MessageValidationInput mensaje={errores.fechaModel}/>}
          </FilterOption>
          <FilterOption htmlFor={'CarguilloModel'} name={'Transportista'}>
            <ComboBoxCustom  initialOptions={carguilloList} selectedOption={seleccionCarguillo} 
              onSelectionChange={handleSelectionCarguilloChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.carguillo ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              allDisabled={servicioIdModel > 0}
              />
            {errores.carguillo && <MessageValidationInput mensaje={errores.carguillo}/>}
          </FilterOption>
          <FilterOption htmlFor={'TransportePrecioModel'} name={'Precio'}>
            <InputDecimalCustom onChange={setServicioPrecioModel}
              valueError={errores.precio} readOnly={servicioDescripcion !='Activo'}
              placeholder={'Ejm: 10.55'} textValue={servicioPrecioModel} />
            {errores.precio && <MessageValidationInput mensaje={errores.precio}/>}
          </FilterOption>
          <FilterOption htmlFor={'TransportePrecioModel'} name={'Estado'}>
            <InputTextCustom onChange={setServicioDescripcion}
              textValue={servicioDescripcion} readOnly={true} />
          </FilterOption>
        </div>
      </SectionModel>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Lista de Tickets Seleccionados'}  />
          <ButtonCustom name={'Agregar'} onClick={handleShowModel} extraClassName={servicioIdModel > 0 ? 'hidden' : ''}/>
        </TableHeaderCustom>
        <TableBodyCustom headers={headers}>
          {ticketSelected.length > 0 ? (
            ticketSelected.map((ticket) => (
              <tr key={ticket.ticketId} >
                 <TableTd hidden>{ticket.ticketId}</TableTd>
                <TableTd>{ticket.ticketIngenio}</TableTd>
                <TableTd>{ticket.ticketViaje}</TableTd>
                <TableTd>{ticket.ticketFecha}</TableTd>
                <TableTd>{ticket.ticketVehiculo}</TableTd>
                <TableTd>{ticket.ticketCamion}</TableTd>
                <TableTd>{ticket.ticketTransportista}</TableTd>
                <TableTd>{ticket.ticketVehiculoPeso}</TableTd>
                <TableTd>{ticket.ticketCamionPeso}</TableTd>
                <TableTd>{ticket.ticketPesoBruto}</TableTd> 
                <TableTd>{ticket.paleroNombre}</TableTd>
                <TableTd>{ticket.ticketCampo}</TableTd>
                <TableTd>{ticket.ticketEstadoDescripcion}</TableTd>
                <TableTd hidden={servicioIdModel > 0}>
                  <TableButton className='text-red-400 hover:text-red-300'
                    onRowSelect={()=>onRowDelete(ticket)} >
                    <Trash2 size={18} />
                  </TableButton>
                </TableTd>              
              </tr>
            ))
          ): ( <NoRegistros colSpan={headers.length}/> )}
        </TableBodyCustom>
        <TableFooterCustom>  
          <FilterOption htmlFor={'PesoBrutoModel'} name={'Suma Peso Bruto'}>
            <InputTextCustom textValue={sumaPesoBrutoModel} placeholder='Automático'
              valueError={errores.suma} readOnly />
            {errores.suma && <MessageValidationInput mensaje={errores.suma}/>}
          </FilterOption>
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
            <ButtonCustom extraClassName={`${servicioDescripcion =='Activo' && pagando ? '' : 'hidden'} max-h-9 mt-6 md:w-28 `} name={'Agregar'} 
              onClick={handleAgregarPagos}  />
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
                    onRowSelect={()=>onRowDeletePagos(item)}>
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
        {servicioDescripcion =='Activo' && (
          <FooterButton accion={handleGuardar} name={'Guardar'} />
        )}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup ? <ServicioTransportePopup onShowModel={resspuestaShowModel} headers={headers} carguilloId={carguilloIdModel}/>    : ''}
    </>
  )
}
