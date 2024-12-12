import { useEffect, useState } from 'react'
import { 
  ComboBoxCustom, convertirFechaToYMD, FilterOption, Footer, FooterButton, 
  FormatteDecimal, formatterDataCombo, obtenerFechaLocal, SectionModel 
} from '../common'
import { ticketSave, ticketUpdate } from '../../services/ticket'
import { getCarguilloPlacasList, searchCarguilloList } from '../../services/carguillo'

export const TicketModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState('')
  const [ingenioModel, setIngenioModel] = useState('')
  const [viajeModel, setViajeModel] = useState('')
  const [carguilloId, setCarguilloId] = useState('')
  const [choferModel, setChoferModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [camionModel, setCamionModel] = useState('')
  const [camionPesoModel, setCamionPesoModel] = useState('')
  const [vehiculoModel, setVehiculoModel] = useState('')
  const [vehiculoPesoModel, setVehiculoPesoModel] = useState('')
  const [unidadPesoModel, setUnidadPesoModel] = useState('')
  const [pesoBrutoModel, setPesoBrutoModel] = useState('')
  const [estadoModel, setEstadoModel] = useState('Activo')

  const [carguilloList, setCarguilloList] = useState([])
  const [placaCamionList, setPlacaCamionList] = useState([])
  const [placaVehiculoList, setPlacaVehiculoList] = useState([])
  const [seleccionPlacaCamion, setseleccionPlacaCamion] = useState(
    data.carguilloDetalleCamionId ? 
    {id:data.carguilloDetalleCamionId, nombre: data.ticketCamion} : null)
  const [seleccionPlacaVehiculo, setseleccionPlacaVehiculo] = useState(
    data.carguilloDetalleVehiculoId ? 
    {id:data.carguilloDetalleVehiculoId, nombre: data.ticketVehiculo} : null)
  const seleccionCarguillo = data.carguilloId ? {id:data.carguilloId, nombre: data.ticketTransportista} : null

  const [errores, setErrores] = useState({})
  useEffect(() =>{
    listCarguillos()
  }, [])
  useEffect(() => {
    if (data) {
      setIdModel(data.ticketId || 0)
      setIngenioModel(data.ticketIngenio || '')
      setViajeModel(data.ticketViaje || '')
      setCarguilloId(data.carguilloId || '')
      setChoferModel(data.ticketChofer || "")
      setFechaModel(data.ticketFecha? convertirFechaToYMD(data.ticketFecha) : obtenerFechaLocal({date: new Date()}).split('T')[0])
      setCamionModel(data.carguilloDetalleCamionId || "")
      setCamionPesoModel(data.ticketCamionPeso || "")
      setVehiculoModel(data.carguilloDetalleVehiculoId || "")
      setVehiculoPesoModel(data.ticketVehiculoPeso || "")
      setUnidadPesoModel(data.ticketUnidadPeso || '')
      setPesoBrutoModel(data.ticketPesoBruto || '')
      setEstadoModel(data.ticketEstadoDescripcion || 'Activo')      
    }
  }, [data])

  useEffect(()=> {
    const camionPeso = parseFloat(camionPesoModel) && parseFloat(camionPesoModel) > 0 ? parseFloat(camionPesoModel) :0
    const vehiculoPeso = parseFloat(vehiculoPesoModel) && parseFloat(vehiculoPesoModel) > 0 ? parseFloat(vehiculoPesoModel) :0
    const calculate = camionPeso + vehiculoPeso
    setPesoBrutoModel( calculate > 0 ? FormatteDecimal(calculate,3) : '' )
  }, [camionPesoModel, vehiculoPesoModel])

  useEffect(()=>{
    if(carguilloId>0){
      listCarguilloPlacas(carguilloId, 3)
      listCarguilloPlacas(carguilloId, 4)
    }
  },[carguilloId])
  const listCarguillos = async() =>{
    const carguillos = await searchCarguilloList({
      tipoCarguilloId:2, titular:'', estado:true})
    const formatter = carguillos.map(carguillo => 
      (formatterDataCombo(carguillo.carguilloId,carguillo.carguilloTitular)))
    setCarguilloList(formatter)
  }
  const listCarguilloPlacas =async(carguilloId,carguilloTipoId)=>{
    const placaCamiones = await getCarguilloPlacasList(carguilloId, carguilloTipoId)
    const formatter = await placaCamiones.map(placa =>
      (formatterDataCombo(placa.carguilloDetalleId,placa.carguilloDetallePlaca)))
    if(carguilloTipoId == 3) setPlacaVehiculoList(formatter)
    else setPlacaCamionList(formatter)
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
    if (!choferModel) nuevosErrores.chofer = "El campo CHOFER es obligatorio."
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
      if(idModel > 0) {
        const ticket = await ticketUpdate({
          ticketId: idModel,
          ticketIngenio:ingenioModel,
          ticketFecha: fechaModel, 
          ticketViaje: viajeModel,
          carguilloId:carguilloId, 
          ticketChofer: choferModel,
          carguilloDetalleCamionId: camionModel,
          ticketCamionPeso: camionPesoModel,
          carguilloDetalleVehiculoId: vehiculoModel,
          ticketVehiculoPeso: vehiculoPesoModel,
          ticketUnidadPeso:unidadPesoModel,
          ticketPesoBruto: pesoBrutoModel,
          userModifiedAt: obtenerFechaLocal({date: new Date()}),
          userModifiedName: "ADMIN" 
        })
        return retorna(ticket)
      }
      const ticket = await ticketSave({
        ticketIngenio:ingenioModel,
        ticketFecha: fechaModel, 
        ticketViaje: viajeModel,
        carguilloId:carguilloId, 
        ticketChofer: choferModel,
        carguilloDetalleCamionId: camionModel,
        ticketCamionPeso: camionPesoModel,
        carguilloDetalleVehiculoId: vehiculoModel,
        ticketVehiculoPeso: vehiculoPesoModel,
        ticketUnidadPeso:unidadPesoModel,
        ticketPesoBruto: pesoBrutoModel,
        userCreatedAt: obtenerFechaLocal({date: new Date()}),
        userCreatedName: "ADMIN" 
      })
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
    <SectionModel title={(data.id > 0 ? 'Editar' : 'Registrar')+ ' Ticket'} >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3'>
        <FilterOption htmlFor={'IdModel'} name={'ID'}>
          <>
            <input type='text' className={`bg-transparent  focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                  errores.id ? "border-red-500" : "" 
              } `}
              name='query' placeholder='Automático'
              value={idModel}
              onChange={(e) => setIdModel(e.target.value)}
              readOnly={data.id > 0}
            />
            {errores.id && <p className="text-red-500 text-sm">{errores.id}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'IngenioModel'} name={'Ingenio'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.ingenio ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ejm: Casa Grande'
              value={ingenioModel}
              onChange={(e) => setIngenioModel(e.target.value)}
            />
            {errores.ingenio && <p className="text-red-500 text-sm">{errores.ingenio}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'ViajeModel'} name={'Viaje'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.viaje ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ejm: 508689'
              value={viajeModel}
              onChange={(e) => setViajeModel(e.target.value)}
            />
            {errores.viaje && <p className="text-red-500 text-sm">{errores.viaje}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'CarguilloModel'} name={'Transportista'}>
          <ComboBoxCustom initialOptions={carguilloList} selectedOption={seleccionCarguillo}
            onSelectionChange={handleSelectionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.tipoId ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.viaje && <p className="text-red-500 text-sm">{errores.viaje}</p>}
        </FilterOption>
        <FilterOption htmlFor={'ChoferModel'} name={'Chofer'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.chofer ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ingrese el nombre'
              value={choferModel}
              onChange={(e) => setChoferModel(e.target.value)}
            />
            {errores.chofer && <p className="text-red-500 text-sm">{errores.chofer}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
          <>
            <input type='date' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.fecha ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ejm: 20/11/2024'
              value={fechaModel}
              onChange={(e) => setFechaModel(e.target.value)}
            />
            {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'CamionModel'} name={'Camión'}>
          <ComboBoxCustom initialOptions={placaCamionList} selectedOption={seleccionPlacaCamion}
            onSelectionChange={handleSelectionCamionChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.camion ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.camion && <p className="text-red-500 text-sm">{errores.camion}</p>}
        </FilterOption>
        <FilterOption htmlFor={'CamionPesoModel'} name={'Camión Peso'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.camionPeso ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ejm: 19.590'
              value={camionPesoModel}
              onChange={(e) => setCamionPesoModel(e.target.value)}
            />
            {errores.camionPeso && <p className="text-red-500 text-sm">{errores.camionPeso}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'VehiculoModel'} name={'Vehículo'}>
          <ComboBoxCustom initialOptions={placaVehiculoList} selectedOption={seleccionPlacaVehiculo}
            onSelectionChange={handleSelectionVehiculoChange}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.vehiculo ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.vehiculo && <p className="text-red-500 text-sm">{errores.vehiculo}</p>}
        </FilterOption>
        <FilterOption htmlFor={'VehiculoPesoModel'} name={'Vehículo Peso'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.vehiculoPeso ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ejm: 31.860'
              value={vehiculoPesoModel}
              onChange={(e) => setVehiculoPesoModel(e.target.value)}
            />
            {errores.vehiculoPeso && <p className="text-red-500 text-sm">{errores.vehiculoPeso}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'UnidadPesoModel'} name={'Unidad Peso'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.unidadPeso ? "border-red-500" : ""
              }`}
              name='query' placeholder='Ejm: Kg'
              value={unidadPesoModel}
              onChange={(e) => setUnidadPesoModel(e.target.value)}
            />
            {errores.unidadPeso && <p className="text-red-500 text-sm">{errores.unidadPeso}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'PesoBrutoModel'} name={'Peso Bruto'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.pesoBruto ? "border-red-500" : ""
              }`}
              name='query' placeholder='Automático'
              value={pesoBrutoModel}
              onChange={(e) => setPesoBrutoModel(e.target.value)}
              readOnly
            />
            {errores.pesoBruto && <p className="text-red-500 text-sm">{errores.pesoBruto}</p>}
          </>
        </FilterOption>
        <FilterOption htmlFor={'EstadoModel'} name={'Estado'}>
          <>
            <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                errores.estado ? "border-red-500" : ""
              }`}
              name='query' placeholder='Automático'
              value={estadoModel}
              onChange={(e) => setEstadoModel(e.target.value)}
              readOnly
            />
            {errores.estado && <p className="text-red-500 text-sm">{errores.estado}</p>}
          </>
        </FilterOption>
      </div>
    </SectionModel>
    <Footer>
      <FooterButton accion={handleGuardar} name={"Guardar"}/>
      <FooterButton accion={handleCancelar} name={"Cancelar"}/>
    </Footer>
    </>
  )
}
