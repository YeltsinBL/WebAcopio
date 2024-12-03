import React, { useEffect, useState } from 'react'
import Footer from '../common/Footer'
import FooterButton from '../common/FooterButton'
import { localISOString } from '../mocks/DataList'
import { convertirFechaToYMD, FormatteDecimal } from '../common/FormatteData'

const TicketModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState('')
  const [ingenioModel, setIngenioModel] = useState('')
  const [viajeModel, setViajeModel] = useState('')
  const [transportistaModel, setTransportistaModel] = useState('')
  const [choferModel, setChoferModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [camionModel, setCamionModel] = useState('')
  const [camionPesoModel, setCamionPesoModel] = useState('')
  const [vehiculoModel, setVehiculoModel] = useState('')
  const [vehiculoPesoModel, setVehiculoPesoModel] = useState('')
  const [unidadPesoModel, setUnidadPesoModel] = useState('')
  const [pesoBrutoModel, setPesoBrutoModel] = useState('')
  const [estadoModel, setEstadoModel] = useState('Activo')

  const [errores, setErrores] = useState({})
  useEffect(() => {
      if (data) {
        setIdModel(data.id || 0)
        setIngenioModel(data.ingenio || '')
        setViajeModel(data.viaje || '')
        setTransportistaModel(data.transportista || '')
        setChoferModel(data.chofer || "")
        setFechaModel(convertirFechaToYMD(data.fecha) || localISOString.split('T')[0])
        setCamionModel(data.camion || "")
        setCamionPesoModel(data.camionPeso || "")
        setVehiculoModel(data.vehiculo || "")
        setVehiculoPesoModel(data.vehiculoPeso || "")
        setUnidadPesoModel(data.unidadPeso || '')
        setPesoBrutoModel(data.pesoBruto || '')
        setEstadoModel(data.estado || 'Activo')
      }
  }, []);

  useEffect(()=> {
    const camionPeso = parseFloat(camionPesoModel) && parseFloat(camionPesoModel) > 0 ? parseFloat(camionPesoModel) :0
    const vehiculoPeso = parseFloat(vehiculoPesoModel) && parseFloat(vehiculoPesoModel) > 0 ? parseFloat(vehiculoPesoModel) :0
    const calculate = camionPeso + vehiculoPeso
    setPesoBrutoModel( calculate > 0 ? FormatteDecimal(calculate,3) : '' )
  }, [camionPesoModel, vehiculoPesoModel])

  const validarCampos = () => {
    const nuevosErrores = {}
    //if (!idModel) nuevosErrores.id = "El campo ID es obligatorio."
    if (!ingenioModel) nuevosErrores.ingenio = "El campo INGENIO es obligatorio."
    if (!viajeModel) nuevosErrores.viaje = "El campo VIAJE es obligatorio."
    if (!transportistaModel) nuevosErrores.transportista = "El campo TRANSPORTISTA es obligatorio."
    if (!choferModel) nuevosErrores.chofer = "El campo CHOFER es obligatorio."
    if (!fechaModel) nuevosErrores.fecha = "El campo FECHA es obligatorio."
    if (!camionModel) nuevosErrores.camion = "El campo CAMIÓN es obligatorio."
    if (!camionPesoModel) nuevosErrores.camionPeso = "El campo CAMIÓN PESO es obligatorio."
    if (!vehiculoModel) nuevosErrores.vehiculo = "El campo VEHÍCULO es obligatorio."
    if (!vehiculoPesoModel) nuevosErrores.vehiculoPeso = "El campo VEHÍCULO PESO es obligatorio."
    if (!unidadPesoModel) nuevosErrores.unidadPeso = "El campo UNIDAD PESO es obligatorio."
    // if (!pesoBrutoModel) nuevosErrores.pesoBruto = "El campo PE es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      console.log({
        id: idModel,  
        ingenio:ingenioModel,
        fecha: fechaModel, 
        viaje: viajeModel,
        transportista:transportistaModel, 
        chofer: choferModel,
        camion: camionModel,
        caminoPeso: camionPesoModel,
        vehiculo: vehiculoModel,
        vehiculoPeso: vehiculoPesoModel,
        unidadPeso:unidadPesoModel,
        pesoBruto: pesoBrutoModel,
        estado: estadoModel   
      })
      onShowModel({
        id: idModel,  
        ingenio:ingenioModel,
        fecha: fechaModel, 
        viaje: viajeModel,
        transportista:transportistaModel, 
        chofer: choferModel,
        camion: camionModel,
        caminoPeso: camionPesoModel,
        vehiculo: vehiculoModel,
        vehiculoPeso: vehiculoPesoModel,
        unidadPeso:unidadPesoModel,
        pesoBruto: pesoBrutoModel,
        estado: estadoModel   
      })
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({id:0})
  }
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
		<div className="flex items-start justify-between py-5 rounded-t">
          <h3 className="text-3xl font-semibold text-white">
            {data.id > 0 ? 'Editar' : 'Registrar'} Ticket
          </h3>
        </div>
        <form action="" >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                <div className='space-y-2 '>
                    <label htmlFor="IdModel" className="text-white ">ID</label>
                    <input type='text' className={`bg-transparent  focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.id ? "border-red-500" : "" 
                    } `}
                        name='query' placeholder='Automático'
                        value={idModel}
                        onChange={(e) => setIdModel(e.target.value)}
                        readOnly={data.id > 0}
                    />
                  {errores.id && <p className="text-red-500 text-sm">{errores.id}</p>}
                </div>           
                <div className='space-y-2'>
                  <label htmlFor="IngenioModel" className="text-white font-semibold">Ingenio</label>
                  <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.ingenio ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: Casa Grande'
                        value={ingenioModel}
                        onChange={(e) => setIngenioModel(e.target.value)}
                    />
                  {errores.ingenio && <p className="text-red-500 text-sm">{errores.ingenio}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="ViajeModel" className="text-white">Viaje</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.viaje ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: 508689'
                        value={viajeModel}
                        onChange={(e) => setViajeModel(e.target.value)}
                    />
                    {errores.viaje && <p className="text-red-500 text-sm">{errores.viaje}</p>}
                </div>
                 <div className='space-y-2'>
                    <label htmlFor="TransportistaModel" className="text-white">Transportista</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.transportista ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: Representante SHEFA'
                        value={transportistaModel}
                        onChange={(e) => setTransportistaModel(e.target.value)}
                    />
                    {errores.transportista && <p className="text-red-500 text-sm">{errores.transportista}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="ChoferModel" className="text-white">Chofer</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.chofer ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el nombre'
                        value={choferModel}
                        onChange={(e) => setChoferModel(e.target.value)}
                        readOnly={data.id > 0}
                    />
                  {errores.chofer && <p className="text-red-500 text-sm">{errores.chofer}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="FechaModel" className="text-white">Fecha </label>
                    <input type='date' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.fecha ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fechaModel}
                        onChange={(e) => setFechaModel(e.target.value)}
                    />
                  {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CamionModel" className="text-white">Camión</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.camion ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: PE-Z3S930'
                        value={camionModel}
                        onChange={(e) => setCamionModel(e.target.value)}
                    />
                  {errores.camion && <p className="text-red-500 text-sm">{errores.camion}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CamionPesoModel" className="text-white">Camión Peso</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.camionPeso ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: 19.590'
                        value={camionPesoModel}
                        onChange={(e) => setCamionPesoModel(e.target.value)}
                    />
                  {errores.camionPeso && <p className="text-red-500 text-sm">{errores.camionPeso}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="VehiculoModel" className="text-white">Vehículo</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.vehiculo ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: PE-Z3S930'
                        value={vehiculoModel}
                        onChange={(e) => setVehiculoModel(e.target.value)}
                    />
                  {errores.vehiculo && <p className="text-red-500 text-sm">{errores.vehiculo}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="VehiculoPesoModel" className="text-white">Vehículo Peso</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.vehiculoPeso ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: 31.860'
                        value={vehiculoPesoModel}
                        onChange={(e) => setVehiculoPesoModel(e.target.value)}
                    />
                  {errores.vehiculoPeso && <p className="text-red-500 text-sm">{errores.vehiculoPeso}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="UnidadPesoModel" className="text-white">Unidad Peso</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.unidadPeso ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: Kg'
                        value={unidadPesoModel}
                        onChange={(e) => setUnidadPesoModel(e.target.value)}
                    />
                  {errores.unidadPeso && <p className="text-red-500 text-sm">{errores.unidadPeso}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="PesoBrutoModel" className="text-white">Peso Bruto</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.pesoBruto ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Automático'
                        value={pesoBrutoModel}
                        onChange={(e) => setPesoBrutoModel(e.target.value)}
                        readOnly
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="EstadoModel" className="text-white">Estado</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.estado ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Automático'
                        value={estadoModel}
                        onChange={(e) => setEstadoModel(e.target.value)}
                        readOnly
                    />
                  {errores.estado && <p className="text-red-500 text-sm">{errores.estado}</p>}
                </div> 
            </div>
        </form>
        <Footer>
            <FooterButton accion={handleGuardar} name={"Guardar"}/>
            <FooterButton accion={handleCancelar} name={"Cancelar"}/>
        </Footer>
	</div>
  )
}

export default TicketModel