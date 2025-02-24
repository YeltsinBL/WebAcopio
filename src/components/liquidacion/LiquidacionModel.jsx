import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, 
  InputDecimalCustom, InputNumberCustom, InputTextCustom, MessageValidationInput, NoRegistros, 
  SectionModel, TableBodyCustom, TableButton, TableContainerCustom, TableFooterCustom, 
  TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { 
  convertirFechaDDMMYYYY,
  convertirFechaToISO,
  convertirFechaToYMD, FormatteDecimalMath, formatterDataCombo, obtenerFechaLocal 
} from "~utils/index"
import { liquidacionSave, searchProveedorALiquidar } from "~services/liquidacion"
import CorteTicketPopup from "~components/corte/CorteTicketPopup"

export function LiquidacionModel({onShowModel, data}) {
  const [proveedoresALiquidarList, setProveedorALiquidarList] = useState([])
  const [proveedoresComboList, setProveedorComboList] = useState([])
  const [ticketsSeleccionadosList, setTicketsSeleccionadosList] = useState([])
  const [financiamientoList, setFinanciamientoList] = useState([])
  const [adicionalesList, setAdicionalesList] = useState([])

  const [liquidacionIdModel, setLiquidacionIdModel] = useState(0)
  const [personaIdModel, setPersonaIdModel] = useState("")
  const [proveedorIdModel, setProveedorIdModel] = useState("")
  const [tierraIdModel, setTierraIdModel] = useState("")
  const [fechaInicioModel, setFechaInicioModel] = useState("")
  const [fechaFinModel, setFechaFinModel] = useState("")
  //const [sembradorModel, setSembradorModel] = useState("")
  const [campoModel, setCampoModel] = useState("")
  const [utModel, setUtModel] = useState("")
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState('')

  const [toneladasPesosNetosModel, setToneladasPesosNetosModel] = useState("")
  const [pCompraModel, setpComprasModel] = useState("")
  const [toneladasTotalModel, setToneladasTotalModel] = useState("")

  const [financiamientoFechaModel, setFinanciamientoFechaModel] = useState("")
  const [financiamientoFechaFinModel, setFinanciamientoFechaFinModel] = useState("")
  const [financiamientoACuentaModel, setFinanciamientoACuentaModel] = useState("0")
  const [financiamientoTiempoModel, setFinanciamientoTiempoModel] = useState("0")
  const [financiamientoInteresMesModel, setFinanciamientoInteresMesModel] = useState("0")
  const [financiamientoInteresModel, setFinanciamientoInteresModel] = useState("0") 
  const [financiamientoTotalModel, setFinanciamientoTotalModel] = useState("0")
  const [financiamientoACuentaTotal, setFinanciamientoACuentaTotal] = useState('0')
  const [liquidacionPorPagar, setLiquidacionPorPagar] = useState('')
  const [liquidacionEstado, setLiquidacionEstado] = useState('Activo')

  const [adicionalesMotivoModel, setAdicionalesMotivoModel] = useState('')
  const [adicionalesTotalModel, setAdicionalesTotalModel] = useState('')
  const [adicionalesTotal, setAdicionalesTotal] = useState('0')
  const [showPopup, setShowPopup] = useState(false)


  const [errores, setErrores] = useState({})
  const seleccionPersona = data.personaId ? {id: data.personaId, nombre: data.personaNombre } : null
  const headers = ['Ingenio', 'Viaje', 'Fecha', 'Vehículo', 'Camión', 'Transportista', 
    'Vehículo Peso', 'Camión Peso', 'Peso Bruto','Campo', 'Estado','Acción']
  const headersFinanciamiento= ['Fecha', 'A Cuenta','Tiempo/Días','Interes Mes %','Interes S/', 'Total','Acciones']
  const headersAdicionales= ['Motivo', 'Monto','Acciones']
  
  useEffect(()=>{
    proveedorListAliquidar()
  }, [])
  useEffect(()=>{
    if(data){
      setLiquidacionIdModel(data.liquidacionId || 0)
      setPersonaIdModel(data.personaId || '')
      setCampoModel(data.tierraCampo || '')
      setUtModel(data.proveedorUT || '')
      setFechaInicioModel(
        data.liquidacionFechaInicio ? data.liquidacionFechaInicio : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setFechaFinModel(
        data.liquidacionFechaFin ? data.liquidacionFechaFin : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setSumaPesoBrutoModel(data.liquidacionPesoBruto || '')
      setToneladasPesosNetosModel(data.liquidacionPesoNeto || '')

      setpComprasModel(data.liquidacionToneladaPrecioCompra || '')
      setToneladasTotalModel(data.liquidacionToneladaTotal || '')

      setFinanciamientoACuentaTotal(data.liquidacionFinanciamientoACuenta || '0')
      setLiquidacionPorPagar(data.liquidacionPagar || '0')
      setFinanciamientoFechaModel(data.financiamientoFecha || obtenerFechaLocal({date: new Date()}).split('T')[0])      
      setFinanciamientoFechaFinModel(obtenerFechaLocal({date: new Date()}).split('T')[0])
      setTicketsSeleccionadosList(data.liquidacionTickets || [])
      setFinanciamientoList(data.liquidacionFinanciamiento || [])
      setAdicionalesList(data.liquidacionAdicionals || [])
      setAdicionalesTotal(data.adicionalTotal || 0)
      setLiquidacionEstado(data.liquidacionEstadoDescripcion || 'Activo')
    }
  }, [data])
  useEffect(() => {
    const total = ticketsSeleccionadosList.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketsSeleccionadosList])
  useEffect(()=>{
    if(!parseFloat(pCompraModel)) return setToneladasTotalModel('')
    const total = toneladasPesosNetosModel * pCompraModel
    setToneladasTotalModel(FormatteDecimalMath(total,2))
  }, [pCompraModel, toneladasPesosNetosModel])
  useEffect(()=>{
    let interes = null
    if(parseFloat(financiamientoACuentaModel) && parseFloat(financiamientoTiempoModel)
      && parseFloat(financiamientoInteresMesModel)){
      //interes = financiamientoACuentaModel * parseInt(financiamientoTiempoModel) * parseFloat(financiamientoInteresMesModel) / 100
      interes = financiamientoACuentaModel * parseInt(financiamientoTiempoModel) * (parseFloat(financiamientoInteresMesModel) / 30) / 100
      setFinanciamientoInteresModel(FormatteDecimalMath(interes,2))
    }else setFinanciamientoInteresModel(0)
    const total = parseFloat(financiamientoACuentaModel) + interes
    setFinanciamientoTotalModel(FormatteDecimalMath(total,2))
  },[financiamientoACuentaModel, financiamientoTiempoModel,
    financiamientoInteresMesModel])
  useEffect(() => {
    const total = financiamientoList.filter((item) => item.liquidacionFinanciamientoStatus === true).reduce(getSumFina, 0)
    if(total>0) return setFinanciamientoACuentaTotal(FormatteDecimalMath(total,2))
    return setFinanciamientoACuentaTotal('0')
  }, [financiamientoList])
  useEffect(() => {
    const total = adicionalesList.filter((item) => item.liquidacionAdicionalStatus === true).reduce(getSumAdi, 0)
    if(total>0) return setAdicionalesTotal(FormatteDecimalMath(total,2))
    return setAdicionalesTotal('0')
  }, [adicionalesList])
  useEffect(()=>{
    if(parseFloat(toneladasTotalModel)){
      const adicional = adicionalesTotal === '' ? 0 : parseFloat(adicionalesTotal)
      const total = parseFloat(toneladasTotalModel) - parseFloat(financiamientoACuentaTotal) - adicional
      setLiquidacionPorPagar(FormatteDecimalMath(total,2))
    }else setLiquidacionPorPagar('0')
  },[toneladasTotalModel, financiamientoACuentaTotal, adicionalesTotal])
  useEffect(()=>{
    if(financiamientoFechaModel && financiamientoFechaFinModel){
      const fechaInicio = new Date(financiamientoFechaModel)
      const fechaFin = new Date(financiamientoFechaFinModel)
      const diferenciaTiempo = (fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      const financiamientoTiempoModel = Math.round(diferenciaTiempo)
      setFinanciamientoTiempoModel(financiamientoTiempoModel)
    }
  },[financiamientoFechaModel, financiamientoFechaFinModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.ticketPesoBruto)
  }
  const getSumFina=(total, num) =>{
    return total + parseFloat(num.liquidacionFinanciamientoTotal)
  }
  const getSumAdi=(total, num) =>{
    return total + parseFloat(num.liquidacionAdicionalTotal)
  }

  const proveedorListAliquidar = async()=>{
    const proveedores = await searchProveedorALiquidar()
    setProveedorALiquidarList(proveedores)
    const formatter= proveedores?.map(ut =>(
      formatterDataCombo(ut.personId, ut.proveedorNombre)))
    setProveedorComboList(formatter)

  }
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
        return dateA - dateB;
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
    if(validarCampos({tickets:true})){
      setShowPopup(true)
    }
  }
  const onRowDeleteTicket= (data)=>{
    setTicketsSeleccionadosList(ticketsSeleccionadosList.filter(ticket => ticket.ticketId !== data.ticketId))
  }
  const handleAgregarFinanciamiento = (e) => {
    e.preventDefault()
    if (validarCampos({financiamiento:true})) {
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
      setFinanciamientoList(financiamientoList.filter((item) => item.liquidacionFinanciamientoId !== financiamiento.liquidacionFinanciamientoId));
    }else{
      setFinanciamientoList(
        financiamientoList.map((item) => item.liquidacionFinanciamientoId == financiamiento.liquidacionFinanciamientoId 
        ? {...item, liquidacionFinanciamientoStatus: !item.liquidacionFinanciamientoStatus}: item)
      )
    }
  }
  const handleAgregarAdicionales = (e) => {
    e.preventDefault()
    if (validarCampos({financiamiento:true})) {
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
      setAdicionalesList(adicionalesList.filter((item) => item.liquidacionAdicionalId !== adicionales.liquidacionAdicionalId));
    } else{
      setAdicionalesList(
        adicionalesList.map(item => item.liquidacionAdicionalId == adicionales.liquidacionAdicionalId ?{
          ...item, liquidacionAdicionalStatus: !item.liquidacionAdicionalStatus
        }: item)
      )
    }
  }

  const validarCampos = ({tickets=false, financiamiento = false, adicional = false}) => {
    const nuevosErrores = {}
    if(tickets){
      if (!personaIdModel) nuevosErrores.sembrador = "La información del Sembrador es obligatorio."
      if (!campoModel) nuevosErrores.campo = "La información de CAMPO es obligatorio."
      if (!utModel) nuevosErrores.ut = "La información de UT es obligatorio."
    }
    if(financiamiento){
      if(!financiamientoFechaModel) nuevosErrores.financiamientoFecha = "La información de FECHA INICIO es obligatoria"
      if(!financiamientoFechaFinModel) nuevosErrores.financiamientoFechaFin = "La información de FECHA FIN es obligatoria"
      if(!financiamientoACuentaModel) nuevosErrores.financiamientoACuenta = "La información de A CUENTA es obligatoria"
      //if(!financiamientoTiempoModel) nuevosErrores.financiamientoTiempo = "La información de TIEMPO/DÍAS es obligatoria"
      if(!financiamientoInteresMesModel) nuevosErrores.financiamientoInteresMes = "La información de INTERES MES es obligatoria"
    }
    if(adicional){
      if(!adicionalesMotivoModel) nuevosErrores.adicionalesMotivo = "La información de MOTIVO es obligatoria"
      if(!adicionalesTotalModel) nuevosErrores.adicionalTotalModel = "La información de MONTO es obligatoria"
    }
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')    
    if (validarCampos({tickets:true})) {
      let liquidacion = {
        liquidacionFechaInicio: fechaInicioModel,
        liquidacionFechaFin: fechaFinModel,
        liquidacionPesoNeto: toneladasPesosNetosModel,

        liquidacionToneladaPrecioCompra: pCompraModel,
        liquidacionToneladaTotal: toneladasTotalModel,

        liquidacionFinanciamientoACuenta: financiamientoACuentaTotal,
        liquidacionFinanciamientos: financiamientoList?.map(item => ({...item,
          liquidacionFinanciamientoFecha: convertirFechaToYMD(convertirFechaToISO(item.liquidacionFinanciamientoFecha)),
          liquidacionFinanciamientoId: 
            (typeof item.liquidacionFinanciamientoId === "string" && item.liquidacionFinanciamientoId.startsWith("temp")) ?
            0: item.liquidacionFinanciamientoId
        })),

        liquidacionAdicionales: adicionalesList?.map(item =>({...item,
          liquidacionAdicionalId: (typeof item.liquidacionAdicionalId === "string" && item.liquidacionAdicionalId.startsWith("temp")) ?
          0: item.liquidacionAdicionalId
        })),
        liquidacionAdicionalTotal: adicionalesTotal,

        liquidacionPagar:liquidacionPorPagar,

      }
      if(liquidacionIdModel > 0){
        liquidacion = {...liquidacion,
          liquidacionId:liquidacionIdModel,
          userModifiedName:"ADMIN",
          userModifiedAt: obtenerFechaLocal({date: new Date()})
        }
      }else{
        liquidacion = {...liquidacion,
          personaId:personaIdModel,
          tierraId: tierraIdModel,
          proveedorId: proveedorIdModel,

          liquidacionTickets: ticketsSeleccionadosList?.map(ticket => ({ticketId :ticket.ticketId})),
          liquidacionPesoBruto: sumaPesoBrutoModel,
          userCreatedName: "ADMIN",
          userCreatedAt: obtenerFechaLocal({date: new Date()})
        }
      }
      const save = await liquidacionSave({method: liquidacionIdModel>0?'PUT':'POST', liquidacion})
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