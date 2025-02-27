import { useCorteFilter } from '../hooks'
import { CorteAdapterFilter } from '../adapter/CorteAdapter'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, SectionFilter 
} from '~components/common'

export const CorteFilter = ({onFiltersValue}) => {
  const {
    ucFilter, setUcFilter,
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    estadoFilter, setEstadoFilter,
    ucLista, estadoLista, 
  } = useCorteFilter()
  const handleSelectionChange = (option) => setUcFilter(option)
  
  const handleSelectionChangeEstado = (option) => setEstadoFilter(option)
  
  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue(CorteAdapterFilter({
      ucFilter, fechaDesdeFilter, fechaHastaFilter, estadoFilter
    }))
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaDesdeFilter'} name={'Fecha Desde'} >
        <InputDateCustom fechaValue={fechaDesdeFilter} 
          setFechaValue={setFechaDesdeFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'} >
        <InputDateCustom fechaValue={fechaHastaFilter} 
          setFechaValue={setFechaHastaFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'UCFilter'} name={'UC'} >
        <ComboBoxCustom  initialOptions={ucLista} disabled={false}
          onSelectionChange={handleSelectionChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'EstadoFilter'} name={'Estado'} >
        <ComboBoxCustom  initialOptions={estadoLista} disabled={false}
          onSelectionChange={handleSelectionChangeEstado}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch}/>
    </SectionFilter>
  )
}
