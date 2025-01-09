import { useEffect, useState } from "react"
import { 
  ComboBoxCustom, ContainerPopupCustom, FilterOption, Footer, FooterButton, 
  InputDateCustom, MessageValidationInput, SectionModelPopup 
} from "../../../../components/common"
import { asignaTierraSave } from "../../../../services/asignartierra"
import { searchTierrasAvailable } from "../../../../services/tierra"
import { searchProveedorAvailable } from "../../../../services/proveedor"
import { formatterDataCombo, obtenerFechaLocal } from "../../../../utils"
export const AsignaTierraForm = ({ onShowModel, data }) => {
  const [id, setId] = useState('')
  const [ut, setUt] = useState('')
  const [uc, setUC] = useState(null)
  const [fecha, setFecha] = useState('')
  const [tierras, setTierras] = useState([])
  const [provedores, setProveedores] = useState([])
 
  const [errores, setErrores] = useState({})
  const seleccionProveedor = data.asignarTierraProveedorId ? {id: data.asignarTierraProveedorId, ut: data.asignarTierraProveedorUT } : null
  const seleccionTierra = data.asignarTierraTierraId ? {id: data.asignarTierraTierraId, uc: data.asignarTierraTierraUC } : null
  useEffect(() => {
    if (data) {
      fetchOptionsTierras()
      fetchOptionsProveedor()
      setId(data.asignarTierraId || 0);
      setUt(data.asignarTierraProveedorId || 0)
      setUC(data.asignarTierraTierraId || 0)
      setFecha(data.asignarTierraFecha || obtenerFechaLocal({date: new Date()}).split('T')[0]);
    }
  }, []);
  const fetchOptionsTierras = async () => {
    try {
      const responseTierra = await searchTierrasAvailable()
      // Combina la opción seleccionada actual con los datos de la API (si no existe en la lista)
      const updatedOptions = seleccionTierra ?
      [seleccionTierra, ...responseTierra.filter((option) => option.id !== seleccionTierra.id)]
      : responseTierra
      const formatter = updatedOptions?.map(tipo =>(formatterDataCombo(tipo.id,tipo.uc)))
      setTierras(formatter)
    } catch (error) {
      console.error('Error al cargar las opciones:', error);
    }
  }
  const fetchOptionsProveedor = async () => {
    try {
      const responseProveedor = await searchProveedorAvailable()
      const updatedProveedor =  seleccionProveedor ?
        [seleccionProveedor, ...responseProveedor.filter((option) => option.id !== seleccionProveedor.id)]
        : responseProveedor
      const formatter = updatedProveedor?.map(tipo =>(formatterDataCombo(tipo.id,tipo.ut)))
      setProveedores(formatter)
    } catch (error) {
      console.error('Error al cargar las opciones:', error);
    }
  }

  const validarCampos = () => {
    const nuevosErrores = {}
    if (!ut) nuevosErrores.ut = "El campo UT es obligatorio."
    if (!uc) nuevosErrores.uc = "El campo UC es obligatorio."
    if (!fecha) nuevosErrores.fecha = "El campo FECHA es obligatorio."
  
    setErrores(nuevosErrores)
  
    return Object.keys(nuevosErrores).length === 0 // Solo es válido si no hay errores
  }
  const handleGuardar = async(e) => {
    e.preventDefault()
    if (validarCampos()) {
      let asignaModel ={
        asignarTierraProveedorId: ut,
        asignarTierraTierraId: uc,
        asignarTierraFecha: fecha,
      }
      if(id > 0){
        asignaModel = {...asignaModel,
          asignarTierraId: id,
          userModifiedName: "ADMIN",
          userModifiedAt: obtenerFechaLocal({date: new Date()})
        }
        const asigna = await asignaTierraSave('PUT',asignaModel)
        return onShowModel(asigna)
      }
      asignaModel = {...asignaModel,
        userCreatedName: "ADMIN",
        userCreatedAt: obtenerFechaLocal({date: new Date()})
      }
      const asigna = await asignaTierraSave('POST', asignaModel)
      return onShowModel(asigna)
    }
  }
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({asignarTierraId:0 })
  }
  const handleSelectionChangeProveedor = (option) => setUt(option)
  const handleSelectionChangeTierra = (option) => setUC(option)
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
        </div>
        <Footer>
          <FooterButton name={'Guardar'} accion={handleGuardar}/>
          <FooterButton name={'Cancelar'} accion={handleCancelar}/>
        </Footer>
      </SectionModelPopup>
    </ContainerPopupCustom>
  )
}
