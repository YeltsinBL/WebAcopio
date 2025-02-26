import { 
  ComboBoxCustom, FilterOption, Footer, FooterButton, InputDateCustom, InputTextCustom, 
  MessageValidationInput, SectionModel 
} from '~components/common'
import { cosechaSave } from '~services/cosecha'
import { useCosechaForm, useCosechaValidation } from '../hooks'
import { CosechaAdapterSave } from '../adapter/CosechaAdapter'
import { toast } from 'sonner'

export const CosechaModel = ({ onShowModel, data }) => {
  const {
    idModel, ucModel, setUCModel,
    campoModel, setCampoModel,
    utModel, setUTModel,
    fechaModel, setFechaModel,
    supervisorModel, setSupervisorModel,
    hasModel, setHasModel,
    sacModel, setSacModel,
    redModel, setRedModel,
    humedadModel, setHumedadModel,
    cosechaModel, setCosechaModel,
    tierras, cosechaTipo, listAsigna, 
    seleccionTierra, seleccionCosechaTipo,
  } = useCosechaForm(data)
  
  const {validate, errores} = useCosechaValidation()

  const handleSelectionChangeTierra = (option) => {
    setUCModel(option)
    const selected = listAsigna.find(tierra => tierra.asignarTierraTierraId === option)
    setCampoModel(selected.tierraCampo)
    setUTModel({proveedorId:selected.asignarTierraProveedorId, ut:selected.asignarTierraProveedorUT})
  }
  const handleSelectionChangeCosechaTipo = (option) => setCosechaModel(option)
  const handleGuardar = async(e) => {
    e.preventDefault()
    const toastLoadingCustom = toast.loading('Cargando...')
    const save = {
      idModel, utModel, ucModel, fechaModel, cosechaModel,
      hasModel, sacModel, redModel, humedadModel,
      supervisorModel, 
    }
    const {isValid} = validate(save)
    if(isValid){    
      const resp = await cosechaSave(idModel > 0?'PUT':'POST', CosechaAdapterSave(save))
      if(resp.result === false) 
        return toast.error(resp.message, {id: toastLoadingCustom, style: { color:'red' }})
      toast.success(resp.message, {id: toastLoadingCustom})
      return onShowModel(resp)
    }
    setTimeout(() => { toast.dismiss(toastLoadingCustom) })
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({result:false})
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
