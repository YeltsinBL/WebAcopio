import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, 
  InputDecimalCustom, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, 
  TableBodyCustom, TableButton, TableContainerCustom, TableFooterCustom,
  TableHeaderCustom, TableTd, TitleCustom
} from "~components/common"
import { 
  convertirFechaDDMMYYYY,  convertirFechaToYMD, FormatteDecimalMath, formatterDataCombo, 
  obtenerFechaLocal 
} from "~utils/index"
import { liquidacionSearch } from "~services/liquidacion"
import { tesoreriaSave } from "~services/tesoreria"

export const TesoreriaForm = ({onShowModel, data}) => {
  const [liquidacionList, setLiquidacionList] = useState([])
  const [proveedoresComboList, setProveedorComboList] = useState([])
  const [tesoreriaId, setTesoreriaId] = useState(0)
  const [fechaModel, setFechaModel] = useState(obtenerFechaLocal({date: new Date()}).split('T')[0])
  const [liquidacionId, setLiquidacionId] = useState("")
  const [campoModel, setCampoModel] = useState("")
  const [utModel, setUtModel] = useState("")
  const [montoModel, setMontoModel] = useState(0)
  const [pagadoModel, setPagadoModel] = useState(0)
  const [totalPagadoModel, setTotalPagadoModel] = useState(0)
  const [pendientePagarModel, setPendientePagar] = useState(0)
  const [bancoModel, setBancoModel] = useState("")
  const [cteModel, setCteModel] = useState("")
  const [efectivo, setEfectivo] = useState(false)
  const [fechaPagadoModel, setFechaPagadoModel] = useState(obtenerFechaLocal({date: new Date()}).split('T')[0])
  const [pagando, setPagando ]= useState(true)

  const [tesoreriaDetallePagado, setTesoreriaDetallePagado] = useState([])
  const [errores, setErrores] = useState({})
  const seleccionPersona = data?.liquidacionId ? {id: data.liquidacionId, nombre: data.personaNombre } : null
  const headers= ['Fecha', 'Pagado','Efectivo','Banco','Cta.Cte.', 'Acción']
  
  useEffect(()=>{
    if(data){
      setTesoreriaId(data.tesoreriaId || 0)
      setFechaModel(
        data.tesoreriaFecha ? convertirFechaToYMD(data.tesoreriaFecha) : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setLiquidacionId(data.liquidacionId || 0)
      setCampoModel(data.tierraCampo || '')
      setUtModel(data.proveedorUT || '')
      setMontoModel(data.tesoreriaMonto || 0)
      setTotalPagadoModel(data.tesoreriaPagado || 0)
      setBancoModel(data.tesoreriaBanco || '')
      setCteModel(data.tesoreriaCtaCte || '')
      setEfectivo(data.tesoreriaEfectivo || false)
      setTesoreriaDetallePagado(data.tesoreriaDetallePagos || [])
      setPagando(data.tesoreriaId >0 && data.tesoreriaPendientePagar > 0)
      return
    }
    proveedorListAliquidar()
  }, [])
  useEffect(()=>{
    if(totalPagadoModel >= 0 && montoModel > 0) 
      return setPendientePagar(montoModel - totalPagadoModel)
    return setPendientePagar(0)
  }, [montoModel, totalPagadoModel])
  useEffect(()=>{
    const total = tesoreriaDetallePagado
      .reduce((total, item) => total + parseFloat(item.tesoreriaDetallePagoPagado), 0)
    setTotalPagadoModel(FormatteDecimalMath(total,2))
  }, [tesoreriaDetallePagado])
  const proveedorListAliquidar = async()=>{
    const liquidaciones = await liquidacionSearch({
        fechaDesdeFilter:'',
        fechaHastaFilter:'',
        utFilter:'',
        estadoFilter:1})
    setLiquidacionList(liquidaciones)
    const formatter= liquidaciones?.map(ut =>(
      formatterDataCombo(ut.liquidacionId, ut.personaNombre)))
    setProveedorComboList(formatter)
  }
  const handleSelectionUTChange = (option) =>{
    setLiquidacionId(option)
    const proveedor = liquidacionList.find(p => p.liquidacionId == option)
    setCampoModel(proveedor.tierraCampo)
    setUtModel(proveedor.proveedorUT)
    setMontoModel(proveedor.liquidacionPagar)
  }
  const validarCampos = (agregar) => {
    const nuevosErrores = {}
    if(agregar){
      if (!fechaPagadoModel) nuevosErrores.fechaPagadoModel = "El campo FECHA es obligatorio."
      if (!pagadoModel) nuevosErrores.pagado = "El campo PAGADO es obligatorio."
      if (!cteModel && !efectivo) nuevosErrores.ctacte = "El campo CTA. CTE. es obligatorio."
      if (pendientePagarModel ==0) toast.warning('Ya ha pagado el total de la deuda', {style: { 
        background: 'black',
        color:' yellow' }} )
    }else{
      if (!fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
      if (!liquidacionId) nuevosErrores.ut = "El campo SEEMBRADOR es obligatorio."
      if (tesoreriaDetallePagado.length == 0) toast.warning('Debe agregar al menos un pago', {style: { 
        background: 'black',
        color:' yellow' }} )
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleAgregarProveedor = (e) => {
    e.preventDefault()
    if (validarCampos(true)) {
      const updatePlacaList = [...tesoreriaDetallePagado, 
        { tesoreriaDetallePagoId: `temp-${Date.now()}`,
        tesoreriaDetallePagoFecha: fechaPagadoModel,
        tesoreriaDetallePagoPagado: pagadoModel,
        tesoreriaDetallePagoEfectivo: efectivo,
        tesoreriaDetallePagoBanco: bancoModel,
        tesoreriaDetallePagoCtaCte: cteModel,
      }]
      setTesoreriaDetallePagado(updatePlacaList)
    }
    setPagadoModel(0)
    setBancoModel('')
    setCteModel('')
    setEfectivo(false)
  }
  const onRowDelete = (proveedor) => {
    if (typeof proveedor.tesoreriaDetallePagoId === "string" && proveedor.tesoreriaDetallePagoId.startsWith("temp")) {
      setTesoreriaDetallePagado(tesoreriaDetallePagado.filter((item) => item.tesoreriaDetallePagoId !== proveedor.tesoreriaDetallePagoId))
    }
  }
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    if(validarCampos()){
      let tesoreriaModel = {
        tesoreriaPendientePagar: pendientePagarModel,
        tesoreriaPagado: totalPagadoModel,
      }
      if(tesoreriaId > 0){
        tesoreriaModel = {...tesoreriaModel, 
          tesoreriaId,
          tesoreriaDetallePagos: tesoreriaDetallePagado.filter((item) => 
            typeof item.tesoreriaDetallePagoId === "string" &&
            item.tesoreriaDetallePagoId.startsWith('temp')),
          userModifiedName:"ADMIN",
          userModifiedAt: obtenerFechaLocal({date: new Date()})
        }
      }else{
        tesoreriaModel = {...tesoreriaModel, 
          liquidacionId: liquidacionId,
          tesoreriaFecha: fechaModel,
          tesoreriaMonto: montoModel,
          tesoreriaDetallePagos: tesoreriaDetallePagado,
          userCreatedAt: obtenerFechaLocal({date: new Date()}),
          userCreatedName: "ADMIN"
        }
      }
      const tesoreriaResp = await tesoreriaSave(tesoreriaId > 0? 'PUT':'POST', tesoreriaModel)
      if(!tesoreriaResp.result) 
        return toast.error(tesoreriaResp.errorMessage, { id: toastLoadingCustom, style: { color:'red' }})
      setTimeout(() => {
        toast.dismiss(toastLoadingCustom)
      })
      return onShowModel(tesoreriaResp)
    }
    setTimeout(() => {
      toast.dismiss(toastLoadingCustom)
    })
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({tesoreriaId:0})
  }
  return (
    <>
      <SectionModel title={(tesoreriaId > 0 ? 'Información de':'Registrar') + ' Liquidación Pago'}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
          <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
            <InputDateCustom fechaValue={fechaModel}
              valueError={errores.fechaModel ? true: false}
              setFechaValue={setFechaModel} readOnly={tesoreriaId > 0} />
            {errores.fechaModel && <MessageValidationInput mensaje={errores.fechaModel}/>}
          </FilterOption>
          <FilterOption htmlFor={'SembradorModel'} name={'Sembrador'}>
            <ComboBoxCustom initialOptions={proveedoresComboList} selectedOption={seleccionPersona}
              onSelectionChange={handleSelectionUTChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.ut ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              allDisabled={tesoreriaId > 0}
            />
            {errores.ut && <MessageValidationInput mensaje={errores.ut}/>}
          </FilterOption>
          <FilterOption htmlFor={'campoModel'} name={'Campo'}>
            <InputTextCustom placeholder='Automático ' textValue={campoModel} readOnly />
          </FilterOption>
          <FilterOption htmlFor={'utModel'} name={'UT'}>
            <InputTextCustom placeholder={'Automático'} textValue={utModel} readOnly/>
          </FilterOption>
          <FilterOption htmlFor={'utMonto'} name={'Por Pagar'}>
            <InputDecimalCustom placeholder={'Automático'} textValue={montoModel}
              readOnly decimales={2}/>
          </FilterOption>         
        </div>  
      </SectionModel>
      
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
        <TableBodyCustom headers={headers}>
          {tesoreriaDetallePagado.length > 0 ?(
            tesoreriaDetallePagado.map((item)=>(
              <tr key={item.tesoreriaDetallePagoId} >
                <TableTd hidden>{item.tesoreriaDetallePagoId}</TableTd>
                <TableTd>{convertirFechaDDMMYYYY(item.tesoreriaDetallePagoFecha)}</TableTd>
                <TableTd>{item.tesoreriaDetallePagoPagado}</TableTd>
                <TableTd>{item.tesoreriaDetallePagoEfectivo ? 'Si':'No'}</TableTd>
                <TableTd>{item.tesoreriaDetallePagoBanco}</TableTd>
                <TableTd>{item.tesoreriaDetallePagoCtaCte}</TableTd>
                <TableTd>
                  {
                    typeof item.tesoreriaDetallePagoId === "string" && 
                    item.tesoreriaDetallePagoId?.startsWith('temp') &&
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
        <TableFooterCustom>
          <FilterOption htmlFor={'utPagado'} name={'Pagado'}>
            <InputDecimalCustom placeholder={'Automático'} textValue={totalPagadoModel}
              readOnly decimales={2}/>
          </FilterOption>
          <FilterOption htmlFor={'utPendientePagar'} name={'Pendiente a Pagar'}>
            <InputDecimalCustom placeholder={'Automático'} textValue={pendientePagarModel}
              readOnly decimales={2}/>
          </FilterOption> 
        </TableFooterCustom>
      </TableContainerCustom>
        <Footer>
          {pagando ?
          <FooterButton name={'Guardar'} accion={handleGuardar}/>:''
          }
          <FooterButton name={'Cancelar'} accion={handleCancelar}/>
        </Footer>
    </>
  )
}