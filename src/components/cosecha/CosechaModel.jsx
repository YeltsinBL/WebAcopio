import { useEffect, useState } from 'react'
import { searchAsignaTierra } from '../../services/asignartierra'
import { cosechaSave, cosechaUpdate, searchCosechaTipo } from '../../services/cosecha'
import { ComboBoxCustom } from '../common'
import { formatterDataCombo, obtenerFechaLocal } from '../../utils'

export const CosechaModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState('')
  const [ucModel, setUCModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [utModel, setUTModel] = useState('')
  const [fechaModel, setFechaModel] = useState('')
  const [supervisorModel, setSupervisorModel] = useState(null)
  const [hasModel, setHasModel] = useState(null)
  const [sacModel, setSacModel] = useState(null)
  const [redModel, setRedModel] = useState(null)
  const [humedadModel, setHumedadModel] = useState(null)
  const [cosechaModel, setCosechaModel] = useState('')

  const [tierras, setTierras] = useState([])
  const [cosechaTipo, setCosechaTipo] = useState([])
  const [listAsigna, setListAsigna] = useState([])
  
  const seleccionTierra = data.tierraId ? {id: data.tierraId, uc: data.uc } : null
  const seleccionProveedor = data.proveedorId ? {proveedorId: data.proveedorId, ut: data.ut } : null
  const seleccionCosechaTipo = data.tipoCosecha ? {id: data.tipoCosecha, uc: data.cosecha } : null


  const [errores, setErrores] = useState({})

  useEffect(() => {
    fetchListAsigna()
    fetchOptionsTierras()
    fetchOptionCosechaTipo()
    if (data) {
      setIdModel(data.id || 0);
      setUCModel(data.tierraId || 0);
      setCampoModel(data.campo || '');
      setUTModel(seleccionProveedor);
      setFechaModel(data.fecha || obtenerFechaLocal({date: new Date()}).split('T')[0])
      setSupervisorModel(data.supervisor || null);
      setHasModel(data.has || null);
      setSacModel(data.sac || null);
      setRedModel(data.red || null);
      setHumedadModel(data.humedad || null);
      setCosechaModel(data.tipoCosecha || 0);
    }
  }, []);

  const validarCampos = () => {
    const nuevosErrores = {}
    //if (!idModel) nuevosErrores.id = "El campo ID es obligatorio."
    if (!utModel) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!ucModel) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!fechaModel) nuevosErrores.fecha = "El campo Fecha es obligatorio."
    //if (!supervisorModel) nuevosErrores.supervisor = "El campo Supervisor es obligatorio."
    // if (!hasModel) nuevosErrores.has = "El campo HAS es obligatorio."
    // if (!sacModel) nuevosErrores.sac = "El campo SAC es obligatorio."
    // if (!redModel) nuevosErrores.red = "El campo RED es obligatorio."
    // if (!humedadModel) nuevosErrores.humedad = "El campo Humedad es obligatorio."
    if (!cosechaModel) nuevosErrores.cosecha = "El campo Tipo Cosecha es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const fetchListAsigna= async() => {
    try {
      const responseTierra = await searchAsignaTierra({})
      setListAsigna(responseTierra)
    } catch (error) {
      console.error('Error al cargar fetchOptionsTierras:', error);
    }
  }
  const fetchOptionsTierras = async () => {
    try {
      const responseTierra = await searchAsignaTierra({})
      const formatter= responseTierra?.map(tipo =>(
        formatterDataCombo(tipo.tierraId, tipo.uc)))
      setTierras(formatter)
    } catch (error) {
      console.error('Error al cargar fetchOptionsTierras:', error);
    }
  }
  const fetchOptionCosechaTipo = async() => {
    try {
      const responseTipo = await searchCosechaTipo()
      const formatter= responseTipo?.map(tipo =>(
        formatterDataCombo(tipo.cosechaTipoId, tipo.descripcion)))
      setCosechaTipo(formatter)
    } catch (error) {
      console.error('Error al cargar fetchOptionCosechaTipo:', error);
    }
  }
  const handleSelectionChangeTierra = (option) => {
    setUCModel(option)
    const selected = listAsigna.find(tierra => tierra.tierraId === option)
    setCampoModel(selected.campo)
    setUTModel({proveedorId:selected.proveedorId, ut:selected.ut})
  };
  const handleSelectionChangeCosechaTipo = (option) => {
    setCosechaModel(option)
  };
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      let save = {
        cosechaHas: hasModel || null,
        cosechaSac: sacModel || null,
        cosechaRed: redModel || null,
        cosechaHumedad: humedadModel || null,
        cosechaCosechaTipoId: cosechaModel,
      }
      if(idModel > 0){
        save.cosechaId= idModel
        save.userModifiedName= "ADMIN"
        save.userModifiedAt= obtenerFechaLocal({date: new Date()}).split('T')[0]
        const resp = await cosechaUpdate(save)
       return retorna(resp)
      }
      save.cosechaFecha= fechaModel
      save.cosechaSupervisor= supervisorModel || null
      save.cosechaTierraId= ucModel
      save.cosechaProveedorId= utModel.proveedorId
      save.userCreatedName= "ADMIN"
      save.userCreatedAt= obtenerFechaLocal({date: new Date()}).split('T')[0]
      const resp = await cosechaSave(save)
      return retorna(resp)
    }
  }
  const retorna = (resp) => {
    return onShowModel({
      id:resp.id, ut:resp.ut, uc:resp.uc, fecha:fechaModel, supervisor:supervisorModel, 
      has: hasModel, sac:sacModel, red:redModel, humedad:humedadModel, cosecha:resp.cosecha,
      valle:resp.valle, sector: resp.sector, campo: resp.campo
    })
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({id:0})
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
                <div className='space-y-2 hidden'>
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
                  <label htmlFor="AsignaTierraUTModal" className="text-white font-semibold">UC/Tierra</label>
                  <ComboBoxCustom initialOptions={tierras} selectedOption={seleccionTierra} 
                    onSelectionChange={handleSelectionChangeTierra}
                    className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                      errores.uc ? "border-red-500" : ""
                    }`}
                    colorOptions={"text-black"}
                  />
                  {errores.uc && <p className="text-red-500 text-sm">{errores.uc}</p>}
                </div>
                <div className='space-y-2'>
                    <label htmlFor="Campo" className="text-white">Campo</label>
                    <input type='text' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.campo ? "border-red-500" : ""
                    }`}
                        name='query' placeholder='Automático el campo'
                        value={campoModel || ''}
                        readOnly
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaUT" className="text-white">UT</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Automático el código UT'
                        value={utModel?.ut || ''}
                        readOnly
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaFecha" className="text-white">Fecha </label>
                    <input type='date' className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.fecha ? "border-red-500" : ""
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
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el nombre (opcional)'
                        value={supervisorModel}
                        onChange={(e) => setSupervisorModel(e.target.value)}
                        readOnly={data.id > 0}
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaHAS" className="text-white">HAS</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el valor (opcional)'
                        value={hasModel}
                        onChange={(e) => setHasModel(e.target.value)}
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaSac" className="text-white">SAC</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el valor (opcional)'
                        value={sacModel}
                        onChange={(e) => setSacModel(e.target.value)}
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaRed" className="text-white">Red</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el valor (opcional)'
                        value={redModel}
                        onChange={(e) => setRedModel(e.target.value)}
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaHumedad" className="text-white">Humedad</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el valor (opcional)'
                        value={humedadModel}
                        onChange={(e) => setHumedadModel(e.target.value)}
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="CosechaTipo" className="text-white">Tipo Cosecha</label>
                    <ComboBoxCustom initialOptions={cosechaTipo} selectedOption={seleccionCosechaTipo} 
                      onSelectionChange={handleSelectionChangeCosechaTipo}
                      className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                        errores.uc ? "border-red-500" : ""
                      }`}
                      colorOptions={"text-black"}
                    />
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
