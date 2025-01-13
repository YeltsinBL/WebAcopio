import { useEffect, useState } from "react"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom,
  InputDecimalCustom, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, 
  TableBodyCustom, 
  TableButton, 
  TableContainerCustom,
  TableFooterCustom,
  TableHeaderCustom,
  TableTd,
  TitleCustom
} from "../common"
import { getCarguilloInTickets, searchCarguilloList } from "../../services/carguillo"
import { convertirFechaDDMMYYYY, FormatteDecimalMath, 
  formatterDataCombo, obtenerFechaLocal 
} from "../../utils"
import { servicioTransporteSave } from "../../services/serviciotransporte"
import { Trash2 } from "lucide-react"
import { ServicioTransportePopup } from "./ServicioTransportePopup"

export const ServicioTransporteModal = ({onShowModel, data}) => {
  const [carguilloList, setCarguilloList] = useState([])
  const [carguilloPaleroLista, setCarguilloPaleroLista] = useState([])
  const [servicioIdModel, setServicioIdModel] = useState(0)
  const [fechaModel, setFechaModel] = useState('')
  const [carguilloIdModel, setCarguilloIdModel] = useState(0)
  const [servicioPrecioModel, setServicioPrecioModel] = useState('')
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState('')
  const [totalModel, setTotalModel] = useState('')
  const [ticketSelected, setTicketSelected] = useState([])
  const [servicioDescripcion, setServicioDescripcion] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [carguilloIdPaleroModel, setCarguilloIdPaleroModel] = useState('')
  const [carguilloPaleroPrecioModel, setCarguilloPaleroPrecioModel] = useState('')

  const [errores, setErrores] = useState({})

  const seleccionCarguillo = data.carguilloId ? {id: data.carguilloId, nombre: data.carguilloTitular } : null
  const seleccionCarguilloPalero = data.carguilloIdPalero ? {id: data.carguilloIdPalero, nombre: data.carguilloTitularPalero } : null
  
  const headers = ['Ingenio', 'Campo', 'Viaje', 'Fecha', 'Transportista', 'Camión', 
    'Camión Peso', 'Vehículo', 'Vehículo Peso', 'Peso Bruto','Estado','Acción']

  useEffect(() => {
    const total = ticketSelected.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketSelected])
  useEffect(()=>{
    if(servicioPrecioModel> 0 && carguilloPaleroPrecioModel >= 0 && sumaPesoBrutoModel > 0) 
      return setTotalModel(FormatteDecimalMath((servicioPrecioModel * sumaPesoBrutoModel) + parseFloat(carguilloPaleroPrecioModel||0 )* sumaPesoBrutoModel ,2))
    return setTotalModel('')
  },[servicioPrecioModel, carguilloPaleroPrecioModel, sumaPesoBrutoModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.ticketPesoBruto)
  }
  useEffect(()=>{    
    getCarguillo()
    getListCarguilloPalero()
    if(data){
      setServicioIdModel(data.servicioTransporteId || 0)
      setFechaModel(
        data.servicioTransporteFecha || obtenerFechaLocal({ date: new Date() }).split("T")[0])
      setCarguilloIdModel(data.carguilloId || 0)
      setServicioPrecioModel(data.servicioTransportePrecio || '')
      setServicioDescripcion(data.servicioTransporteEstadoDescripcion || 'Activo')
      setTicketSelected(data.servicioTransporteDetails || [])
      setCarguilloIdPaleroModel(data.carguilloIdPalero || '')
      setCarguilloPaleroPrecioModel(data.carguilloPaleroPrecio || '')
    }
  }, [])
  const getCarguillo = async() =>{
    const tipos = await getCarguilloInTickets()
    const formatter = tipos?.map(tipo =>(
      formatterDataCombo(tipo.carguilloId,tipo.carguilloTitular)))
    setCarguilloList(formatter)
  }
  const getListCarguilloPalero = async() => {
    const paleros = await searchCarguilloList({tipoCarguilloId:1, titular:'', estado: 1})
    const formatter = paleros.map(palero =>
      (formatterDataCombo(palero.carguilloId, palero.carguilloTitular)))
    setCarguilloPaleroLista(formatter)
  }
  const validarCampos = (viewPopUp = false) => {
    const nuevosErrores = {}
    if(!viewPopUp){
      if (!fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
      if (!servicioPrecioModel) nuevosErrores.precio = "El campo PRECIO es obligatorio."
      if (!sumaPesoBrutoModel) nuevosErrores.suma = "El campo SUMA PESO BRUTO es obligatorio."
      if (!totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
    }
    if (!carguilloIdModel) nuevosErrores.carguillo = "El campo TRANSPORTISTA es obligatorio."
  
    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }

  const handleSelectionCarguilloChange = (option) => {
    setCarguilloIdModel(option)
    setTicketSelected([])
  }
  const handleSelectionCarguilloPaleroChange = (option) => setCarguilloIdPaleroModel(option)
  const handleShowModel = () => {
    if(validarCampos(true)){
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
  const handleGuardar = async(e)=>{
    e.preventDefault()
    if(validarCampos()){
      let servicioModel = {
        servicioTransporteFecha: fechaModel,
        carguilloId: carguilloIdModel,
        servicioTransportePrecio: servicioPrecioModel,
        servicioTransporteTotal: totalModel,
        servicioTransporteDetail: ticketSelected?.map(ticket => ({ticketId :ticket.ticketId})),
        carguilloIdPalero: (carguilloIdPaleroModel==''|| isNaN(carguilloIdPaleroModel))?null:carguilloIdPaleroModel,
        carguilloPaleroPrecio: carguilloPaleroPrecioModel || null
      }
      if(servicioIdModel >0){
        servicioModel = {...servicioModel, 
          servicioTransporteId: servicioIdModel,
          servicioTransporteEstadoDescripcion: servicioDescripcion,
          userModifiedAt: obtenerFechaLocal({date: new Date()}),
          userModifiedName: "ADMIN"
        }
        // const servicioSave = await servicioTransporteSave({method:'PUT',servicioTransporte: servicioModel})
        // return onShowModel({...servicioSave,
        //   servicioTransporteFecha: convertirFechaDDMMYYYY(servicioSave.servicioTransporteFecha)
        // })
        return console.log(servicioModel)
      }      

      servicioModel.userCreatedAt= obtenerFechaLocal({date: new Date()})
      servicioModel.userCreatedName= "ADMIN"
      const servicioSave = await servicioTransporteSave({method:'POST', servicioTransporte: servicioModel})
      return onShowModel({...servicioSave,
        servicioTransporteFecha: convertirFechaDDMMYYYY(servicioSave.servicioTransporteFecha)
      })
    }
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
              valueError={errores.precio} readOnly={servicioIdModel > 0}
              placeholder={'Ejm: 10.55'} textValue={servicioPrecioModel} />
            {errores.precio && <MessageValidationInput mensaje={errores.precio}/>}
          </FilterOption>
          <FilterOption htmlFor={'TransportePrecioModel'} name={'Estado'}>
            <InputTextCustom onChange={setServicioDescripcion}
              textValue={servicioDescripcion} readOnly={true} />
          </FilterOption>
          <FilterOption htmlFor={'CarguilloIdPaleroModel'} name={'Palero'}>
            <ComboBoxCustom  initialOptions={carguilloPaleroLista} selectedOption={seleccionCarguilloPalero} 
              onSelectionChange={handleSelectionCarguilloPaleroChange}
              className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500`}
              colorOptions={"text-black"}
              disabled={false} allDisabled={servicioIdModel > 0}
            />
        </FilterOption>
        <FilterOption htmlFor={'PrecioModel'} name={'Precio Pala'}>
            <InputTextCustom onChange={setCarguilloPaleroPrecioModel} placeholder='Ejm: 85.60'
              textValue={carguilloPaleroPrecioModel} readOnly={servicioIdModel > 0}/>
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
                <TableTd>{ticket.ticketCampo}</TableTd>
                <TableTd>{ticket.ticketViaje}</TableTd>
                <TableTd>{ticket.ticketFecha}</TableTd>
                <TableTd>{ticket.ticketTransportista}</TableTd>
                <TableTd>{ticket.ticketCamion}</TableTd>
                <TableTd>{ticket.ticketCamionPeso}</TableTd>
                <TableTd>{ticket.ticketVehiculo}</TableTd>
                <TableTd>{ticket.ticketVehiculoPeso}</TableTd>
                <TableTd>{ticket.ticketPesoBruto}</TableTd> 
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
      <Footer>
        {servicioIdModel > 0 ?(''): (
          <FooterButton accion={handleGuardar} name={'Guardar'} />
        )}
        <FooterButton accion={handleCancelar} name={'Cancelar'} />
      </Footer>
      {showPopup ? <ServicioTransportePopup onShowModel={resspuestaShowModel} headers={headers} carguilloId={carguilloIdModel}/>    : ''}
    </>
  )
}
