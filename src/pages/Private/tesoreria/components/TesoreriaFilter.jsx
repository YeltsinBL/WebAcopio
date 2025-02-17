import { useEffect, useState } from "react"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, SectionFilter
} from "~components/common"
import { searchProveedorAvailable } from "~services/proveedor"
import { 
  formatterDataCombo, obtenerFechaInicialMes, obtenerSoloFechaLocal 
} from "~utils/index"

export const TesoreriaFilter = ({onFiltersValue}) => {
  const [utList, setUtList] = useState([])
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState(obtenerFechaInicialMes())
  const [fechaHastaFilter, setFechaHastaFilter] = useState(obtenerSoloFechaLocal({date: new Date()}))
  const [utFilter, setUtFilter] = useState('')

  useEffect(()=>{
    getUts()
  }, [])
  const getUts = async() => {
    const uts = await searchProveedorAvailable()
    const formatter= uts?.map(ut =>(
      formatterDataCombo(ut.id, ut.ut)))
    setUtList(formatter)
    
  }
  
  const handleSelectionUTChange = (option) => 
    setUtFilter((option==''|| isNaN(option))?'':option)
  
  const handleSeachCarguillo = (e) =>{
    e.preventDefault()
    onFiltersValue({
      fechaDesde:fechaDesdeFilter, 
      fechaHasta: fechaHastaFilter, 
      proveedorId: utFilter
    })
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaInicioFilter'} name={'Fecha Inicio'}>
        <InputDateCustom fechaValue={fechaDesdeFilter} 
          setFechaValue={setFechaDesdeFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'FechaInicioFilter'} name={'Fecha Inicio'}>
        <InputDateCustom fechaValue={fechaHastaFilter} 
          setFechaValue={setFechaHastaFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'ProveedorFilter'} name={'Proveedor'}>
        <ComboBoxCustom  initialOptions={utList} disabled={false}
          onSelectionChange={handleSelectionUTChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo}/>
    </SectionFilter>
  )
}