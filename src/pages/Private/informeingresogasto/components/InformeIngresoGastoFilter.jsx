import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, SectionFilter 
} from "~components/common"
import { 
  useInformeIngresoGastoInitialFilter, 
  useSembrador
} from "../hooks"
import { InformeIngresoGastoAdapterFilter } from "../adapter/InformeIngresoGastoAdapter"
import { ESTADO_BASIC } from "~components/mocks/DataList"

export const InformeIngresoGastoFilter = ({onInformeFilters}) => {
  const {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    sembradorIdFilter, setsembradorIdFilter,
    estadoFilter, setEstadoFilter
  } = useInformeIngresoGastoInitialFilter()
  const { sembradorList } = useSembrador()
  
  const handleSelectionUTChange = (option) =>
    setsembradorIdFilter((option==''|| isNaN(option))?'':option)
  
  const handleSelectionEstadoChange = (option) => 
    setEstadoFilter(option==''|| isNaN(option))?'':(option == 2 ? false: true)  
  
  const handleSearch = (e) => {
    e.preventDefault()
    onInformeFilters(InformeIngresoGastoAdapterFilter({
      fechaDesdeFilter, fechaHastaFilter, sembradorIdFilter, estadoFilter
    }))
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaDesdeFilter'} name={'Fecha Desde'}>
        <InputDateCustom fechaValue={fechaDesdeFilter}
          setFechaValue={setFechaDesdeFilter} />
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'}>
        <InputDateCustom fechaValue={fechaHastaFilter}
          setFechaValue={setFechaHastaFilter} />
      </FilterOption>
      <FilterOption htmlFor={'SembradorModel'} name={'Sembrador'}>
        <ComboBoxCustom  initialOptions={sembradorList} disabled={false}
          onSelectionChange={handleSelectionUTChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'EstadoFilter'} name={'Estado'}>
        <ComboBoxCustom  initialOptions={ESTADO_BASIC} disabled={false}
          onSelectionChange={handleSelectionEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch} />
    </SectionFilter>
  )
}