import { ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, 
  InputDateCustom, InputDecimalCustom, InputTextCustom, MessageValidationInput, 
  NoRegistros, SectionModel, TableBodyCustom, TableButton, TableContainerCustom, 
  TableFooterCustom, TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { Trash2 } from "lucide-react"
import { 
  useInformeIngresoGastoInitialForm, 
  useInformeIngresoGastoValidation,
  useSembrador
} from "../hooks"
import { convertirFechaDDMMYYYY } from "~utils/index"
import { InformeLiquidacionPopup } from "./InformeLiquidacionPopup"
import { InformeServicioPopup } from "./InformeServicioPopup"
import { InformeCortePopup } from "./InformeCortePopup"
import { InformeIngresoGastoAdapterSave } from "../adapter/InformeIngresoGastoAdapter"
import { informeSave } from "~services/informe"
import { toast } from "sonner"

export const InformeIngresoGastoForm = ({onShowModel, data}) => {
  const {
    informeId, personaIdModel, setPersonaIdModel,
    proveedorIdModel, setProveedorIdModel,
    tierraIdModel, setTierraIdModel,
    campoModel, setCampoModel,
    utModel, setUtModel, informeFecha, setInformeFecha,
    seleccionPersona,
    facturaFechaModel, setFacturaFechaModel,
    facturaNumeroModel, setFacturaNumeroModel,
    facturaImporteModel, setFacturaImporteModel,
    facturaList, setFacturaList,
    informeEstado, facturaTotalModel,
    showPopupServicioTransporte, setShowPopupServicioTransporte,
    showPopupServicioPalero, setShowPopupServicioPalero,
    showPopupCorte, setShowPopupCorte,
    showPopupLiquidacion, setShowPopupLiquidacion,
    servicioTransporteSeleccionadosList, setServicioTransporteSeleccionadosList,
    servicioPaleroSeleccionadosList, setServicioPaleroSeleccionadosList,
    corteSeleccionadosList, setCorteSeleccionadosList,
    liquidacionSeleccionadosList, setLiquidacionSeleccionadosList,
    sumaPrecioTransporteModel, sumaPesoBrutoTransporteModel, sumaTotalTransporteModel,
    sumaPesoBrutoPaleroModel, sumaPrecioPaleroModel, sumaTotalPaleroModel,
    sumaPesoBrutoCorteModel, setSumaPesoBrutoCorteModel, sumaPrecioCorteModel,
    sumaTotalCorteModel, sumaPesoBrutoLiquidacionModel, sumaPrecioLiquidacionModel,
    sumaTotalLiquidacionModel, sumaPesoNetoLiquidacionModel, sumaPesoBrutoImpuestosModel, setSumaPesoBrutoImpuestosModel,
    sumaPrecioImpuestosModel, setSumaPrecioImpuestosModel, sumaTotalImpuestosModel, 
    sumaPesoBrutoOtrosGastosModel, setSumaPesoBrutoOtrosGastosModel,
    sumaPrecioOtrosGastosModel, setSumaPrecioOtrosGastosModel,
    sumaTotalOtrosGastosModel, costoTotalModel, utilidadTotalModel,
    resultadoModel, setResultadoModel,
  } = useInformeIngresoGastoInitialForm(data)
  
  const { sembradorList, proveedoresALiquidarList } = useSembrador()
  const {validate, errores} = useInformeIngresoGastoValidation()
  const headersInformeFacturas= ['Fecha', 'Factura','Importe','Acciones']
  const headersServicio =['Fecha', 'Carguillo', 'Precio', 'Peso Bruto','Total', 'Acciones']
  const headersCorte = ['Fecha', 'UC', 'Campo', 'Precio', 'Peso Bruto', 'Total', 'Acciones']
  const headersLiquidacion = ['Sembrador','Campo','UT','Fecha Inicio', 'Fecha Final','Peso Bruto',
    'Peso Neto', 'Tonelada Precio Compra', 'Toneladas Por Pagar Total', 'Seleccione'
  ]

  const handleSelectionUTChange = (option) =>{
    setPersonaIdModel(option)
    const proveedor = proveedoresALiquidarList.find(p => p.personId == option)
    setTierraIdModel(proveedor.tierraId)
    setCampoModel(proveedor.tierraCampo)
    setUtModel(proveedor.proveedorUT)
    setProveedorIdModel(proveedor.proveedorId)
  }
  const handleAgregarFactura = (e) => {
    e.preventDefault()
    const { isValid } = validate({factura: true, values:{facturaFechaModel,
      facturaNumeroModel, facturaImporteModel
    }})
    if (isValid) {
      const updateFacturaList = [...facturaList, {
        informeFacturaId: `temp-${Date.now()}`,
        informeFacturaFecha: convertirFechaDDMMYYYY(facturaFechaModel),
        informeFacturaNumero: facturaNumeroModel,
        informeFacturaImporte: facturaImporteModel,
        informeFacturaStatus: true
      }]
      setFacturaList(updateFacturaList)
    }
  }
  const onRowDeleteFactura = (financiamiento) => {
    if (typeof financiamiento.informeFacturaId === "string" && financiamiento.informeFacturaId.startsWith("temp")) {
      setFacturaList(facturaList.filter((item) => item.informeFacturaId !== financiamiento.informeFacturaId));
    }else{
      setFacturaList(
        facturaList.map((item) => item.informeFacturaId == financiamiento.informeFacturaId 
        ? {...item, informeFacturaStatus: !item.informeFacturaStatus}: item)
      )
    }
  }

  const handleAddServicioTransporte = async(e)=>{
    e.preventDefault()
    const { isValid } = validate({servicio:true, values:{
      personaIdModel, campoModel, utModel
    }})
    if(isValid){
      setShowPopupServicioTransporte(true)
    }
  }
  const handleAddServicioPaleros = async(e)=>{
    e.preventDefault()
    const { isValid } = validate({servicio:true, values:{
      personaIdModel, campoModel, utModel
    }})
    if(isValid) setShowPopupServicioPalero(true)    
  }
  const handleAddCortes = async(e)=>{
    e.preventDefault()
    const { isValid } = validate({servicio:true, values:{
      personaIdModel, campoModel, utModel
    }})
    if(isValid) setShowPopupCorte(true)
    
  }
  const handleAddLiquidaciones = async(e)=>{
    e.preventDefault()
    const { isValid } = validate({servicio:true, values:{
      personaIdModel, campoModel, utModel
    }})
    if(isValid) setShowPopupLiquidacion(true)    
  }

  const respuestaShowModelTransporte = (data) => {
    if(data.length > 0) {
      let mergedArray = []
      if(servicioTransporteSeleccionadosList.length > 0){
            mergedArray = [
              ...servicioTransporteSeleccionadosList,
              ...data.filter((item2) => !servicioTransporteSeleccionadosList.some((item1) => item1.servicioId === item2.servicioId)),
            ]
      }else mergedArray = data
      setServicioTransporteSeleccionadosList(mergedArray)
    }
    setShowPopupServicioTransporte(false)
  }
  const respuestaShowModelPalero = (data) => {
    if(data.length > 0) {
      let mergedArray = []
      if(servicioPaleroSeleccionadosList.length > 0){
            mergedArray = [
              ...servicioPaleroSeleccionadosList,
              ...data.filter((item2) => !servicioPaleroSeleccionadosList.some((item1) => item1.servicioId === item2.servicioId)),
            ]
      }else mergedArray = data
      setServicioPaleroSeleccionadosList(mergedArray)
    }
    setShowPopupServicioPalero(false)
  }
  const respuestaShowModelCorte = (data) => {
    if(data.length > 0) {
      let mergedArray = []
      if(corteSeleccionadosList.length > 0){
            mergedArray = [
              ...corteSeleccionadosList,
              ...data.filter((item2) => !corteSeleccionadosList.some((item1) => item1.corteId === item2.corteId)),
            ]
      }else mergedArray = data
      setCorteSeleccionadosList(mergedArray)
    }
    setShowPopupCorte(false)
  }
  const resspuestaShowModelLiquidacion = (data) => {
    if(data.length > 0) {
      let mergedArray = []
      if(liquidacionSeleccionadosList.length > 0){
            mergedArray = [
              ...liquidacionSeleccionadosList,
              ...data.filter((item2) => !liquidacionSeleccionadosList.some((item1) => item1.liquidacionId === item2.liquidacionId)),
            ]
      }else mergedArray = data
      setLiquidacionSeleccionadosList(mergedArray)
    }
    setShowPopupLiquidacion(false)
  }

  const onRowDeleteServicioTransporte = (data)=>{
    setServicioTransporteSeleccionadosList(servicioTransporteSeleccionadosList.filter(servicio => servicio.servicioId !== data.servicioId))
  }
  const onRowDeleteServicioPalero = (data)=>{
    setServicioPaleroSeleccionadosList(servicioPaleroSeleccionadosList.filter(servicio => servicio.servicioId !== data.servicioId))
  }
  const onRowDeleteTecojo = (data)=>{
    setCorteSeleccionadosList(corteSeleccionadosList.filter(corte => corte.corteId !== data.corteId))
  }
  const onRowDeleteLiquidacion = (data)=>{
    setLiquidacionSeleccionadosList(liquidacionSeleccionadosList.filter(liquidacion => liquidacion.liquidacionId !== data.liquidacionId))
  }

  const handleGuardar = async(e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const valuesData = {
      informeId, personaIdModel, proveedorIdModel, tierraIdModel, informeFecha, utModel, campoModel,
      facturaList, facturaTotalModel, servicioTransporteSeleccionadosList,
      servicioPaleroSeleccionadosList, corteSeleccionadosList, liquidacionSeleccionadosList,
      sumaPrecioTransporteModel, sumaPesoBrutoTransporteModel, sumaTotalTransporteModel,
      sumaPesoBrutoPaleroModel, sumaPrecioPaleroModel, sumaTotalPaleroModel, sumaPesoBrutoCorteModel,
      sumaPrecioCorteModel, sumaTotalCorteModel, sumaPesoBrutoLiquidacionModel, sumaPrecioLiquidacionModel,
      sumaTotalLiquidacionModel, sumaPesoBrutoImpuestosModel, sumaPrecioImpuestosModel, 
      sumaTotalImpuestosModel, sumaPesoBrutoOtrosGastosModel, sumaPrecioOtrosGastosModel, 
      sumaTotalOtrosGastosModel, costoTotalModel, utilidadTotalModel, resultadoModel
    }
    const { isValid } = validate({servicio:true, save:true, values:valuesData})
    if(isValid){
      const save = InformeIngresoGastoAdapterSave(valuesData)
      const response = await informeSave(informeId > 0 ? 'PUT' : 'POST',save)
      if(!response.result) 
        return toast.error(response.message, { id: toastLoadingCustom, style: { color:'red' }})
      toast.success(response.message, {id: toastLoadingCustom})
      return onShowModel(response)
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
      <SectionModel title={(informeId > 0 ? 'Información de':'Registrar') + ' Ingresos y Gasto'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <FilterOption htmlFor={'FechaModel'} name={'Fecha '}>
            <InputDateCustom fechaValue={informeFecha}
              valueError={errores.informeFecha ? true: false}
              setFechaValue={setInformeFecha} readOnly={informeId >0} />
            {errores.informeFecha && <p className="text-red-500 text-sm">{errores.informeFecha}</p>}
          </FilterOption>
          <FilterOption htmlFor={'SembradorModel'} name={'Sembrador'}>
            <ComboBoxCustom initialOptions={sembradorList} selectedOption={seleccionPersona}
              onSelectionChange={handleSelectionUTChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.sembrador ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"} allDisabled={informeId > 0}
            />
            {errores.sembrador && <p className="text-red-500 text-sm">{errores.sembrador}</p>}
          </FilterOption>
          <FilterOption htmlFor={'campoModel'} name={'Campo'}>
            <InputTextCustom placeholder='Automático ' textValue={campoModel} readOnly />
          </FilterOption>
          <FilterOption htmlFor={'utModel'} name={'UT'}>
            <InputTextCustom placeholder={'Automático'} textValue={utModel} readOnly/>
          </FilterOption>
          <FilterOption htmlFor={'estadoModel'} name={'Estado'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={informeEstado} />
          </FilterOption>
        </div>
      </SectionModel>
      <TableContainerCustom>
        <TableHeaderCustom grid>
          <TitleCustom titulo={'Importe Neto de la Factura'}  />
          <TableFooterCustom>
            <FilterOption htmlFor={'ImporteFechaModel'} name={'Fecha'}>
              <InputDateCustom fechaValue={facturaFechaModel}
                valueError={errores.facturaFecha}
                setFechaValue={setFacturaFechaModel} readOnly={informeEstado !='Activo'} />
              {errores.facturaFecha && <MessageValidationInput mensaje={errores.facturaFecha}/>}
            </FilterOption>
            <FilterOption htmlFor={'ImporteNumero'} name={'FACTURA'}>
              <InputTextCustom onChange={setFacturaNumeroModel}
                textValue={facturaNumeroModel} 
                valueError={errores.facturaNumero} 
                placeholder="Ingrese número de factura" readOnly={informeEstado !='Activo'} />
              {errores.facturaNumero && <MessageValidationInput mensaje={errores.facturaNumero}/>}
            </FilterOption>
            <FilterOption htmlFor={'ImporteTotal'} name={'IMPORTE'}>
              <InputDecimalCustom decimales={2} onChange={setFacturaImporteModel}
                textValue={facturaImporteModel} readOnly={informeEstado !='Activo'}
                valueError={errores.facturaImporte}
                placeholder="Automático"/>
              {errores.facturaImporte && <MessageValidationInput mensaje={errores.facturaImporte}/>}
            </FilterOption>
            { informeId > 0 || (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} name={'Agregar'} onClick={handleAgregarFactura} />
            )}
          </TableFooterCustom>
        </TableHeaderCustom>
        <TableBodyCustom headers={headersInformeFacturas}>
        {facturaList.length > 0 ? (
            facturaList.filter((item) => item.informeFacturaStatus === true)
            .map((item) => (
              <tr key={item.informeFacturaId}>
                <TableTd>{item.informeFacturaFecha}</TableTd>
                <TableTd>{item.informeFacturaNumero}</TableTd>
                <TableTd>{item.informeFacturaImporte}</TableTd>
                <TableTd>
                { informeId > 0 || (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteFactura(item)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            ))
        ):(<NoRegistros colSpan={headersInformeFacturas.length} />)}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'facturaNumeroTotalModel'} name={'Total'}>
            <InputDecimalCustom decimales={2} readOnly textValue={facturaTotalModel}
              placeholder="Automático" valueError={errores.totalImporteNetoFactura} />
            {errores.totalImporteNetoFactura && <MessageValidationInput mensaje={errores.totalImporteNetoFactura}/> }
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Selecciona las Liquidaciones'}  />
          { informeId > 0 || (
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} onClick={handleAddLiquidaciones} />
          )}
        </TableHeaderCustom>
        <TableBodyCustom headers={headersLiquidacion}>
          {liquidacionSeleccionadosList.length > 0 ? (
            liquidacionSeleccionadosList.map((liquidacion) => (
              <tr key={liquidacion.liquidacionId}>
                <TableTd hidden={true}>{liquidacion.liquidacionId}</TableTd>
                <TableTd>{liquidacion.personaNombre}</TableTd>
                <TableTd>{liquidacion.tierraCampo}</TableTd>
                <TableTd>{liquidacion.proveedorUT}</TableTd>
                <TableTd>{liquidacion.liquidacionFechaInicio}</TableTd>
                <TableTd>{liquidacion.liquidacionFechaFin}</TableTd>
                <TableTd>{liquidacion.liquidacionPesoBruto}</TableTd>
                <TableTd>{liquidacion.liquidacionPesoNeto}</TableTd>
                <TableTd>{liquidacion.liquidacionToneladaPrecioCompra}</TableTd>
                <TableTd>{liquidacion.liquidacionToneladaTotal}</TableTd>
                <TableTd>
                { informeId > 0 || (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteLiquidacion(liquidacion)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            )
          ))
          :(<NoRegistros colSpan={headersLiquidacion.length} />)}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'ToneladasPCompraModel'} name={'Precios'}>
            <InputDecimalCustom placeholder="Automático"
              textValue={sumaPrecioLiquidacionModel} readOnly />
          </FilterOption>        
          <FilterOption htmlFor={'ToneladasPesoBrutoModel'} name={'Toneladas'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={sumaPesoBrutoLiquidacionModel} />
          </FilterOption>
          <FilterOption htmlFor={'ToneladasTotalModel'} name={'Totales'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={sumaTotalLiquidacionModel} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Selecciona los Cortes'}  />
          { informeId > 0 || (
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} onClick={handleAddCortes} />
          )}
        </TableHeaderCustom>
        <TableBodyCustom headers={headersCorte}>
          {corteSeleccionadosList.length > 0 ? (
            corteSeleccionadosList.map((corte) => (
              <tr key={corte.corteId} >
                <TableTd hidden={true}>{corte.corteId}</TableTd>                
                <TableTd> {corte.corteFecha} </TableTd>
                <TableTd> {corte.tierraUC} </TableTd>
                <TableTd> {corte.tierraCampo} </TableTd>
                <TableTd> {corte.cortePrecio} </TableTd>
                <TableTd> {corte.cortePesoBrutoTotal} </TableTd>
                <TableTd> {corte.corteTotal} </TableTd>
                <TableTd>
                { informeId > 0 || (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                    onRowSelect={()=>onRowDeleteTecojo(corte)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            )
          ))
          :(<NoRegistros colSpan={headersCorte.length} />)}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'ToneladasPrecioCorteModel'} name={'Precios'}>
            <InputDecimalCustom placeholder="Automático"
              textValue={sumaPrecioCorteModel} readOnly />
          </FilterOption>        
          <FilterOption htmlFor={'ToneladasPesoNetoCorteModel'} name={'Toneladas'}>
            <InputDecimalCustom readOnly={informeId>0} onChange={setSumaPesoBrutoCorteModel}
              decimales={3} textValue={sumaPesoBrutoCorteModel} valueError={errores.pesoBrutoCorte}
              placeholder='Ejm: 100.565' />
          </FilterOption>
          <FilterOption htmlFor={'ToneladasTotalCorteModel'} name={'Totales'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={sumaTotalCorteModel} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Selecciona los Servicios Transportes'}  />
          { informeId > 0 || (
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} onClick={handleAddServicioTransporte} />
          )}
        </TableHeaderCustom>
        <TableBodyCustom headers={headersServicio}>
          {servicioTransporteSeleccionadosList.length > 0 ? (
            servicioTransporteSeleccionadosList.map((servicio) => (
              <tr key={servicio.servicioId} >
                <TableTd hidden={true}>{servicio.servicioId} </TableTd>
                <TableTd>{servicio.servicioFecha}</TableTd>
                <TableTd>{servicio.servicioCarguilloTitular}</TableTd>
                <TableTd> {servicio.servicioPrecio} </TableTd>
                <TableTd> {servicio.servicioPesoBruto} </TableTd>
                <TableTd> {servicio.servicioTotal} </TableTd>
                <TableTd>
                { informeId > 0 || (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteServicioTransporte(servicio)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            )
          ))
          :(<NoRegistros colSpan={headersServicio.length} />)}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'ToneladasPrecioTransporteModel'} name={'Precios'}>
            <InputDecimalCustom placeholder="Automático"
              textValue={sumaPrecioTransporteModel} readOnly />
          </FilterOption>        
          <FilterOption htmlFor={'ToneladasPesoNetoTransporteModel'} name={'Toneladas'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={sumaPesoBrutoTransporteModel} />
          </FilterOption>
          <FilterOption htmlFor={'ToneladasTotalTransporteModel'} name={'Totales'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={sumaTotalTransporteModel} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Selecciona los Servicios Paleros'}  />
          { informeId > 0 || (
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} onClick={handleAddServicioPaleros} />
          )}
        </TableHeaderCustom>
        <TableBodyCustom headers={headersServicio}>
          {servicioPaleroSeleccionadosList.length > 0 ? (
            servicioPaleroSeleccionadosList.map((servicio) => (
              <tr key={servicio.servicioId} >
                <TableTd hidden={true}>{servicio.servicioId} </TableTd>
                <TableTd>{servicio.servicioFecha}</TableTd>
                <TableTd>{servicio.servicioCarguilloTitular}</TableTd>
                <TableTd> {servicio.servicioPrecio} </TableTd>
                <TableTd> {servicio.servicioPesoBruto} </TableTd>
                <TableTd> {servicio.servicioTotal} </TableTd>
                <TableTd>
                { informeId > 0 || (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteServicioPalero(servicio)}>
                    <Trash2 size={18} />
                  </TableButton>
                )}
                </TableTd>
              </tr>
            )
          ))
          :(<NoRegistros colSpan={headersServicio.length} />)}
        </TableBodyCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'ToneladasPrecioPäleroModel'} name={'Precios'}>
            <InputDecimalCustom placeholder="Automático"
              textValue={sumaPrecioPaleroModel} readOnly />
          </FilterOption>        
          <FilterOption htmlFor={'ToneladasPesoNetoPaleroModel'} name={'Toneladas'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={sumaPesoBrutoPaleroModel} />
          </FilterOption>
          <FilterOption htmlFor={'ToneladasTotalPaleroModel'} name={'Totales'}>
            <InputDecimalCustom readOnly
              placeholder='Automático' textValue={sumaTotalPaleroModel} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Impuestos'}  />
        </TableHeaderCustom>
        <TableFooterCustom>
        <FilterOption htmlFor={'ToneladasPrecioImpuestoModel'} name={'Precios'}>
            <InputDecimalCustom readOnly={informeId>0} onChange={setSumaPrecioImpuestosModel}
              decimales={2} textValue={sumaPrecioImpuestosModel} valueError={errores.precioImpuestos}
              placeholder="Ejm: 100.55"
              />
            {errores.precioImpuestos && <MessageValidationInput mensaje={errores.precioImpuestos}/>}
          </FilterOption>        
          <FilterOption htmlFor={'ToneladasPesoNetoImpuestoModel'} name={'Toneladas'}>
            <InputDecimalCustom readOnly={informeId>0} onChange={setSumaPesoBrutoImpuestosModel}
              decimales={3} textValue={sumaPesoBrutoImpuestosModel} valueError={errores.pesoBrutoImpuestos}
              placeholder='Ejm: 100.565' />
            {errores.pesoBrutoImpuestos && <MessageValidationInput mensaje={errores.pesoBrutoImpuestos}/>}
          </FilterOption>
          <FilterOption htmlFor={'ToneladasTotalImpuestoModel'} name={'Totales'}>
            <InputDecimalCustom readOnly={informeId>0}
              placeholder='Automático' textValue={sumaTotalImpuestosModel} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Otros Gastos'}  />
        </TableHeaderCustom>
        <TableFooterCustom>
        <FilterOption htmlFor={'ToneladasPrecioOtrosModel'} name={'Precios'}>
            <InputDecimalCustom readOnly={informeId>0} onChange={setSumaPrecioOtrosGastosModel}
              decimales={2} textValue={sumaPrecioOtrosGastosModel} valueError={errores.precioOtrosGastos}
              placeholder="Ejm: 100.55"
              />
            {errores.precioOtrosGastos && <MessageValidationInput mensaje={errores.precioOtrosGastos}/>}
          </FilterOption>        
          <FilterOption htmlFor={'ToneladasPesoNetoOtrosModel'} name={'Toneladas'}>
            <InputDecimalCustom readOnly={informeId>0} onChange={setSumaPesoBrutoOtrosGastosModel}
              decimales={3} textValue={sumaPesoBrutoOtrosGastosModel} valueError={errores.pesoBrutoOtrosGastos}
              placeholder='Ejm: 100.565' />
            {errores.pesoBrutoOtrosGastos && <MessageValidationInput mensaje={errores.pesoBrutoOtrosGastos}/>}
          </FilterOption>
          <FilterOption htmlFor={'ToneladasTotalOtrosModel'} name={'Totales'}>
            <InputDecimalCustom readOnly={informeId>0}
              placeholder='Automático' textValue={sumaTotalOtrosGastosModel} />
          </FilterOption>
        </TableFooterCustom>
      </TableContainerCustom>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Utilidad'}  />
        </TableHeaderCustom>
        <TableFooterCustom>
          <FilterOption htmlFor={'TotalFacturaUtilidadModel'} name={'Total Factura'}>
            <InputDecimalCustom decimales={2} readOnly textValue={facturaTotalModel}
              placeholder="Automático"/>
          </FilterOption>        
          <FilterOption htmlFor={'TotalCostoUtilidadModel'} name={'Total Costo'}>
            <InputDecimalCustom decimales={2} readOnly textValue={costoTotalModel}
              placeholder="Automático"/>
          </FilterOption>
          <FilterOption htmlFor={'UtilidadModel'} name={'Total Utilidad'}>
            <InputDecimalCustom readOnly={informeId>0}
              placeholder='Automático' textValue={utilidadTotalModel} />
          </FilterOption>
          <div className='space-y-2 md:col-span-2 lg:col-span-4 '>
            <FilterOption htmlFor="ResultadoModel" name={'Resultado'}>
              <InputTextCustom textValue={resultadoModel} placeholder='Ingrese el mensaje final' 
                onChange={setResultadoModel} valueError={errores.resultado} readOnly={informeId>0} />
            </FilterOption>
            {errores.resultado && <MessageValidationInput mensaje={errores.resultado}/> }
          </div>
        </TableFooterCustom>
      </TableContainerCustom>
      <Footer>
        { informeId ==0 && <FooterButton accion={handleGuardar} name={'Guardar'} />}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopupServicioTransporte ? <InformeServicioPopup headers={headersServicio} onShowModel={respuestaShowModelTransporte} titulo={'Transportes'} transporte={true} />    : ''}
      {showPopupServicioPalero ? <InformeServicioPopup headers={headersServicio}  onShowModel={respuestaShowModelPalero} titulo={'Paleros'} transporte={false} />    : ''}
      {showPopupCorte ? <InformeCortePopup onShowModel={respuestaShowModelCorte} headers={headersCorte} tierraId={tierraIdModel} />    : ''}
      {showPopupLiquidacion ? <InformeLiquidacionPopup onShowModel={resspuestaShowModelLiquidacion} personaId={personaIdModel} headers={headersLiquidacion}/>    : ''}
    </>
  )
}