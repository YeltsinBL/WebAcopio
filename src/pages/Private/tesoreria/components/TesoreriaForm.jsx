import { useEffect, useState } from "react"
import { 
    ComboBoxCustom,
    ContainerPopupCustom, FilterOption, Footer, FooterButton, InputDateCustom, InputDecimalCustom, InputTextCustom, MessageValidationInput, SectionModelPopup 
} from "../../../../components/common"
import { 
    convertirFechaToYMD, formatterDataCombo, obtenerFechaLocal 
} from "../../../../utils"
import { liquidacionSearch } from "../../../../services/liquidacion"
import { tesoreriaSave } from "../../../../services/tesoreria"

export const TesoreriaForm = ({onShowModel, data}) => {
  const [liquidacionList, setLiquidacionList] = useState([])
  const [proveedoresComboList, setProveedorComboList] = useState([])
  const [tesoreriaId, setTesoreriaId] = useState(0)
  const [fechaModel, setFechaModel] = useState(obtenerFechaLocal({date: new Date()}).split('T')[0])
  const [liquidacionId, setLiquidacionId] = useState("")
  const [campoModel, setCampoModel] = useState("")
  const [utModel, setUtModel] = useState("")
  const [montoModel, setMontoModel] = useState(0)
  const [bancoModel, setBancoModel] = useState("")
  const [cteModel, setCteModel] = useState("")
  
  const [errores, setErrores] = useState({})
  const seleccionPersona = data?.liquidacionId ? {id: data.liquidacionId, nombre: data.personaNombre } : null
  
  useEffect(()=>{
    if(data){
      setTesoreriaId(data.tesoreriaId || 0)
      setFechaModel(
        data.tesoreriaFecha ? convertirFechaToYMD(data.tesoreriaFecha) : 
        obtenerFechaLocal({date: new Date()}).split('T')[0]
      )
      setLiquidacionId(data.liquidacionId || 0)
      setCampoModel(data.tierraCampo || '')
      setUtModel(data.proveedorUT || '')
      setMontoModel(data.tesoreriaMonto || 0)
      setBancoModel(data.tesoreriaBanco || '')
      setCteModel(data.tesoreriaCtaCte || '')
      return
    }
    proveedorListAliquidar()
  }, [])
  const proveedorListAliquidar = async()=>{
    const liquidaciones = await liquidacionSearch({
        fechaDesdeFilter:'',
        fechaHastaFilter:'',
        utFilter:'',
        estadoFilter:1})
    setLiquidacionList(liquidaciones)
    const formatter= liquidaciones?.map(ut =>(
      formatterDataCombo(ut.liquidacionId, ut.personaNombre)))
    setProveedorComboList(formatter)
  }
  const handleSelectionUTChange = (option) =>{
    setLiquidacionId(option)
    const proveedor = liquidacionList.find(p => p.liquidacionId == option)
    setCampoModel(proveedor.tierraCampo)
    setUtModel(proveedor.proveedorUT)
    setMontoModel(proveedor.liquidacionPagar)
  }
  const validarCampos = () => {
    const nuevosErrores = {}
    if (!fechaModel) nuevosErrores.fechaModel = "El campo FECHA es obligatorio."
    if (!liquidacionId) nuevosErrores.ut = "El campo SEEMBRADOR es obligatorio."
    if (!cteModel) nuevosErrores.ctacte = "El campo CTA. CTE. es obligatorio."    
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e)=>{
    e.preventDefault()
    if(validarCampos()){
      let tesoreriaModel = {
        tesoreriaFecha: fechaModel,
        liquidacionId: liquidacionId,
        tesoreriaBanco: bancoModel,
        tesoreriaCtaCte: cteModel,
        tesoreriaMonto: montoModel
      }
      tesoreriaModel.userCreatedAt= obtenerFechaLocal({date: new Date()})
      tesoreriaModel.userCreatedName= "ADMIN"
      const tesoreriaResp = await tesoreriaSave('POST', tesoreriaModel)
      return onShowModel(tesoreriaResp)
    }
  }
  const handleCancelar = (e)=>{
    e.preventDefault()
    onShowModel({tesoreriaId:0})
  }
  return (
    <ContainerPopupCustom>
      <SectionModelPopup title={(tesoreriaId > 0 ? 'Información de':'Registrar') + ' Tesoreria'}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'FechaModel'} name={'Fecha'}>
            <>
                <InputDateCustom fechaValue={fechaModel}
                valueError={errores.fechaModel ? true: false}
                setFechaValue={setFechaModel}/>
                {errores.fechaModel && <MessageValidationInput mensaje={errores.fechaModel}/>}
            </>
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'SembradorModel'} name={'Sembrador'}>
              <ComboBoxCustom initialOptions={proveedoresComboList} selectedOption={seleccionPersona}
                onSelectionChange={handleSelectionUTChange}
                className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                  errores.ut ? "border-red-500" : ""
                }`}
                colorOptions={"text-black"}
              />
              {errores.ut && <MessageValidationInput mensaje={errores.ut}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'campoModel'} name={'Campo'}>
              <InputTextCustom placeholder='Automático ' textValue={campoModel} readOnly />
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'utModel'} name={'UT'}>
              <InputTextCustom placeholder={'Automático'} textValue={utModel} readOnly/>
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'utMonto'} name={'Por Pagar'}>
              <InputDecimalCustom placeholder={'Automático'} textValue={montoModel}
                readOnly decimales={2}/>
            </FilterOption>
            </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'BancoModel'} name={'Banco'}>
              <InputTextCustom onChange={setBancoModel} placeholder='Ejm: Interbank'
                textValue={bancoModel} />
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'CtaCteModel'} name={'Cta. Cte'}>
              <InputTextCustom onChange={setCteModel} placeholder='Ingrese el Cte del Sembrador'
                valueError={errores.ctacte}
                textValue={cteModel} />
              {errores.ctacte && <MessageValidationInput mensaje={errores.ctacte}/>}
            </FilterOption>
          </div>
        </div>
        <Footer>
          {tesoreriaId == 0 ?
          <FooterButton name={'Guardar'} accion={handleGuardar}/>:''
          }
          <FooterButton name={'Cancelar'} accion={handleCancelar}/>
        </Footer>
      </SectionModelPopup>
    </ContainerPopupCustom>
  )
}