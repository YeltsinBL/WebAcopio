import { useEffect, useState } from "react";
import { ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, InputDecimalCustom, InputNumberCustom, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, TableBodyCustom, TableButton, TableContainerCustom, TableFooterCustom, TableHeaderCustom, TableTd, TitleCustom } from "../common";
import { Trash2 } from "lucide-react";
import { convertirFechaToYMD, FormatteDecimalMath, formatterDataCombo, obtenerFechaLocal } from "../../utils";
import { liquidacionSave, searchProveedorALiquidar } from "../../services/liquidacion";
import CorteTicketPopup from "../corte/CorteTicketPopup";

export function LiquidacionModel({onShowModel, data}) {
  const [proveedoresALiquidarList, setProveedorALiquidarList] = useState([])
  const [proveedoresComboList, setProveedorComboList] = useState([])
  const [ticketsSeleccionadosList, setTicketsSeleccionadosList] = useState([])
  const [financiamientoList, setFinanciamientoList] = useState([])
  const [adicionalesList, setAdicionalesList] = useState([])

  const [liquidacionIdModel, setLiquidacionIdModel] = useState('')
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
  const [financiamientoACuentaModel, setFinanciamientoACuentaModel] = useState("0")
  const [financiamientoTiempoModel, setFinanciamientoTiempoModel] = useState("0")
  const [financiamientoInteresMesModel, setFinanciamientoInteresMesModel] = useState("0")
  const [financiamientoInteresModel, setFinanciamientoInteresModel] = useState("0") 
  const [financiamientoTotalModel, setFinanciamientoTotalModel] = useState("0")
  const [financiamientoACuentaTotal, setFinanciamientoACuentaTotal] = useState('0')
  const [liquidacionPorPagar, setLiquidacionPorPagar] = useState('')

  const [adicionalesMotivoModel, setAdicionalesMotivoModel] = useState('')
  const [adicionalesTotalModel, setAdicionalesTotalModel] = useState('')
  const [adicionalesTotal, setAdicionalesTotal] = useState('0')
  const [showPopup, setShowPopup] = useState(false)


  const [errores, setErrores] = useState({})
  const seleccionPersona = data.personaId ? {id: data.personaId, nombre: data.personaNombre } : null
  const headers = ['ID', 'Ingenio', 'Campo', 'Viaje', 'Fecha', 'Transportista', 'Camión', 
    'Camión Peso', 'Vehículo', 'Vehículo Peso', 'Peso Bruto']
  const headersFinanciamiento= ['Fecha', 'A Cuenta','Tiempo','Interes Mes %','Interes S/', 'Total','Acciones']
  const headersAdicionales= ['Motivo', 'Monto','Acciones']
  
  useEffect(()=>{
    proveedorListAliquidar()
    console.log(data)
    if(data){
      setLiquidacionIdModel(data.liquidacionId || '')
      setPersonaIdModel(data.personaId || '')
      setCampoModel(data.tierraCampo || '')
      setUtModel(data.proveedorUT || '')
      setFechaInicioModel(
        data.liquidacionFechaInicio ? convertirFechaToYMD(data.liquidacionFechaInicio) : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setFechaFinModel(
        data.liquidacionFechaFin ? convertirFechaToYMD(data.liquidacionFechaFin) : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setSumaPesoBrutoModel(data.liquidacionPesoBruto || '')
      setToneladasPesosNetosModel(data.liquidacionPesoNeto || '')

      setpComprasModel(data.liquidacionToneladaPrecioCompra || '')
      setToneladasTotalModel(data.liquidacionToneladaTotal || '')

      setFinanciamientoACuentaTotal(data.liquidacionFinanciamientoACuenta || '0')
      setLiquidacionPorPagar(data.liquidacionPagar || '0')
      setFinanciamientoFechaModel(data.financiamientoFecha || obtenerFechaLocal({date: new Date()}).split('T')[0])
      setTicketsSeleccionadosList(data.liquidacionTickets || [])
      setFinanciamientoList(data.liquidacionFinanciamiento || [])
      setAdicionalesList(data.liquidacionAdicionals || [])
      setAdicionalesTotal(data.adicionalTotal || 0)
    }
  }, [])
  useEffect(() => {
    const total = ticketsSeleccionadosList.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketsSeleccionadosList])
  useEffect(()=>{
    if(!parseFloat(pCompraModel)) return setToneladasTotalModel('')
    const total = toneladasPesosNetosModel * pCompraModel
    console.log(total)
    setToneladasTotalModel(FormatteDecimalMath(total,2))
  }, [pCompraModel])
  useEffect(()=>{
    let interes = null
    if(parseFloat(financiamientoACuentaModel) && parseFloat(financiamientoTiempoModel)
      && parseFloat(financiamientoInteresMesModel)){
      interes =financiamientoACuentaModel * parseInt(financiamientoTiempoModel) * parseFloat(financiamientoInteresMesModel) / 100
      setFinanciamientoInteresModel(interes)
    }else setFinanciamientoInteresModel(0)
    const total = parseFloat(financiamientoACuentaModel) + interes
    setFinanciamientoTotalModel(FormatteDecimalMath(total,2))
  },[financiamientoACuentaModel, financiamientoTiempoModel,
    financiamientoInteresMesModel])
  useEffect(() => {
    const total = financiamientoList.reduce(getSumFina, 0)
    if(total>0) return setFinanciamientoACuentaTotal(FormatteDecimalMath(total,2))
    return setFinanciamientoACuentaTotal('0')
  }, [financiamientoList])
  useEffect(() => {
    const total = adicionalesList.reduce(getSumAdi, 0)
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
  const getSum=(total, num) =>{
    return total + parseFloat(num.pesoBruto)
  }
  const getSumFina=(total, num) =>{
    return total + parseFloat(num.liquidacionFinanciamientoTotal)
  }
  const getSumAdi=(total, num) =>{
    return total + parseFloat(num.liquidacionAdicionalTotal)
  }

  const proveedorListAliquidar = async()=>{
    const proveedores = await searchProveedorALiquidar()
    console.log(proveedores)
    setProveedorALiquidarList(proveedores)
    const formatter= proveedores?.map(ut =>(
      formatterDataCombo(ut.personId, ut.proveedorNombre)))
    console.log(formatter)
    setProveedorComboList(formatter)
    console.log("se borró", proveedoresComboList)

  }
  const handleSelectionUTChange = (option) =>{
    setPersonaIdModel(option)
    const proveedor = proveedoresALiquidarList.find(p => p.personId == option)
    console.log(proveedor)
    setTierraIdModel(proveedor.tierraId)
    setCampoModel(proveedor.tierraCampo)
    setUtModel(proveedor.proveedorUT)
    setProveedorIdModel(proveedor.proveedorId)
  }
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      console.log(data)
      let mergedArray = []
      if(ticketsSeleccionadosList.length > 0){
        mergedArray = [
          ...ticketsSeleccionadosList,
          ...data.filter((item2) => !ticketsSeleccionadosList.some((item1) => item1.id === item2.id)),
        ]
      }else mergedArray = data
      const sortedArray = mergedArray.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      setTicketsSeleccionadosList(sortedArray)

      const { minDate, maxDate } = sortedArray.reduce(
        (acc, current) => {
          const currentFecha = new Date(current.fecha)
          if (currentFecha < acc.minDate) acc.minDate = currentFecha
          if (currentFecha > acc.maxDate) acc.maxDate = currentFecha
          return acc
        },
        { minDate: new Date(data[0].fecha), maxDate: new Date(data[0].fecha) }
      )
      setFechaInicioModel(convertirFechaToYMD(minDate))
      setFechaFinModel(convertirFechaToYMD(maxDate))
    }
    setShowPopup(false)
  }
  const handleAddTickerts = async(e)=>{
    e.preventDefault()
    console.log(validarCampos({tickets:true}))
    if(validarCampos({tickets:true})){
      setShowPopup(true)
    }
  }

  const handleAgregarFinanciamiento = (e) => {
    e.preventDefault()
    if (validarCampos({financiamiento:true})) {
      const updateFinanciamientoList = [...financiamientoList, {
        liquidacionFinanciamientoId: `temp-${Date.now()}`,
        liquidacionFinanciamientoFecha: financiamientoFechaModel,
        liquidacionFinanciamientoACuenta: financiamientoACuentaModel,
        liquidacionFinanciamientoTiempo: financiamientoTiempoModel,
        liquidacionFinanciamientoInteresMes: financiamientoInteresMesModel,
        liquidacionFinanciamientoInteres: financiamientoInteresModel,
        liquidacionFinanciamientoTotal: financiamientoTotalModel
      }]
      setFinanciamientoList(updateFinanciamientoList)
    }
  }
  const onRowDelete = (financiamiento) => {
    if (typeof financiamiento.liquidacionFinanciamientoId === "string" && financiamiento.liquidacionFinanciamientoId.startsWith("temp")) {
      setFinanciamientoList(financiamientoList.filter((item) => item.liquidacionFinanciamientoId !== financiamiento.liquidacionFinanciamientoId));
    } 
  }
  const handleAgregarAdicionales = (e) => {
    e.preventDefault()
    if (validarCampos({financiamiento:true})) {
      const updateAdicionalesList = [...adicionalesList, {
        liquidacionAdicionalId: `temp-${Date.now()}`,
        liquidacionAdicionalMotivo: adicionalesMotivoModel,
        liquidacionAdicionalTotal: adicionalesTotalModel
      }]
      setAdicionalesList(updateAdicionalesList)
    }
  }
  const onRowDeleteAdicionales = (adicionales) => {
    if (typeof adicionales.liquidacionAdicionalId === "string" && adicionales.liquidacionAdicionalId.startsWith("temp")) {
      setAdicionalesList(adicionalesList.filter((item) => item.liquidacionAdicionalId !== adicionales.liquidacionAdicionalId));
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
      if(!financiamientoFechaModel) nuevosErrores.financiamientoFecha = "La información de FECHA es obligatoria"
      if(!financiamientoACuentaModel) nuevosErrores.financiamientoACuenta = "La información de A CUENTA es obligatoria"
      if(!financiamientoTiempoModel) nuevosErrores.financiamientoTiempo = "La información de TIEMPO es obligatoria"
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
    if (validarCampos({tickets:true})) {
      let liquidacion = {        
        personaId:personaIdModel,
        tierraId: tierraIdModel,
        proveedorId: proveedorIdModel,

        liquidacionTickets: ticketsSeleccionadosList?.map(ticket => ({ticketId :ticket.id})),
        liquidacionFechaInicio: fechaInicioModel,
        liquidacionFechaFin: fechaFinModel,
        liquidacionPesoBruto: sumaPesoBrutoModel,
        liquidacionPesoNeto: toneladasPesosNetosModel,

        liquidacionToneladaPrecioCompra: pCompraModel,
        liquidacionToneladaTotal: toneladasTotalModel,

        liquidacionFinanciamientoACuenta: financiamientoACuentaTotal,
        liquidacionFinanciamientos: financiamientoList,

        liquidacionAdicionales: adicionalesList,
        liquidacionAdicionalTotal: adicionalesTotal,

        liquidacionPagar:liquidacionPorPagar,

        userCreatedName: "ADMIN",
        userCreatedAt: obtenerFechaLocal({date: new Date()})
      }
      console.log(liquidacion)
      const save = await liquidacionSave({method: 'POST', liquidacion})
      return onShowModel(save)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({liquidacionToneladasId:0})
  }

  return (
    <>
      <SectionModel title={(data.liquidacionToneladasId > 0 ? 'Información de':'Registrar') + ' Liquidación'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <FilterOption htmlFor={'SembradorModel'} name={'Sembrador'}>
            <ComboBoxCustom  initialOptions={proveedoresComboList} selectedOption={seleccionPersona}
              onSelectionChange={handleSelectionUTChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.ut ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
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
          { liquidacionIdModel =='' ? (
          <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Agregar'} onClick={handleAddTickerts} />
          ) :''}
        </TableHeaderCustom>
        <TableBodyCustom headers={headers}>
          {ticketsSeleccionadosList.length > 0 ? (
            ticketsSeleccionadosList.map((item) => (
              <tr key={item.id}>
                <TableTd hidden>{item.id}</TableTd>
                <TableTd>{item.ingenio}</TableTd>
                <TableTd>{item.campo}</TableTd>
                <TableTd>{item.viaje}</TableTd>
                <TableTd>{item.fecha.toLocaleDateString('es-PE')}</TableTd>
                <TableTd>{item.transportista}</TableTd>
                <TableTd>{item.camion}</TableTd>
                <TableTd>{item.camionPeso}</TableTd>
                <TableTd>{item.vehiculo}</TableTd>
                <TableTd>{item.vehiculoPeso}</TableTd>
                <TableTd>{item.pesoBruto}</TableTd>
              </tr>
            )
          ))
          :(<NoRegistros colSpan={headers.length - 1} />)}
        </TableBodyCustom>
        <TableFooterCustom>          
          <FilterOption htmlFor={'FechaInicioModel'} name={'Fecha Inicio'}>
            <>
            <InputDateCustom fechaValue={fechaInicioModel}
              valueError={errores.fechaInicio ? true: false}
              setFechaValue={setFechaInicioModel}/>
            {errores.fechaInicio && <p className="text-red-500 text-sm">{errores.fechaInicio}</p>}
            </>
          </FilterOption>
          <FilterOption htmlFor={'FechaFinalModel'} name={'Fecha Final'}>
            <>
            <InputDateCustom fechaValue={fechaFinModel}
              valueError={errores.fechaFin ? true: false}
              setFechaValue={setFechaFinModel}/>
            {errores.fechaFin && <p className="text-red-500 text-sm">{errores.fechaFin}</p>}
            </>
          </FilterOption>
          <FilterOption html={'PesoBrutoModel'} name={'Peso Bruto'}>
            <InputTextCustom textValue={sumaPesoBrutoModel} placeholder="Automático" readOnly />
          </FilterOption>
          <FilterOption htmlFor={'ToneladasPesoNetoModel'} name={'Peso Neto'}>
            <>
              <InputDecimalCustom onChange={setToneladasPesosNetosModel}
                valueError={errores.toneladasPesosNetos}
                placeholder={'Ejm: 10.55'} textValue={toneladasPesosNetosModel} />
              {errores.toneladasPesosNetos && <p className="text-red-500 text-sm">{errores.toneladasPesosNetos}</p>}
            </>
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
            <>
              <InputDecimalCustom onChange={setpComprasModel} decimales={2}
                textValue={pCompraModel} 
                valueError={errores.pCompra} 
                placeholder="Ejm: 115.00"/>
              {errores.pCompra && <MessageValidationInput mensaje={errores.pCompra}/>}
            </>
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
            <FilterOption htmlFor={'FinanciamientoFechaModel'} name={'Fecha'}>
              <InputDateCustom fechaValue={financiamientoFechaModel}
                valueError={errores.financiamientoFecha}
                setFechaValue={setFinanciamientoFechaModel}/>
              {errores.financiamientoFecha && <MessageValidationInput mensaje={errores.financiamientoFecha}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoACuenta'} name={'A Cuenta'}>
              <InputDecimalCustom onChange={setFinanciamientoACuentaModel} decimales={2}
                textValue={financiamientoACuentaModel} 
                valueError={errores.financiamientoACuenta} 
                placeholder="Ejm: 115.00"/>
              {errores.financiamientoACuenta && <MessageValidationInput mensaje={errores.financiamientoACuenta}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoTiempo'} name={'Tiempo/Meses'}>
              <InputNumberCustom onChange={setFinanciamientoTiempoModel}
                textValue={financiamientoTiempoModel} 
                valueError={errores.financiamientoTiempo} 
                placeholder="Ejm: 12"/>
              {errores.financiamientoTiempo && <MessageValidationInput mensaje={errores.financiamientoTiempo}/>}
            </FilterOption>
            <FilterOption htmlFor={'FinanciamientoInteresMes'} name={'Interes Mes %'}>
              <InputDecimalCustom onChange={setFinanciamientoInteresMesModel} decimales={2}
                textValue={financiamientoInteresMesModel} 
                valueError={errores.financiamientoInteresMes} 
                placeholder="Ejm: 115.00"/>
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
            { liquidacionIdModel =='' ? (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} name={'Agregar'} onClick={handleAgregarFinanciamiento} />
            ):''}
          </TableFooterCustom>
        </TableHeaderCustom>
        <TableBodyCustom headers={headersFinanciamiento}>
        {financiamientoList.length > 0 ? (
            financiamientoList.map((item) => (
              <tr key={item.liquidacionFinanciamientoId}>
                <TableTd>{item.liquidacionFinanciamientoFecha}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoACuenta}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoTiempo}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoInteresMes}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoInteres}</TableTd>
                <TableTd>{item.liquidacionFinanciamientoTotal}</TableTd>
                <TableTd>
                { liquidacionIdModel =='' ? (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDelete(item)}>
                    <Trash2 size={18} />
                  </TableButton>
                ):''}
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
                onChange={setAdicionalesMotivoModel}/>
              {errores.adicionalesMotivo && <MessageValidationInput mensaje={errores.adicionalesMotivo}/>}
            </FilterOption>
            <FilterOption htmlFor={'AdicionalTotalModel'} name={'Monto'}>
              <InputDecimalCustom onChange={setAdicionalesTotalModel} decimales={2}
                textValue={adicionalesTotalModel} 
                valueError={errores.adicionalTotalModel} 
                placeholder="Ejm:490.00"/>
              {errores.adicionalTotalModel && <MessageValidationInput mensaje={errores.adicionalTotalModel}/>}
            </FilterOption>
            { liquidacionIdModel =='' ? (
            <ButtonCustom extraClassName={'max-h-9 mt-6 md:w-28 '} name={'Agregar'} onClick={handleAgregarAdicionales} />
            ):''}
          </TableFooterCustom>
        </TableHeaderCustom>
        <TableBodyCustom headers={headersAdicionales}>
        {adicionalesList.length > 0 ? (
            adicionalesList.map((item) => (
              <tr key={item.liquidacionAdicionalId}>
                <TableTd>{item.liquidacionAdicionalMotivo}</TableTd>
                <TableTd>{item.liquidacionAdicionalTotal}</TableTd>
                <TableTd>
                { liquidacionIdModel =='' ? (
                  <TableButton className={'text-red-400 hover:text-red-300'}
                  onRowSelect={()=>onRowDeleteAdicionales(item)}>
                    <Trash2 size={18} />
                  </TableButton>
                ):''}
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
        {
          liquidacionIdModel =='' ? (
            <FooterButton accion={handleGuardar} name={'Guardar'} />
          ):''
        }
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup ? <CorteTicketPopup onShowModel={resspuestaShowModel} headers={headers} proveedorId={proveedorIdModel}/>    : ''}
    </>
  )
}