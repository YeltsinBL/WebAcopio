import { useEffect, useState } from 'react'
import { ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, InputTextCustom, MessageValidationInput, SectionModel } from '../../../../components/common'
import { searchAsignaTierra } from '../../../../services/asignartierra'
import { cosechaSave, searchCosechaTipo } from '../../../../services/cosecha'
import { formatterDataCombo, obtenerFechaLocal } from '../../../../utils'

export const CosechaModel = ({ onShowModel, data }) => {
  const [idModel, setIdModel] = useState(0)
  const [ucModel, setUCModel] = useState('')
  const [campoModel, setCampoModel] = useState('')
  const [utModel, setUTModel] = useState({proveedorId: 0, ut: '' })
  const [fechaModel, setFechaModel] = useState(obtenerFechaLocal({date: new Date()}).split('T')[0])
  const [supervisorModel, setSupervisorModel] = useState('')
  const [hasModel, setHasModel] = useState('')
  const [sacModel, setSacModel] = useState('')
  const [redModel, setRedModel] = useState('')
  const [humedadModel, setHumedadModel] = useState('')
  const [cosechaModel, setCosechaModel] = useState('')

  const [tierras, setTierras] = useState([])
  const [cosechaTipo, setCosechaTipo] = useState([])
  const [listAsigna, setListAsigna] = useState([])
  
  const seleccionTierra = data?.cosechaTierraId ? {id: data?.cosechaTierraId, uc: data?.cosechaTierraUC } : null
  const seleccionProveedor = {proveedorId: data?.cosechaProveedorId ?? 0, ut: data?.cosechaProveedorUT ?? '' }
  const seleccionCosechaTipo = data?.cosechaCosechaId ? {id: data?.cosechaCosechaId, uc: data?.cosechaCosechaTipo } : null


  const [errores, setErrores] = useState({})

  useEffect(() => {
    fetchListAsigna()
    fetchOptionCosechaTipo()
    if (data) {
      setIdModel(data.cosechaId || 0);
      setUCModel(data.cosechaTierraId || 0);
      setCampoModel(data.cosechaTierraCampo || '');
      setUTModel(seleccionProveedor);
      setFechaModel(data.cosechaFecha || obtenerFechaLocal({date: new Date()}).split('T')[0])
      setSupervisorModel(data.cosechaSupervisor || '');
      setHasModel(data.cosechaHAS || '');
      setSacModel(data.cosechaSac || '');
      setRedModel(data.rcosechaReded || '');
      setHumedadModel(data.cosechaHumedad || '');
      setCosechaModel(data.cosechaCosechaId || 0);
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
    const responseTierra = await searchAsignaTierra()
    setListAsigna(responseTierra)
    const formatter= responseTierra?.map(tipo =>(
      formatterDataCombo(tipo.asignarTierraTierraId, tipo.asignarTierraTierraUC)))
    setTierras(formatter)
  }
  const fetchOptionCosechaTipo = async() => {
    const responseTipo = await searchCosechaTipo()
    const formatter= responseTipo?.map(tipo =>(
      formatterDataCombo(tipo.cosechaTipoId, tipo.descripcion)))
    setCosechaTipo(formatter)
  }
  const handleSelectionChangeTierra = (option) => {
    setUCModel(option)
    const selected = listAsigna.find(tierra => tierra.asignarTierraTierraId === option)
    setCampoModel(selected.tierraCampo)
    setUTModel({proveedorId:selected.asignarTierraProveedorId, ut:selected.asignarTierraProveedorUT})
  }
  const handleSelectionChangeCosechaTipo = (option) => setCosechaModel(option)
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
        save = {...save,
          cosechaId: idModel,
          userModifiedName: "ADMIN",
          userModifiedAt: obtenerFechaLocal({date: new Date()}).split('T')[0]
        }        
        const resp = await cosechaSave('PUT', save)
       return onShowModel(resp)
      }
      save = {...save,
        cosechaFecha: fechaModel,
        cosechaSupervisor: supervisorModel || null,
        cosechaTierraId: ucModel,
        cosechaProveedorId: utModel.proveedorId,
        userCreatedName: "ADMIN",
        userCreatedAt: obtenerFechaLocal({date: new Date()}).split('T')[0]
      }      
      const resp = await cosechaSave('POST', save)
      return onShowModel(resp)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({cosechaId:0})
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
            allDisabled={idModel > 0}
          /> 
          {errores.uc && <MessageValidationInput mensaje={errores.uc}/>}
        </FilterOption>
        <FilterOption htmlFor={'CampoForm'} name={'Campo'}>
          <InputTextCustom placeholder='Automático ' textValue={campoModel} readOnly />
        </FilterOption>
        <FilterOption htmlFor={'CosechaUT'} name={'UT'}>
          <InputTextCustom placeholder='Automático ' textValue={utModel.ut} readOnly />            
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
            readOnly={idModel > 0}
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
