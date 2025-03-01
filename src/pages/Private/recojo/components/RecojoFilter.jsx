import { 
  ButtonCustom, InputDateCustom, FilterOption, SectionFilter, ComboBoxCustom 
} from '~components/common'
import { useRecojoFilter } from '../hooks/useRecojoFilter'
import { RecojoAdapterFilter } from '../adapter/RecojoAdapter'

export const RecojoFilter = ({onFiltersValue}) => {
  const {
    recojoEstadoList, fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    estadoFilter, setEstadoFilter,
  } = useRecojoFilter()
  const handleSelectionChange = (option) =>
    setEstadoFilter((option==''|| isNaN(option))?'':option)
  
  const handleSeachCarguillo = (e) =>{
    e.preventDefault()
    onFiltersValue(RecojoAdapterFilter({
      fechaDesdeFilter, fechaHastaFilter, estadoFilter
    }))
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaInicioFilter'} name={'Fecha Desde'}>
        <InputDateCustom fechaValue={fechaDesdeFilter} 
          setFechaValue={setFechaDesdeFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'}>
        <InputDateCustom fechaValue={fechaHastaFilter} 
          setFechaValue={setFechaHastaFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'RecojoEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom  initialOptions={recojoEstadoList} disabled={false}
          onSelectionChange={handleSelectionChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo}/>
    </SectionFilter>
  )
}
