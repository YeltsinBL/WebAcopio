import { asignaTierraSave } from "~services/asignartierra"
import { 
  ComboBoxCustom, ContainerPopupCustom, FilterOption, Footer, FooterButton, 
  InputDateCustom, MessageValidationInput, SectionModelPopup 
} from "~components/common"
import { AsignaTierraAdapterSave } from "../adapter/AsignarTierraAdapter"
import { useAsignaTierraForm, useAsignaTierraValidation } from "../hooks"
export const AsignaTierraForm = ({ onShowModel, data }) => {
  const {
    id, ut, setUt,
    uc, setUC,
    fecha, setFecha,
    tierras, provedores, seleccionProveedor, seleccionTierra
  } = useAsignaTierraForm(data)

  const {validate, errores} = useAsignaTierraValidation()

  const handleSelectionChangeProveedor = (option) => setUt(option)
  const handleSelectionChangeTierra = (option) => setUC(option)

  const handleGuardar = async(e) => {
    e.preventDefault()
    let asignaModel ={ id, ut, uc, fecha,}
    const {isValid} = validate(asignaModel)
    if(isValid){
      const asigna = await asignaTierraSave(
        id > 0 ?'PUT':'POST', 
        AsignaTierraAdapterSave(asignaModel)
      )
      return onShowModel(asigna)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({asignarTierraId:0 })
  }

  return (
    <ContainerPopupCustom>
      <SectionModelPopup title={(id > 0 ? 'Editar':'Registrar') + ' Asignar Tierra'}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'AsignaTierraFechaModal'} name={'Fecha'}>
              <InputDateCustom fechaValue={fecha}
                valueError={errores.fecha ? true: false}
                setFechaValue={setFecha}
              />
              {errores.fecha && <MessageValidationInput mensaje={errores.fecha}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'AsignaTierraUCModal'} name={'UC/Tierra'}>
              <ComboBoxCustom initialOptions={tierras} selectedOption={seleccionTierra} 
                onSelectionChange={handleSelectionChangeTierra}
                className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                  errores.uc ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              />
              {errores.uc && <MessageValidationInput mensaje={errores.uc}/>}
            </FilterOption>
          </div>
          <div className='pl-6 pr-6'>
            <FilterOption htmlFor={'AsignaTierraUTModal'} name={'UT/Proveedor'}>
              <ComboBoxCustom initialOptions={provedores} selectedOption={seleccionProveedor} 
                onSelectionChange={handleSelectionChangeProveedor}
                className={`bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 ${
                  errores.ut ? "border-red-500" : ""
              }`}
              colorOptions={"text-black"}
              />
              {errores.ut && <MessageValidationInput mensaje={errores.ut}/>}
            </FilterOption>
          </div>
        </div>
        <Footer>
          <FooterButton name={'Guardar'} accion={handleGuardar}/>
          <FooterButton name={'Cancelar'} accion={handleCancelar}/>
        </Footer>
      </SectionModelPopup>
    </ContainerPopupCustom>
  )
}
