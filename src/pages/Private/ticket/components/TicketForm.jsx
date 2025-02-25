import { 
  ComboBoxCustom, FilterOption, Footer, FooterButton, 
  InputDateCustom, InputTextCustom, MessageValidationInput, 
  SectionModel 
} from '~components/common'
import { ticketSave } from '~services/ticket'
import { useTicketForm } from '../hooks/useTicketForm'
import { useTicketValidation } from '../hooks/useTicketValidation'
import { TicketAdapterGuardar } from '../adapter/TicketAdapter'

export const TicketForm = ({ onShowModel, data }) => {

  const {
    idModel, ingenioModel, setIngenioModel,
    campoModel, setCampoModel,
    viajeModel, setViajeModel,
    carguilloId, setCarguilloId,
    choferModel, setChoferModel,
    fechaModel, setFechaModel,
    camionModel, setCamionModel,
    camionPesoModel, setCamionPesoModel,
    vehiculoModel, setVehiculoModel,
    vehiculoPesoModel, setVehiculoPesoModel,
    unidadPesoModel, setUnidadPesoModel,
    pesoBrutoModel, setPesoBrutoModel,
    estadoModel, setEstadoModel,
    carguilloList, placaCamionList, setPlacaCamionList,
    placaVehiculoList, setPlacaVehiculoList,
    seleccionPlacaCamion, setseleccionPlacaCamion,
    seleccionPlacaVehiculo, setseleccionPlacaVehiculo,
    seleccionCarguillo, carguilloPaleroId, setCarguilloPaleroId,
    seleccionCarguilloPalero, carguilloPaleroList,
  } = useTicketForm(data)
  const {validate, errores} = useTicketValidation()

  const handleSelectionChange = async(option) => {
    setCarguilloId(option)
    setCamionModel('')
    setVehiculoModel('')
    setPlacaVehiculoList([])
    setPlacaCamionList([])
    setseleccionPlacaCamion(null)
    setseleccionPlacaVehiculo(null)
  }
  const handleSelectionChangePalero = (option) => setCarguilloPaleroId(option)
  const handleSelectionCamionChange = (option) => setCamionModel(option)
  const handleSelectionVehiculoChange = (option) => setVehiculoModel(option)

  const handleGuardar = async(e) => {
    e.preventDefault()
    let save = {
      idModel, ingenioModel, campoModel,
      fechaModel, viajeModel,
      carguilloId, choferModel,
      camionModel, camionPesoModel,
      vehiculoModel, vehiculoPesoModel,
      unidadPesoModel, pesoBrutoModel,
      carguilloPaleroId, 
    }
    const {isValid} = validate(save)
    if(isValid){
      const ticket = await ticketSave(
        idModel > 0?'PUT':'POST',
        TicketAdapterGuardar(save)
      )
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
            onChange={setIngenioModel} valueError={errores.ingenio} readOnly={estadoModel !='Activo'} />
          {errores.ingenio && <MessageValidationInput mensaje={errores.ingenio}/>}
        </FilterOption>
        <FilterOption htmlFor={'CampoModel'} name={'Campo'}>
          <InputTextCustom textValue={campoModel}  placeholder='Ingrese el nombre del campo (opcional)'
            onChange={setCampoModel} readOnly={estadoModel !='Activo'} />
        </FilterOption>
        <FilterOption htmlFor={'ViajeModel'} name={'Viaje'}>
          <InputTextCustom textValue={viajeModel} placeholder={'Ejm: 508689'}
            onChange={setViajeModel} valueError={errores.viaje} readOnly={estadoModel !='Activo'} />
          {errores.viaje && <MessageValidationInput mensaje={errores.viaje}/>}
        </FilterOption>
        <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
          <InputDateCustom fechaValue={fechaModel} setFechaValue={setFechaModel}
            valueError={errores.fecha} readOnly={estadoModel !='Activo'} />
          {errores.fecha && <MessageValidationInput mensaje={errores.fecha}/>}
        </FilterOption>
        <FilterOption htmlFor={'ChoferModel'} name={'Chofer'}>
          <InputTextCustom textValue={choferModel} placeholder='Ingrese el nombre (opcional)'          
            onChange={setChoferModel} readOnly={estadoModel !='Activo'} />
        </FilterOption>
        <FilterOption htmlFor={'CarguilloModel'} name={'Transportista'}>
          <ComboBoxCustom initialOptions={carguilloList} selectedOption={seleccionCarguillo}
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.transportista ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"} allDisabled={estadoModel !='Activo'}
          />
          {errores.transportista && <MessageValidationInput mensaje={errores.transportista}/>}
        </FilterOption>
        <FilterOption htmlFor={'VehiculoModel'} name={'Vehículo'}>
          <ComboBoxCustom initialOptions={placaVehiculoList} selectedOption={seleccionPlacaVehiculo}
            onSelectionChange={handleSelectionVehiculoChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.vehiculo ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"} disabled={false} allDisabled={estadoModel !='Activo'}
          />
          {errores.vehiculo && <MessageValidationInput mensaje={errores.vehiculo}/>}
        </FilterOption>
        <FilterOption htmlFor={'VehiculoPesoModel'} name={'Vehículo Peso'}>
          <InputTextCustom textValue={vehiculoPesoModel} placeholder={'Ejm: 31.860'}
            onChange={setVehiculoPesoModel} valueError={errores.vehiculoPeso} readOnly={estadoModel !='Activo'} />
          {errores.vehiculoPeso && <MessageValidationInput mensaje={errores.vehiculoPeso}/>}
        </FilterOption>
        <FilterOption htmlFor={'CamionModel'} name={'Camión'}>
          <ComboBoxCustom initialOptions={placaCamionList} selectedOption={seleccionPlacaCamion}
            onSelectionChange={handleSelectionCamionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.camion ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"} disabled={false} allDisabled={estadoModel !='Activo'}
          />
          {errores.camion && <MessageValidationInput mensaje={errores.camion}/>}
        </FilterOption>
        <FilterOption htmlFor={'CamionPesoModel'} name={'Camión Peso'}>
          <InputTextCustom textValue={camionPesoModel} placeholder={'Ejm: 19.590'}
            onChange={setCamionPesoModel} valueError={errores.camionPeso} readOnly={estadoModel !='Activo'} />
          {errores.camionPeso && <MessageValidationInput mensaje={errores.camionPeso}/>}
        </FilterOption>
        <FilterOption htmlFor={'UnidadPesoModel'} name={'Unidad Peso'}>
          <InputTextCustom textValue={unidadPesoModel} placeholder={'Ejm: Kg'}
            onChange={setUnidadPesoModel} valueError={errores.unidadPeso} readOnly={estadoModel !='Activo'} />
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
        <FilterOption htmlFor={'CarguilloPaleroModel'} name={'Palero'}>
          <ComboBoxCustom initialOptions={carguilloPaleroList} selectedOption={seleccionCarguilloPalero}
            onSelectionChange={handleSelectionChangePalero} disabled={false} allDisabled={estadoModel !='Activo'}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 `}
            colorOptions={"text-black"}
          />
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
