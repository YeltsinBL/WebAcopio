import { useCosechaFilter } from "../hooks"
import { CosechaAdapterFilter } from "../adapter/CosechaAdapter"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, InputTextCustom, 
  SectionFilter 
} from "~components/common"

export const CosechaFilter = ({onFiltersValue}) => {
  const {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    utFilter, setUTFilter,
    ucFilter, setUCFilter,
    cosechaTipoFilter, setCosechaTipoFilter,
    cosechaTipo,
  } = useCosechaFilter()

  const handleSelectionChangeCosechaTipo = (option) => 
    setCosechaTipoFilter((option==''|| isNaN(option))?'':option)
  
  const handleSearchCosecha = (event) => {
    event.preventDefault()
    onFiltersValue(CosechaAdapterFilter({
      ucFilter, utFilter, fechaDesdeFilter,  fechaHastaFilter,
      cosechaTipoFilter
    }))
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
      <FilterOption htmlFor="CosechaUC" name={'UC'}>
        <InputTextCustom textValue={ucFilter} 
          placeholder='Ingrese el código UC' onChange={setUCFilter} />
      </FilterOption>
      <FilterOption htmlFor="CosechaUT" name={'UT'}>
        <InputTextCustom textValue={utFilter} 
          placeholder='Ingrese el código UT' onChange={setUTFilter} />
      </FilterOption>
      <FilterOption htmlFor="CosechaTipo" name={'Tipo Cosecha'}>
        <ComboBoxCustom initialOptions={cosechaTipo} disabled={false}
          onSelectionChange={handleSelectionChangeCosechaTipo}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearchCosecha}/>
	  </SectionFilter>
  )
}
