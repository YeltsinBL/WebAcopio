import { useEffect, useState } from 'react'
import { convertirFechaISOParaInput, TIERRA_DATA } from '../mocks/DataList'

const CosechaModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState('')
  const [ucModel, setUCModel] = useState('')
  const [utModel, setUTModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [supervisorModel, setSupervisorModel] = useState('')
  const [hasModel, setHasModel] = useState('')
  const [sacModel, setSacModel] = useState('')
  const [redModel, setRedModel] = useState('')
  const [humedadModel, setHumedadModel] = useState('')
  const [cosechaModel, setCosechaModel] = useState('')

  const [errores, setErrores] = useState({})

  useEffect(() => {
    if (data) {
      setIdModel(data.id || 0);
      setUCModel(data.uc || "");
      setUTModel(data.ut || "");
      setFechaModel(data.fecha ? convertirFechaISOParaInput(data.fecha) : ""); // Convertir la fecha
      setSupervisorModel(data.supervisor || "");
      setHasModel(data.has || "");
      setSacModel(data.sac || "");
      setRedModel(data.red || "");
      setHumedadModel(data.humedad || "");
      setCosechaModel(data.cosecha || "");
    }
  }, [data]);

  const validarCampos = () => {
    const nuevosErrores = {}
    if (!idModel) nuevosErrores.id = "El campo ID es obligatorio."
    if (!utModel) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!ucModel) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!fechaModel) nuevosErrores.fecha = "El campo Fecha es obligatorio."
    if (!supervisorModel) nuevosErrores.supervisor = "El campo Supervisor es obligatorio."
    if (!hasModel) nuevosErrores.has = "El campo HAS es obligatorio."
    if (!sacModel) nuevosErrores.sac = "El campo SAC es obligatorio."
    if (!redModel) nuevosErrores.red = "El campo RED es obligatorio."
    if (!humedadModel) nuevosErrores.humedad = "El campo Humedad es obligatorio."
    if (!cosechaModel) nuevosErrores.cosecha = "El campo Tipo Cosecha es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = (e) => {
    e.preventDefault()
    if (validarCampos()) {
      sendDataDismissModel()
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    sendDataDismissModel(true)
  }
  const sendDataDismissModel = (cancel=false) => {
    onShowModel({id:cancel ? 0: idModel, ut:utModel, uc:ucModel, fecha:fechaModel, supervisor:supervisorModel, has: hasModel,
        sac:sacModel, red:redModel, humedad:humedadModel, cosecha:cosechaModel
     })
  }

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
		<div className="flex items-start justify-between py-5 rounded-t">
          <h3 className="text-3xl font-semibold text-white">
            {data.id > 0 ? 'Editar' : 'Registrar'} Cosecha
          </h3>
        </div>
        <form action="" >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
                <div className='space-y-2 '>
                    <label htmlFor="CosechaId" className="text-white ">ID</label>
                    <input type='text' className={`bg-transparent  focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.id ? "border-red-500" : "" 
                    } `}
                        name='query' placeholder='Ingrese el Id'
                        value={idModel}
                        onChange={(e) => setIdModel(e.target.value)}
                        readOnly={data.id > 0}
                    />
                  {errores.id && <p className="text-red-500 text-sm">{errores.id}</p>}
                </div>
                <div className='space-y-2'>
                  <label htmlFor="CosechaUC" className="text-white">UC</label>
                  <select
                        id="tierra"
                        className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                            errores.uc ? "border-red-500" : ""
                          }`}
                        value={ucModel}
                        onChange={(e) => setUCModel(e.target.value)}
                        disabled={data.id > 0}
                        >
                        <option value="">Selecciona la Tierra</option>
                        {TIERRA_DATA.map((tierra) => (
                            <option key={tierra.id} value={tierra.uc}>
                            {tierra.uc}
                            </option>
                        ))}
                        </select>
                  {errores.uc && <p className="text-red-500 text-sm">{errores.uc}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaUT" className="text-white">UT</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el código UT'
                        value={utModel}
                        onChange={(e) => setUTModel(e.target.value)}
                        readOnly={data.id > 0}
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaFecha" className="text-white">Fecha </label>
                    <input type='date' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fechaModel}
                        onChange={(e) => setFechaModel(e.target.value)}
                        readOnly={data.id > 0}
                    />
                  {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaSupervisor" className="text-white">Supervisor</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el nombre'
                        value={supervisorModel}
                        onChange={(e) => setSupervisorModel(e.target.value)}
                        readOnly={data.id > 0}
                    />
                  {errores.supervisor && <p className="text-red-500 text-sm">{errores.supervisor}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaHAS" className="text-white">HAS</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el valor'
                        value={hasModel}
                        onChange={(e) => setHasModel(e.target.value)}
                    />
                  {errores.has && <p className="text-red-500 text-sm">{errores.has}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaSac" className="text-white">SAC</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el valor'
                        value={sacModel}
                        onChange={(e) => setSacModel(e.target.value)}
                    />
                  {errores.sac && <p className="text-red-500 text-sm">{errores.sac}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaRed" className="text-white">Red</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el valor'
                        value={redModel}
                        onChange={(e) => setRedModel(e.target.value)}
                    />
                  {errores.red && <p className="text-red-500 text-sm">{errores.red}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaHumedad" className="text-white">Humedad</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Ingrese el valor'
                        value={humedadModel}
                        onChange={(e) => setHumedadModel(e.target.value)}
                    />
                  {errores.humedad && <p className="text-red-500 text-sm">{errores.humedad}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaTipo" className="text-white">Tipo Cosecha</label>
                    <select id='cosechaModel'
                        value={cosechaModel}
                        onChange={(e) => setCosechaModel(e.target.value)}
                        className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                            errores.uc ? "border-red-500" : ""
                        } `}>
                        <option value="">Selecciona la Tierra</option>
                        <option key={1} value='Cosecha'>Cosecha</option>
                        <option key={2} value='No Cosecha'>No Cosecha</option>
                        <option key={3} value='Rechazado'>Rechazado</option>
                        </select>
                        {errores.cosecha && <p className="text-red-500 text-sm">{errores.cosecha}</p>}
                </div>
            </div>
        </form>
        <div className="flex items-center justify-center pt-6 gap-3">
            <button
              className="bg-[#313395] text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={ handleGuardar}
            >
              Guardar
            </button>
            <button
              className="bg-gray-500 text-white active:bg-gray-300 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
        </div>
	</div>
  )
}

export default CosechaModel