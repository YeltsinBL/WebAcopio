import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, 
  SectionFilter 
} from "~components/common"
import { useServicioPaleroFilter } from "../hooks"

export const ServicioPaleroFilter = ({onFiltersValue}) => {
  const {
    estadoList, carguilloList,
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    carguilloFilter, setCarguilloFilter,
    estadoFilter, setEstadoFilter,
  } = useServicioPaleroFilter()

  const handleSelectionCarguilloChange = (option) => setCarguilloFilter((option==''|| isNaN(option))?'':option)
  const handleSelectionEstadoChange = (option) => setEstadoFilter((option==''|| isNaN(option))?'':option)
  
  const handleSeachCarguillo = (e) =>{
    e.preventDefault()
    onFiltersValue({ fechaDesdeFilter, fechaHastaFilter,  carguilloFilter, estadoFilter })
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
      <FilterOption htmlFor={'CarguilloFilter'} name={'Palero'}>
        <ComboBoxCustom initialOptions={carguilloList} disabled={false}
          onSelectionChange={handleSelectionCarguilloChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'ServicioEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom initialOptions={estadoList} disabled={false}
          onSelectionChange={handleSelectionEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo}/>
    </SectionFilter>
  )
}