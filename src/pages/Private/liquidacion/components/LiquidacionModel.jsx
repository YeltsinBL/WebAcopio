import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, 
  InputDecimalCustom, InputNumberCustom, InputTextCustom, MessageValidationInput, NoRegistros, 
  SectionModel, TableBodyCustom, TableButton, TableContainerCustom, TableFooterCustom, 
  TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { 
  convertirFechaDDMMYYYY, convertirFechaToISO, convertirFechaToYMD, 
} from "~utils/index"
import { liquidacionSave } from "~services/liquidacion"
import CorteTicketPopup from "~components/corte/CorteTicketPopup"
import { useLiquidacionForm, useLiquidacionValidation } from "../hooks"
import { LiquidacionAdapterSave } from "../adapter/LiquidacionAdapter"

export function LiquidacionModel({onShowModel, data}) {
  const {
    proveedoresALiquidarList, proveedoresComboList, 
    ticketsSeleccionadosList, setTicketsSeleccionadosList,
    financiamientoList, setFinanciamientoList,
    adicionalesList, setAdicionalesList,
    liquidacionIdModel, personaIdModel, setPersonaIdModel,
    proveedorIdModel, setProveedorIdModel,
    tierraIdModel, setTierraIdModel,
    fechaInicioModel, setFechaInicioModel,
    fechaFinModel, setFechaFinModel,
    campoModel, setCampoModel, utModel, setUtModel,
    sumaPesoBrutoModel, toneladasPesosNetosModel, setToneladasPesosNetosModel,
    pCompraModel, setpComprasModel, toneladasTotalModel, 
    financiamientoFechaModel, setFinanciamientoFechaModel,
    financiamientoFechaFinModel, setFinanciamientoFechaFinModel,
    financiamientoACuentaModel, setFinanciamientoACuentaModel,
    financiamientoTiempoModel, setFinanciamientoTiempoModel,
    financiamientoInteresMesModel, setFinanciamientoInteresMesModel,
    financiamientoInteresModel, setFinanciamientoInteresModel,
    financiamientoTotalModel, financiamientoACuentaTotal, 
    liquidacionPorPagar, liquidacionEstado, 
    adicionalesMotivoModel, setAdicionalesMotivoModel,
    adicionalesTotalModel, setAdicionalesTotalModel,
    adicionalesTotal, showPopup, setShowPopup, seleccionPersona,
    headers, headersFinanciamiento, headersAdicionales,
  } = useLiquidacionForm(data)

 const {validate, errores} = useLiquidacionValidation()

  const handleSelectionUTChange = (option) =>{
    setPersonaIdModel(option)
    const proveedor = proveedoresALiquidarList.find(p => p.personId == option)
    setTierraIdModel(proveedor.tierraId)
    setCampoModel(proveedor.tierraCampo)
    setUtModel(proveedor.proveedorUT)
    setProveedorIdModel(proveedor.proveedorId)
  }
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      let mergedArray = []
      if(ticketsSeleccionadosList.length > 0){
        mergedArray = [
          ...ticketsSeleccionadosList,
          ...data.filter((item2) => !ticketsSeleccionadosList.some((item1) => item1.ticketId === item2.ticketId)),
        ]
      }else mergedArray = data
      const sortedArray = mergedArray.sort((a, b) => {
        const dateA = convertirFechaToISO(a.ticketFecha)
        const dateB = convertirFechaToISO(b.ticketFecha)
        return dateA - dateB
      })
      setTicketsSeleccionadosList(sortedArray)

      const { minDate, maxDate } = sortedArray.reduce(
        (acc, current) => {
          const currentFecha = convertirFechaToISO(current.ticketFecha)
          if (currentFecha < acc.minDate) acc.minDate = currentFecha
          if (currentFecha > acc.maxDate) acc.maxDate = currentFecha
          return acc
        },
        { minDate: convertirFechaToISO(data[0].ticketFecha),
          maxDate: convertirFechaToISO(data[0].ticketFecha) }
      )
      setFechaInicioModel(convertirFechaToYMD(minDate))
      setFechaFinModel(convertirFechaToYMD(maxDate))
    }
    setShowPopup(false)
  }
  const handleAddTickerts = async(e)=>{
    e.preventDefault()
    const {isValid} = validate({tickets:true, values: { personaIdModel, campoModel, utModel }})
    if(isValid) setShowPopup(true)    
  }
  const onRowDeleteTicket= (data)=>{
    setTicketsSeleccionadosList(ticketsSeleccionadosList.filter(ticket => ticket.ticketId !== data.ticketId))
  }
  const handleAgregarFinanciamiento = (e) => {
    e.preventDefault()
    const {isValid} = validate({financiamiento:true, values: { 
      financiamientoFechaModel, financiamientoFechaFinModel,
      financiamientoACuentaModel, financiamientoInteresMesModel 
    }})
    if (isValid) {
      const updateFinanciamientoList = [...financiamientoList, {
        liquidacionFinanciamientoId: `temp-${Date.now()}`,
        liquidacionFinanciamientoFecha: convertirFechaDDMMYYYY(financiamientoFechaModel),
        liquidacionFinanciamientoACuenta: financiamientoACuentaModel,
        liquidacionFinanciamientoTiempo: financiamientoTiempoModel,
        liquidacionFinanciamientoInteresMes: financiamientoInteresMesModel,
        liquidacionFinanciamientoInteres: financiamientoInteresModel,
        liquidacionFinanciamientoTotal: financiamientoTotalModel,
        liquidacionFinanciamientoStatus: true
      }]
      setFinanciamientoList(updateFinanciamientoList)
    }
  }
  const onRowDeleteFinanciamiento = (financiamiento) => {
    if (typeof financiamiento.liquidacionFinanciamientoId === "string" && financiamiento.liquidacionFinanciamientoId.startsWith("temp")) {
      setFinanciamientoList(financiamientoList.filter((item) => item.liquidacionFinanciamientoId !== financiamiento.liquidacionFinanciamientoId))
    }else{
      setFinanciamientoList(
        financiamientoList.map((item) => item.liquidacionFinanciamientoId == financiamiento.liquidacionFinanciamientoId 
        ? {...item, liquidacionFinanciamientoStatus: !item.liquidacionFinanciamientoStatus}: item)
      )
    }
  }
  const handleAgregarAdicionales = (e) => {
    e.preventDefault()
    const {isValid} = validate({adicional:true, values: { 
      adicionalesMotivoModel, adicionalesTotalModel
    }})
    if (isValid) {
      const updateAdicionalesList = [...adicionalesList, {
        liquidacionAdicionalId: `temp-${Date.now()}`,
        liquidacionAdicionalMotivo: adicionalesMotivoModel,
        liquidacionAdicionalTotal: adicionalesTotalModel,
        liquidacionAdicionalStatus: true
      }]
      setAdicionalesList(updateAdicionalesList)
    }
  }
  const onRowDeleteAdicionales = (adicionales) => {
    if (typeof adicionales.liquidacionAdicionalId === "string" && adicionales.liquidacionAdicionalId.startsWith("temp")) {
      setAdicionalesList(adicionalesList.filter((item) => item.liquidacionAdicionalId !== adicionales.liquidacionAdicionalId))
    } else{
      setAdicionalesList(
        adicionalesList.map(item => item.liquidacionAdicionalId == adicionales.liquidacionAdicionalId ?{
          ...item, liquidacionAdicionalStatus: !item.liquidacionAdicionalStatus
        }: item)
      )
    }
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')    
    let liquidacion = {
      fechaInicioModel, fechaFinModel,
      toneladasPesosNetosModel, pCompraModel,
      toneladasTotalModel, financiamientoACuentaTotal,
      financiamientoList, adicionalesList,
      adicionalesTotal, liquidacionPorPagar,
      liquidacionIdModel, personaIdModel, tierraIdModel,
      utModel, proveedorIdModel, ticketsSeleccionadosList,
      sumaPesoBrutoModel, campoModel,
    }
    const {isValid} = validate({tickets:true, values: liquidacion})
    if (isValid) {
      const save = await liquidacionSave({
        method: liquidacionIdModel>0?'PUT':'POST', 
        liquidacion: LiquidacionAdapterSave(liquidacion)})
      if(!save.result) 
        return toast.error(save.message, { id: toastLoadingCustom, style: { color:'red' }})
      toast.success(save.message, {id: toastLoadingCustom})
      return onShowModel(save)
    }
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({result:false})
  }

  return (
    <>
      <SectionModel title={(liquidacionIdModel > 0 ? 'Información de':'Registrar') + ' Liquidación'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <FilterOption htmlFor={'SembradorModel'} name={'Sembrador'}>
            <ComboBoxCustom  initialOptions={proveedoresComboList} selectedOption={seleccionPersona}
              onSelectionChange={handleSelectionUTChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.ut ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"} allDisabled={liquidacionIdModel > 0}
            />
            {errores.ut && <p className="text-red-500 text-sm">{errores.ut}</p>}
          </FilterOption>
          <FilterOption htmlFor={'campoModel'} name={'Campo'}>
            <InputTextCustom placeholder='Automático ' textValue={campoModel} readOnly />
          </FilterOption>
          <FilterOption htmlFor={'utModel'} name={'UT'}>
            <InputTextCustom placeholder={'Automático'} textValue={utModel} readOnly/>
          </FilterOption>
        </div>
      </SectionModel>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Selecciona los tickes'}  />
          { liquidacionIdModel > 0 || (
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} onClick={handleAddTickerts} />
          )}
        </TableHeaderCustom>
        <TableBodyCustom headers={headers}>
          {ticketsSeleccionadosList.length > 0 ? (
            ticketsSeleccionadosList.map((ticket) => (
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
                <TableTd>
                { liquidacionIdModel > 0 || (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteTicket(ticket)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            )
          ))
          :(<NoRegistros colSpan={headers.length - 1} />)}
        </TableBodyCustom>
        <TableFooterCustom>          
          <FilterOption htmlFor={'FechaInicioModel'} name={'Fecha Inicio'}>
            <InputDateCustom fechaValue={fechaInicioModel}
              valueError={errores.fechaInicio ? true: false}
              setFechaValue={setFechaInicioModel} readOnly={liquidacionEstado != 'Activo'} />
            {errores.fechaInicio && <p className="text-red-500 text-sm">{errores.fechaInicio}</p>}
          </FilterOption>
          <FilterOption htmlFor={'FechaFinalModel'} name={'Fecha Final'}>
            <InputDateCustom fechaValue={fechaFinModel}
              valueError={errores.fechaFin ? true: false}
              setFechaValue={setFechaFinModel} readOnly={liquidacionEstado != 'Activo'} />
            {errores.fechaFin && <p className="text-red-500 text-sm">{errores.fechaFin}</p>}
          </FilterOption>
          <FilterOption html={'PesoBrutoModel'} name={'Peso Bruto'}>
            <InputTextCustom textValue={sumaPesoBrutoModel} placeholder="Automático" readOnly />
          </FilterOption>
          <FilterOption htmlFor={'ToneladasPesoNetoModel'} name={'Peso Neto'}>
            <InputDecimalCustom  textValue={toneladasPesosNetosModel}onChange={setToneladasPesosNetosModel}
              valueError={errores.toneladasPesosNetos}
              placeholder={'Ejm: 10.55'} readOnly={liquidacionEstado != 'Activo'} />
            {errores.toneladasPesosNetos && <p className="text-red-500 text-sm">{errores.toneladasPesosNetos}</p>}
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>

      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Toneladas por Pagar'}  />
        </TableHeaderCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'ToneladasPesoNetoModel'} name={'Pesos Netos'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={toneladasPesosNetosModel} />
          </FilterOption>
          <FilterOption htmlFor={'ToneladasPCompraModel'} name={'P. Compra'}>
            <InputDecimalCustom onChange={setpComprasModel} decimales={2}
              textValue={pCompraModel} valueError={errores.pCompra} 
              placeholder="Ejm: 115.00" readOnly={liquidacionEstado != 'Activo'} />
            {errores.pCompra && <MessageValidationInput mensaje={errores.pCompra}/>}
          </FilterOption>
          <FilterOption htmlFor={'ToneladasTotalModel'} name={'Total'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={toneladasTotalModel} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>

      <TableContainerCustom>
        <TableHeaderCustom grid>
          <TitleCustom titulo={'Financiamiento'}  />
          <TableFooterCustom>
            <FilterOption htmlFor={'FinanciamientoFechaInicioModel'} name={'Fecha Inicio'}>
              <InputDateCustom fechaValue={financiamientoFechaModel}
                valueError={errores.financiamientoFecha}
                setFechaValue={setFinanciamientoFechaModel} readOnly={liquidacionEstado != 'Activo'} />
              {errores.financiamientoFecha && <MessageValidationInput mensaje={errores.financiamientoFecha}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoFechaFinModel'} name={'Fecha Fin'}>
              <InputDateCustom fechaValue={financiamientoFechaFinModel}
                valueError={errores.financiamientoFechaFin}
                setFechaValue={setFinanciamientoFechaFinModel} readOnly={liquidacionEstado != 'Activo'} />
              {errores.financiamientoFechaFin && <MessageValidationInput mensaje={errores.financiamientoFechaFin}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoACuenta'} name={'A Cuenta'}>
              <InputDecimalCustom onChange={setFinanciamientoACuentaModel} decimales={2}
                textValue={financiamientoACuentaModel} 
                valueError={errores.financiamientoACuenta} 
                placeholder="Ejm: 115.00" readOnly={liquidacionEstado != 'Activo'} />
              {errores.financiamientoACuenta && <MessageValidationInput mensaje={errores.financiamientoACuenta}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoTiempo'} name={'Tiempo/Días'}>
              <InputNumberCustom onChange={setFinanciamientoTiempoModel}
                textValue={financiamientoTiempoModel} 
                valueError={errores.financiamientoTiempo} 
                placeholder="Ejm: 12" readOnly />
              {errores.financiamientoTiempo && <MessageValidationInput mensaje={errores.financiamientoTiempo}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoInteresMes'} name={'Interes Mes %'}>
              <InputDecimalCustom onChange={setFinanciamientoInteresMesModel} decimales={2}
                textValue={financiamientoInteresMesModel} 
                valueError={errores.financiamientoInteresMes} 
                placeholder="Ejm: 115.00" readOnly={liquidacionEstado != 'Activo'} />
              {errores.financiamientoInteresMes && <MessageValidationInput mensaje={errores.financiamientoInteresMes}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoInteres'} name={'Interes S/.'}>
              <InputDecimalCustom onChange={setFinanciamientoInteresModel} decimales={2}
                textValue={financiamientoInteresModel} 
                valueError={errores.financiamientoInteres} readOnly
                placeholder="Ejm: 115.00"/>
              {errores.financiamientoInteres && <MessageValidationInput mensaje={errores.financiamientoInteres}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoTotal'} name={'Total'}>
              <InputDecimalCustom decimales={2}
                textValue={financiamientoTotalModel} 
                valueError={errores.financiamientoTotal} readOnly
                placeholder="Automático"/>
            </FilterOption>
            { liquidacionEstado == 'Activo' && (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} name={'Agregar'} onClick={handleAgregarFinanciamiento} />
            )}
          </TableFooterCustom>
        </TableHeaderCustom>
        <TableBodyCustom headers={headersFinanciamiento}>
        {financiamientoList.length > 0 ? (
            financiamientoList.filter((item) => item.liquidacionFinanciamientoStatus === true)
            .map((item) => (
              <tr key={item.liquidacionFinanciamientoId}>
                <TableTd>{item.liquidacionFinanciamientoFecha}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoACuenta}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoTiempo}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoInteresMes}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoInteres}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoTotal}</TableTd>
                <TableTd>
                { liquidacionEstado == 'Activo' && (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteFinanciamiento(item)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            ))
        ):(<NoRegistros colSpan={headersFinanciamiento.length} />)}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'FinanciamientoACuentaTotalModel'} name={'A Cuenta Total'}>
            <InputDecimalCustom decimales={2} readOnly
              textValue={financiamientoACuentaTotal}
              placeholder="Automático"/>
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>

      <TableContainerCustom>
        <TableHeaderCustom grid>
          <TitleCustom titulo={'Adicionales'}  />
          <TableFooterCustom>
            <FilterOption htmlFor={'AdicionalMotivoModel'} name={'Motivo'}>
              <InputTextCustom textValue={adicionalesMotivoModel} placeholder="Ingresa un motivo"
                valueError={errores.adicionalesMotivo}
                onChange={setAdicionalesMotivoModel} readOnly={liquidacionEstado != 'Activo'} />
              {errores.adicionalesMotivo && <MessageValidationInput mensaje={errores.adicionalesMotivo}/>}
            </FilterOption>
            <FilterOption htmlFor={'AdicionalTotalModel'} name={'Monto'}>
              <InputDecimalCustom onChange={setAdicionalesTotalModel} decimales={2}
                textValue={adicionalesTotalModel} 
                valueError={errores.adicionalTotalModel} 
                placeholder="Ejm:490.00" readOnly={liquidacionEstado != 'Activo'} />
              {errores.adicionalTotalModel && <MessageValidationInput mensaje={errores.adicionalTotalModel}/>}
            </FilterOption>
            { liquidacionEstado == 'Activo' && (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} name={'Agregar'} onClick={handleAgregarAdicionales} />
            )}
          </TableFooterCustom>
        </TableHeaderCustom>
        <TableBodyCustom headers={headersAdicionales}>
        {adicionalesList.length > 0 ? (
            adicionalesList.filter((item) => item.liquidacionAdicionalStatus === true)
            .map((item) => (
              <tr key={item.liquidacionAdicionalId}>
                <TableTd>{item.liquidacionAdicionalMotivo}</TableTd>
                <TableTd>{item.liquidacionAdicionalTotal}</TableTd>
                <TableTd>
                { liquidacionEstado == 'Activo' && (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteAdicionales(item)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            ))
        ):(<NoRegistros colSpan={headersAdicionales.length} />)}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'AdicionalesTotal'} name={'Total'}>
            <InputDecimalCustom decimales={2} readOnly
              textValue={adicionalesTotal}
              placeholder="Automático"/>
          </FilterOption>
          <FilterOption htmlFor={'LiquidacionPorPagarModel'} name={'Por Pagar'}>
            <InputDecimalCustom readOnly decimales={2}
              placeholder='Automático' textValue={liquidacionPorPagar} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <Footer>
        { liquidacionEstado == 'Activo' && ( <FooterButton accion={handleGuardar} name={'Guardar'} /> ) }
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup ? <CorteTicketPopup onShowModel={resspuestaShowModel} headers={headers} proveedorId={proveedorIdModel}/>    : ''}
    </>
  )
}