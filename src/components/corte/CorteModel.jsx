import React, { useEffect, useState } from 'react'
import CorteTicketPopup from './CorteTicketPopup'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { corteSave } from '~services/corte'
import { searchAsignaTierra } from '~services/asignartierra'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, 
  InputDateCustom, 
  InputTextCustom, 
  MessageValidationInput, 
  NoRegistros, SectionModel, 
  TableBodyCustom, 
  TableButton, 
  TableContainerCustom,
  TableFooterCustom,
  TableHeaderCustom,
  TableTd,
  TitleCustom
} from '~components/common'
import { 
  convertirFechaToYMD, FormatteDecimalMath, formatterDataCombo, obtenerFechaLocal 
} from '~utils/index'

export const CorteModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState(0)
  const [ucModel, setUcModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [precioModel, setPrecioModel] = useState('')
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState('')
  const [totalModel, setTotalModel] = useState('')
  const [estadoModel, setEstadoModel] = useState('Activo')
  const [proveedoresModel, setProvedoresModel] = useState('')
  const [ticketSelected, setTicketSelected] = useState([])
  const [errores, setErrores] = useState({})
  const [showPopup, setShowPopup] = useState(false)

  const seleccionTierra = data.tierraId ? {id: data.tierraId, nombre: data.tierraUC } : null
  const [ucLista, setUcLista] = useState([])
  const [ucListaCombo, setUcListaCombo] = useState([])
  const headers = ['Ingenio', 'Viaje', 'Fecha', 'Vehículo', 'Camión', 'Transportista', 
    'Vehículo Peso', 'Camión Peso', 'Peso Bruto','Campo', 'Estado','Acción']

  useEffect(()=> {
    getListUC()
  },[])
  useEffect(()=>{
    if(data){
      setIdModel(data.corteId || 0)
      setUcModel(data.tierraUC || '')
      setCampoModel(data.tierraCampo || '')
      setFechaModel(
        data.corteFecha ? convertirFechaToYMD(data.corteFecha) : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setPrecioModel(data.cortePrecio || '')
      setSumaPesoBrutoModel(data.cortePesoBrutoTotal || '')
      setTotalModel(data.corteTotal || '')
      setEstadoModel(data.corteEstadoDescripcion || 'Activo')
      setTicketSelected(data.corteDetail || [])
      setProvedoresModel(data.proveedoresNombres || '')
    }
  }, [data])
  useEffect(() => {
    const total = ticketSelected.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketSelected])
  useEffect(()=>{
    if(precioModel > 0 && sumaPesoBrutoModel > 0) 
      return setTotalModel(FormatteDecimalMath(precioModel * sumaPesoBrutoModel,2))
    return setTotalModel('')
  },[precioModel, sumaPesoBrutoModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.ticketPesoBruto)
  }
  const getListUC = async() => {
    const ucs = await searchAsignaTierra()
    setUcLista(ucs)
    const formatter= ucs?.map(tipo =>
      (formatterDataCombo(tipo.asignarTierraTierraId, tipo.asignarTierraTierraUC)))
    setUcListaCombo(formatter)
  }
  const validarCampos = () => {
    const nuevosErrores = {}
    if (!ucModel) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!fechaModel) nuevosErrores.fecha = "El campo FECHA es obligatorio."
    if (!precioModel) nuevosErrores.precio = "El campo PRECIO es obligatorio."
    if (!sumaPesoBrutoModel) nuevosErrores.suma = "El campo SUMA PESO BRUTO es obligatorio."
    if (!totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleSelectionChange = (option) => {
    setUcModel(option)
    var uc = ucLista.find((item) => item.asignarTierraTierraId === option)
    setCampoModel(uc.tierraCampo)
    setProvedoresModel(uc.proveedoresNombres)
  }
  const handleShowModel = () => setShowPopup(true)
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
  const handleGuardar = async(e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    if (validarCampos()) {
      const corte = await corteSave('POST', {
        corteFecha: fechaModel,
        tierraId: ucModel,
        cortePrecio: precioModel,
        cortePesoBrutoTotal: sumaPesoBrutoModel,
        corteTotal: totalModel,
        userCreatedName: 'ADMIN',
        userCreatedAt: obtenerFechaLocal({date: new Date()}),
        corteDetail: ticketSelected?.map(ticket => ({ticketId :ticket.ticketId}))
      })
      if(!corte.result) 
        return toast.error(corte.errorMessage, { id: toastLoadingCustom, style: { color:'red' }})
      setTimeout(() => {
        toast.dismiss(toastLoadingCustom)
      })
      onShowModel(corte)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({corteId:0})
  }
  const onRowDelete= (data)=>{
    setTicketSelected(ticketSelected.filter(ticket => ticket.ticketId !== data.ticketId))
  }
  return (
    <>
    <SectionModel title={(idModel > 0 ? 'Información del': 'Registrar') + ' Corte'}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3'>
        <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
          <InputDateCustom fechaValue={fechaModel} setFechaValue={setFechaModel}
            valueError={errores.fecha ? true: false} readOnly={idModel > 0} />
          {errores.fecha && <MessageValidationInput mensaje={errores.fecha}/>}
        </FilterOption>           
        <FilterOption htmlFor={'UCFilter'} name={'UC'} >
          <ComboBoxCustom  initialOptions={ucListaCombo} selectedOption={seleccionTierra} 
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.uc ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
            allDisabled={idModel > 0 }
          />
          {errores.uc && <MessageValidationInput mensaje={errores.uc} />}
        </FilterOption>
        <FilterOption htmlFor={'CampoModel'} name={'Campo'}>
          <InputTextCustom textValue={campoModel} placeholder='Automático' readOnly/>
        </FilterOption>
        <FilterOption htmlFor={'PrecioModel'} name={'Precio Corte'}>
          <InputTextCustom textValue={precioModel} placeholder='Ejm: 85.60'
            onChange={setPrecioModel} valueError={errores.precio}
            readOnly={idModel > 0} />
          {errores.precio && <MessageValidationInput mensaje={errores.precio} />}
        </FilterOption>
        <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
          <InputTextCustom textValue={estadoModel} placeholder='Automático' readOnly />
        </FilterOption>
        <div className='space-y-2 md:col-span-2 lg:col-span-4 '>
          <FilterOption htmlFor="ProveedoresModel" name={'Proveedores'}>
            <InputTextCustom textValue={proveedoresModel} placeholder='Automático' readOnly />
          </FilterOption>
        </div>
      </div>        
    </SectionModel>
    <TableContainerCustom>
      <TableHeaderCustom>
        <TitleCustom titulo={'Lista de Tickets Seleccionados'} />
        <ButtonCustom name={'Agregar'} onClick={handleShowModel} extraClassName={idModel > 0 ? 'hidden' : ''} />
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
              <TableTd>{ticket.ticketCampo}</TableTd>
              <TableTd>{ticket.ticketEstadoDescripcion}</TableTd>
              <TableTd hidden={idModel > 0}>
                <TableButton className='text-red-400 hover:text-red-300'
                  onRowSelect={()=>onRowDelete(ticket)} >
                  <Trash2 size={18} />
                </TableButton>
              </TableTd>                
            </tr>
          ))
        ): ( <NoRegistros colSpan={headers.length -1}/> )}
      </TableBodyCustom>
      <TableFooterCustom>  
        <FilterOption htmlFor={'PesoBrutoModel'} name={'Suma Peso Bruto'}>
          <InputTextCustom textValue={sumaPesoBrutoModel} placeholder='Automático'
            readOnly />
          {errores.suma && <MessageValidationInput mensaje={errores.suma} />}
        </FilterOption>
        <FilterOption htmlFor={'totalModel'} name={'Total'}>
          <InputTextCustom textValue={totalModel} placeholder='Automático'
            readOnly />
          {errores.total && <MessageValidationInput mensaje={errores.total} />}
        </FilterOption>
      </TableFooterCustom>
	  </TableContainerCustom>

    <Footer>
      { idModel > 0  || (<FooterButton accion={handleGuardar} name={"Guardar"}/>) }
      <FooterButton accion={handleCancelar} name={"Cancelar"}/>
    </Footer>
    {showPopup ? <CorteTicketPopup onShowModel={resspuestaShowModel} headers={headers}/>    : ''}
    </>
  )
}
