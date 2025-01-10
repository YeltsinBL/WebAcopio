import { useEffect, useState } from 'react'
import { 
  ComboBoxCustom, FilterOption, Footer, FooterButton, 
  InputDateCustom, 
  InputTextCustom, 
  MessageValidationInput, 
  SectionModel 
} from '../../../../components/common'
import { ticketSave } from '../../../../services/ticket'
import { getCarguilloPlacasList, searchCarguilloList } from '../../../../services/carguillo'
import { 
  convertirFechaToYMD, FormatteDecimal, formatterDataCombo, obtenerFechaLocal 
} from '../../../../utils'

export const TicketForm = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState(0)
  const [ingenioModel, setIngenioModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [viajeModel, setViajeModel] = useState('')
  const [carguilloId, setCarguilloId] = useState('')
  const [choferModel, setChoferModel] = useState('')
  const [fechaModel, setFechaModel] = useState(obtenerFechaLocal({date: new Date()}).split('T')[0])
  const [camionModel, setCamionModel] = useState('')
  const [camionPesoModel, setCamionPesoModel] = useState('')
  const [vehiculoModel, setVehiculoModel] = useState('')
  const [vehiculoPesoModel, setVehiculoPesoModel] = useState('')
  const [unidadPesoModel, setUnidadPesoModel] = useState('TN')
  const [pesoBrutoModel, setPesoBrutoModel] = useState('')
  const [estadoModel, setEstadoModel] = useState('Activo')

  const [carguilloList, setCarguilloList] = useState([])
  const [placaCamionList, setPlacaCamionList] = useState([])
  const [placaVehiculoList, setPlacaVehiculoList] = useState([])
  const [seleccionPlacaCamion, setseleccionPlacaCamion] = useState(
    data?.carguilloDetalleCamionId ? 
    {id:data?.carguilloDetalleCamionId, nombre: data?.ticketCamion} : null)
  const [seleccionPlacaVehiculo, setseleccionPlacaVehiculo] = useState(
    data?.carguilloDetalleVehiculoId ? 
    {id:data?.carguilloDetalleVehiculoId, nombre: data?.ticketVehiculo} : null)
  const seleccionCarguillo = data?.carguilloId ? {id:data?.carguilloId, nombre: data?.ticketTransportista} : null

  const [errores, setErrores] = useState({})
  useEffect(() =>{
    listCarguillos()
  }, [])
  useEffect(() => {
    if (data) {
      setIdModel(data.ticketId || 0)
      setIngenioModel(data.ticketIngenio || '')
      setCampoModel(data.ticketCampo || '')
      setViajeModel(data.ticketViaje || '')
      setCarguilloId(data.carguilloId || '')
      setChoferModel(data.ticketChofer || '')
      setFechaModel(
        data.ticketFecha? convertirFechaToYMD(data.ticketFecha) :
        obtenerFechaLocal({date: new Date()}).split('T')[0])
      setCamionModel(data.carguilloDetalleCamionId || "")
      setCamionPesoModel(data.ticketCamionPeso || "")
      setVehiculoModel(data.carguilloDetalleVehiculoId || "")
      setVehiculoPesoModel(data.ticketVehiculoPeso || "")
      setUnidadPesoModel(data.ticketUnidadPeso || 'TN')
      setPesoBrutoModel(data.ticketPesoBruto || '')
      setEstadoModel(data.ticketEstadoDescripcion || 'Activo')      
    }
  }, [data])

  useEffect(()=> {
    if (!parseFloat(camionPesoModel)) return
    if (!parseFloat(vehiculoPesoModel)) return
    const camionPeso = parseFloat(camionPesoModel) > 0 ? parseFloat(camionPesoModel) : 0
    const vehiculoPeso = parseFloat(vehiculoPesoModel) > 0 ? parseFloat(vehiculoPesoModel) : 0
    const calculate = camionPeso + vehiculoPeso
    setPesoBrutoModel( calculate > 0 ? FormatteDecimal(calculate,3) : '' )
  }, [camionPesoModel, vehiculoPesoModel])

  useEffect(()=>{
    if(carguilloId>0){
      listCarguilloPlacas(carguilloId)
    }
  },[carguilloId])
  const listCarguillos = async() =>{
    const carguillos = await searchCarguilloList({
      tipoCarguilloId:2, titular:'', estado:true})
    const formatter = carguillos.map(carguillo => 
      (formatterDataCombo(carguillo.carguilloId,carguillo.carguilloTitular)))
    setCarguilloList(formatter)
  }
  const listCarguilloPlacas =async(carguilloId)=>{
    const placaCamiones = await getCarguilloPlacasList(carguilloId)
    setPlacaCamionList( 
      placaCamiones.carguilloTipoCamion.map(placa =>
      (formatterDataCombo(placa.carguilloDetalleId,placa.carguilloDetallePlaca)))
    )
    setPlacaVehiculoList(
      placaCamiones.carguilloTipoVehiculo.map(placa =>
        (formatterDataCombo(placa.carguilloDetalleId,placa.carguilloDetallePlaca)))
    )
  }

  const handleSelectionChange = async(option) => {
    setCarguilloId(option)
    setCamionModel('')
    setVehiculoModel('')
    setPlacaVehiculoList([])
    setPlacaCamionList([])
    setseleccionPlacaCamion(null)
    setseleccionPlacaVehiculo(null)
  }
  const handleSelectionCamionChange = (option) => setCamionModel(option)
  const handleSelectionVehiculoChange = (option) => setVehiculoModel(option)

  const validarCampos = () => {
    const nuevosErrores = {}
    //if (!idModel) nuevosErrores.id = "El campo ID es obligatorio."
    if (!ingenioModel) nuevosErrores.ingenio = "El campo INGENIO es obligatorio."
    if (!viajeModel) nuevosErrores.viaje = "El campo VIAJE es obligatorio."
    if (!carguilloId) nuevosErrores.transportista = "El campo TRANSPORTISTA es obligatorio."
    //if (!choferModel) nuevosErrores.chofer = "El campo CHOFER es obligatorio."
    if (!fechaModel) nuevosErrores.fecha = "El campo FECHA es obligatorio."
    if (!camionModel) nuevosErrores.camion = "El campo CAMIÓN es obligatorio."
    if (!camionPesoModel) nuevosErrores.camionPeso = "El campo CAMIÓN PESO es obligatorio."
    if (!vehiculoModel) nuevosErrores.vehiculo = "El campo VEHÍCULO es obligatorio."
    if (!vehiculoPesoModel) nuevosErrores.vehiculoPeso = "El campo VEHÍCULO PESO es obligatorio."
    if (!unidadPesoModel) nuevosErrores.unidadPeso = "El campo UNIDAD PESO es obligatorio."
    if (!pesoBrutoModel) nuevosErrores.pesoBruto = "El campo PESO BRUTO es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      let save = {
        ticketIngenio:ingenioModel,
        ticketCampo: campoModel,
        ticketFecha: fechaModel,
        ticketViaje: viajeModel,
        carguilloId:carguilloId, 
        ticketChofer: choferModel || null,
        carguilloDetalleCamionId: camionModel,
        ticketCamionPeso: camionPesoModel,
        carguilloDetalleVehiculoId: vehiculoModel,
        ticketVehiculoPeso: vehiculoPesoModel,
        ticketUnidadPeso:unidadPesoModel,
        ticketPesoBruto: pesoBrutoModel,
      }
      if(idModel > 0) {
        save = {...save,
          ticketId:idModel,
          userModifiedAt: obtenerFechaLocal({date: new Date()}),
          userModifiedName: "ADMIN" }
        const ticket = await ticketSave('PUT',save)
        return retorna(ticket)
      }
      save = {...save,
        userCreatedAt: obtenerFechaLocal({date: new Date()}),
        userCreatedName: "ADMIN" }
      const ticket = await ticketSave('POST',save)
      return retorna(ticket)
    }
  }
  const retorna = (ticket) => {
    return onShowModel({...ticket, fecha : new Date(ticket.fecha)})
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({id:0})
  }
  return (
    <>
    <SectionModel title={(idModel > 0 ? 'Editar' : 'Registrar')+ ' Ticket'} >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3'>
        <FilterOption htmlFor={'IngenioModel'} name={'Ingenio'}>
          <InputTextCustom textValue={ingenioModel} placeholder={'Ejm: Casa Grande'}
            onChange={setIngenioModel} valueError={errores.ingenio} />
          {errores.ingenio && <MessageValidationInput mensaje={errores.ingenio}/>}
        </FilterOption>
        <FilterOption htmlFor={'CampoModel'} name={'Campo'}>
          <InputTextCustom textValue={campoModel}  placeholder='Ingrese el nombre del campo (opcional)'
            onChange={setCampoModel}/>
        </FilterOption>
        <FilterOption htmlFor={'ViajeModel'} name={'Viaje'}>
          <InputTextCustom textValue={viajeModel} placeholder={'Ejm: 508689'}
            onChange={setViajeModel} valueError={errores.viaje} />
          {errores.viaje && <MessageValidationInput mensaje={errores.viaje}/>}
        </FilterOption>
        <FilterOption htmlFor={'CarguilloModel'} name={'Transportista'}>
          <ComboBoxCustom initialOptions={carguilloList} selectedOption={seleccionCarguillo}
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.transportista ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.transportista && <MessageValidationInput mensaje={errores.transportista}/>}
        </FilterOption>
        <FilterOption htmlFor={'ChoferModel'} name={'Chofer'}>
          <InputTextCustom textValue={choferModel} placeholder='Ingrese el nombre (opcional)'          
            onChange={setChoferModel} />
        </FilterOption>
        <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
          <InputDateCustom fechaValue={fechaModel} setFechaValue={setFechaModel}
            valueError={errores.fecha} />
          {errores.fecha && <MessageValidationInput mensaje={errores.fecha}/>}
        </FilterOption>
        <FilterOption htmlFor={'CamionModel'} name={'Camión'}>
          <ComboBoxCustom initialOptions={placaCamionList} selectedOption={seleccionPlacaCamion}
            onSelectionChange={handleSelectionCamionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.camion ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.camion && <MessageValidationInput mensaje={errores.camion}/>}
        </FilterOption>
        <FilterOption htmlFor={'CamionPesoModel'} name={'Camión Peso'}>
          <InputTextCustom textValue={camionPesoModel} placeholder={'Ejm: 19.590'}
            onChange={setCamionPesoModel} valueError={errores.camionPeso} />
          {errores.camionPeso && <MessageValidationInput mensaje={errores.camionPeso}/>}
        </FilterOption>
        <FilterOption htmlFor={'VehiculoModel'} name={'Vehículo'}>
          <ComboBoxCustom initialOptions={placaVehiculoList} selectedOption={seleccionPlacaVehiculo}
            onSelectionChange={handleSelectionVehiculoChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.vehiculo ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.vehiculo && <MessageValidationInput mensaje={errores.vehiculo}/>}
        </FilterOption>
        <FilterOption htmlFor={'VehiculoPesoModel'} name={'Vehículo Peso'}>
          <InputTextCustom textValue={vehiculoPesoModel} placeholder={'Ejm: 31.860'}
            onChange={setVehiculoPesoModel} valueError={errores.vehiculoPeso} />
          {errores.vehiculoPeso && <MessageValidationInput mensaje={errores.vehiculoPeso}/>}
        </FilterOption>
        <FilterOption htmlFor={'UnidadPesoModel'} name={'Unidad Peso'}>
          <InputTextCustom textValue={unidadPesoModel} placeholder={'Ejm: Kg'}
            onChange={setUnidadPesoModel} valueError={errores.unidadPeso} />
          {errores.unidadPeso && <MessageValidationInput mensaje={errores.unidadPeso}/>}
        </FilterOption>
        <FilterOption htmlFor={'PesoBrutoModel'} name={'Peso Bruto'}>
          <InputTextCustom textValue={pesoBrutoModel} placeholder='Automático'
            onChange={setPesoBrutoModel} valueError={errores.pesoBruto}
            readOnly />
          {errores.pesoBruto && <MessageValidationInput mensaje={errores.pesoBruto}/>}
        </FilterOption>
        <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
          <InputTextCustom textValue={estadoModel} placeholder='Automático'
            onChange={setEstadoModel} valueError={errores.estado}
            readOnly />
          {errores.estado && <MessageValidationInput mensaje={errores.estado}/>}
        </FilterOption>
      </div>
    </SectionModel>
    <Footer>
      { estadoModel =='Activo'?
        <FooterButton accion={handleGuardar} name={"Guardar"}/> :''
      }
      <FooterButton accion={handleCancelar} name={"Cancelar"}/>
    </Footer>
    </>
  )
}
