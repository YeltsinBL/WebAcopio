import { useEffect, useState } from "react"
import { toast } from "sonner"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom,
  InputDecimalCustom, InputTextCustom, MessageValidationInput, NoRegistros, SectionModel, 
  TableBodyCustom, TableContainerCustom, TableFooterCustom,
  TableHeaderCustom, TableTd, TitleCustom
} from "~components/common"
import { searchCarguilloList } from "~services/carguillo"
import { 
  FormatteDecimalMath, formatterDataCombo, obtenerFechaLocal 
} from "~utils/index"
import { servicioPaleroSave } from "~services/servicio"
import { ServicioTransportePopup } from "./ServicioPaleroPopup"
import { 
  AdapterServicioPaleroSave 
} from "~/adapters/ServicioAdapter"

export const ServicioPaleroForm = ({onShowModel, data}) => {
  const [carguilloList, setCarguilloList] = useState([])
  const [servicioIdModel, setServicioIdModel] = useState(0)
  const [fechaModel, setFechaModel] = useState('')
  const [carguilloIdModel, setCarguilloIdModel] = useState(0)
  const [servicioPrecioModel, setServicioPrecioModel] = useState('')
  const [sumaPesoBrutoModel, setSumaPesoBrutoModel] = useState('')
  const [totalModel, setTotalModel] = useState('')
  const [servicioTransporteSelected, setServicioTransporteSelected] = useState([])
  const [ticketSelected, setTicketSelected] = useState([])
  const [servicioDescripcion, setServicioDescripcion] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const [errores, setErrores] = useState({})

  const seleccionCarguillo = data.carguilloId ? {id: data.carguilloId, nombre: data.carguilloTitular } : null
  const headers = ['Ingenio', 'Campo', 'Viaje', 'Fecha', 'Vehículo', 'Camión', 'Transportista', 
    'Vehículo Peso', 'Camión Peso', 'Peso Bruto','Estado']

  useEffect(() => {
    const total = ticketSelected.reduce(getSum, 0)
    if(total>0) return setSumaPesoBrutoModel(FormatteDecimalMath(total,3))
    return setSumaPesoBrutoModel('')
  }, [ticketSelected])
  useEffect(()=>{
    if(servicioPrecioModel> 0 && sumaPesoBrutoModel > 0) 
      return setTotalModel(FormatteDecimalMath(servicioPrecioModel * sumaPesoBrutoModel,2))
    return setTotalModel('')
  },[servicioPrecioModel, sumaPesoBrutoModel])
  const getSum=(total, num) =>{
    return total + parseFloat(num.ticketPesoBruto)
  }
  useEffect(()=>{    
    getCarguillo()
    if(data){
      setServicioIdModel(data.servicioId || 0)
      setFechaModel(
        data.servicioFecha || obtenerFechaLocal({ date: new Date() }).split("T")[0])
      setCarguilloIdModel(data.carguilloId || 0)
      setServicioPrecioModel(data.servicioPrecio || '')
      setServicioDescripcion(data.servicioEstadoDescripcion || 'Activo')
      setTicketSelected(data.servicioDetails || [])
    }
  }, [])
  const getCarguillo = async() => {
    const paleros = await searchCarguilloList({tipoCarguilloId:1, titular:'', estado: 1})
    const formatter = paleros.map(palero =>
      (formatterDataCombo(palero.carguilloId, palero.carguilloTitular)))
      setCarguilloList(formatter)
  }
  const validarCampos = (viewPopUp = false) => {
    const nuevosErrores = {}
    if(!viewPopUp){
      if (!fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
      if (!servicioPrecioModel) nuevosErrores.precio = "El campo PRECIO es obligatorio."
      if (!sumaPesoBrutoModel) nuevosErrores.suma = "El campo SUMA PESO BRUTO es obligatorio."
      if (!totalModel) nuevosErrores.total = "El campo TOTAL es obligatorio."
    }
    if (!carguilloIdModel) nuevosErrores.carguillo = "El campo PALERO es obligatorio."
  
    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }

  const handleSelectionCarguilloChange = (option) => setCarguilloIdModel(option)
  const handleShowModel = () => {
    if(validarCampos(true)){
      setShowPopup(true)
    }
  }
  const resspuestaShowModel = (data) => {
    if(data.length > 0) {
      if(ticketSelected.length > 0){
        const mergedArray = [
          ...servicioTransporteSelected,
          ...data.filter((item2) => !servicioTransporteSelected.some((item1) => item1.servicioId === item2.servicioId)),
        ]
        setServicioTransporteSelected(mergedArray)
        const rest = mergedArray.flatMap(servicio => {return servicio.servicioDetails})
        setTicketSelected(rest)
      } else {
        setServicioTransporteSelected(data)
        const rest = data.flatMap(servicio => {return servicio.servicioDetails})
        setTicketSelected(rest)
      }
    }
    setShowPopup(false)
  }
  const handleGuardar = async(e)=>{
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    if(validarCampos()){
      let servicioModel = {
        fechaModel, carguilloIdModel,
        servicioPrecioModel, sumaPesoBrutoModel,
        totalModel, servicioTransporteSelected        
      }
      const servicioSave = await servicioPaleroSave({
        method:'POST',
        servicioPalero: AdapterServicioPaleroSave(servicioModel)
      })
      if(!servicioSave.result) 
        return toast.error(servicioSave.errorMessage, { id: toastLoadingCustom, style: { color:'red' }})
      setTimeout(() => {
        toast.dismiss(toastLoadingCustom)
      })
      return onShowModel(servicioSave)
    }
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({result:false})
  }
  return (
    <>
      <SectionModel title={(servicioIdModel > 0 ? 'Información':'Registrar') + ' Servicio Palero'}>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pt-3'>
          <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
            <InputDateCustom fechaValue={fechaModel}
              valueError={errores.fechaModel ? true: false}
              setFechaValue={setFechaModel} readOnly={servicioIdModel > 0} />
            {errores.fechaModel && <MessageValidationInput mensaje={errores.fechaModel}/>}
          </FilterOption>
          <FilterOption htmlFor={'CarguilloModel'} name={'Palero'}>
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
        </div>
      </SectionModel>
      <TableContainerCustom>
        <TableHeaderCustom>
          <TitleCustom titulo={'Lista de Tickets de Serv. Transporte'}  />
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
                <TableTd>{ticket.ticketVehiculo}</TableTd>
                <TableTd>{ticket.ticketCamion}</TableTd>
                <TableTd>{ticket.ticketTransportista}</TableTd>
                <TableTd>{ticket.ticketVehiculoPeso}</TableTd>
                <TableTd>{ticket.ticketCamionPeso}</TableTd>
                <TableTd>{ticket.ticketPesoBruto}</TableTd> 
                <TableTd>{ticket.ticketEstadoDescripcion}</TableTd>
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
