import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, SectionFilter 
} from "~components/common"
import { LiquidacionAdapterFilter } from "../adapter/LiquidacionAdapter"
import { useLiquidacionFilter } from "../hooks"

export function LiquidacionFilter({onFiltersValue}) {
  const {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    utFilter, setUtFilter, estadoFilter, setEstadoFilter,
    utList, liquidacionEstadoList,
  } = useLiquidacionFilter()
  const handleSelectionUTChange = (option) =>{
    setUtFilter(option)
  }
  const handleSelectionEstadoChange = (option) =>{
    setEstadoFilter(option)
  }
  const handleSeachCarguillo = (e) =>{
    e.preventDefault()
    onFiltersValue(LiquidacionAdapterFilter({
      fechaDesdeFilter, fechaHastaFilter, utFilter, estadoFilter
    }))
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaDesdeFilter'} name={'Fecha Desde'}>
        <InputDateCustom fechaValue={fechaDesdeFilter} 
          setFechaValue={setFechaDesdeFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'}>
        <InputDateCustom fechaValue={fechaHastaFilter} 
          setFechaValue={setFechaHastaFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'UtFilter'} name={'UT'}>
        <ComboBoxCustom  initialOptions={utList} disabled={false}
          onSelectionChange={handleSelectionUTChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'RecojoEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom  initialOptions={liquidacionEstadoList} disabled={false}
          onSelectionChange={handleSelectionEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo}/>
    </SectionFilter>
  )
}