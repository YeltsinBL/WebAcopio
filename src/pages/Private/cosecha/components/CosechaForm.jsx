import { useEffect, useState } from 'react'
import { ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, InputTextCustom, MessageValidationInput, SectionModel } from '../../../../components/common'
import { searchAsignaTierra } from '../../../../services/asignartierra'
import { cosechaSave, cosechaUpdate, searchCosechaTipo } from '../../../../services/cosecha'
import { formatterDataCombo, obtenerFechaLocal } from '../../../../utils'

export const CosechaModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState(0)
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
    <SectionModel title={(idModel > 0 ? 'Editar' : 'Registrar') + ' Cosecha'} >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
        <FilterOption htmlFor={'AsignaTierraUTModal'} name={'UC/Tierra'}>
          <ComboBoxCustom initialOptions={tierras} selectedOption={seleccionTierra} 
            onSelectionChange={handleSelectionChangeTierra}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.uc ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.uc && <MessageValidationInput mensaje={errores.uc}/>}
        </FilterOption>
        <FilterOption htmlFor={'CampoForm'} name={'Campo'}>
          <InputTextCustom placeholder='Automático ' textValue={campoModel} readOnly />
        </FilterOption>
        <FilterOption htmlFor={'CosechaUT'} name={'UT'}>
          <InputTextCustom placeholder='Automático ' textValue={utModel?.ut} readOnly />            
        </FilterOption>
        <FilterOption htmlFor={'CosechaFecha'} name={'Fecha'}>
          <InputDateCustom fechaValue={fechaModel}
            valueError={errores.fecha ? true: false}
            setFechaValue={setFechaModel} readOnly={idModel > 0} />
          {errores.fecha && <MessageValidationInput mensaje={errores.fecha}/>}
        </FilterOption>
        <FilterOption htmlFor={'CosechaSupervisor'} name={'Supervisor'}>
          <InputTextCustom 
            onChange={setSupervisorModel}
            placeholder='Ingrese el nombre (opcional)'
            textValue={supervisorModel} 
            readOnly={data.id > 0}
          />
        </FilterOption>
        <FilterOption htmlFor={'CosechaHAS'} name={'HAS'}>
          <InputTextCustom
            onChange={setHasModel}
            placeholder='Ingrese el valor (opcional)'
            textValue={hasModel}
          />
        </FilterOption>
        <FilterOption htmlFor={'CosechaSac'} name={'SAC'}>
          <InputTextCustom 
            onChange={setSacModel}
            placeholder='Ingrese el valor (opcional)'
            textValue={sacModel}
          />
        </FilterOption>
        <FilterOption htmlFor={'CosechaRed'} name={'Red'}>
          <InputTextCustom 
            onChange={setRedModel}
            placeholder='Ingrese el valor (opcional)'
            textValue={redModel}
          />
        </FilterOption>
        <FilterOption htmlFor={'CosechaHumedad'} name={'Humedad'}>
          <InputTextCustom
            onChange={setHumedadModel}
            placeholder='Ingrese el valor (opcional)'
            textValue={humedadModel}
          />
        </FilterOption>
        <FilterOption htmlFor={'CosechaTipo'} name={'Tipo Cosecha'}>
          <ComboBoxCustom initialOptions={cosechaTipo} selectedOption={seleccionCosechaTipo} 
            onSelectionChange={handleSelectionChangeCosechaTipo}
            className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
              errores.uc ? "border-red-500" : ""
            }`}
            colorOptions={"text-black"}
          />
          {errores.cosecha && <MessageValidationInput mensaje={errores.cosecha}/>}
        </FilterOption>
      </div>
    <Footer>
      <FooterButton name={'Guardar'} accion={handleGuardar}/>
      <FooterButton name={'Cancelar'} accion={handleCancelar}/>
    </Footer>
	</SectionModel>
  )
}
