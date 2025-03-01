import { AsignaTierraAdapterFilter } from "../adapter/AsignarTierraAdapter"
import { 
  ButtonCustom, FilterOption, InputDateCustom, InputTextCustom, SectionFilter  
} from "~components/common"
import { useAsignaTierraFilter } from "../hooks"

export const AsignaTierraFilter = ({onFiltersValue}) => {
  const {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    ucFilter, setUCFilter,
    utFilter, setUTFilter,
  } = useAsignaTierraFilter()

  const sendDataToParent = (event) => {
    event.preventDefault()
    onFiltersValue(AsignaTierraAdapterFilter({
      ucFilter, utFilter, fechaDesdeFilter, fechaHastaFilter
    }))
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'AsignaTierraFechaDesde'} name={'Fecha Desde'}>
        <InputDateCustom
          fechaValue={fechaDesdeFilter} setFechaValue={setFechaDesdeFilter} />
      </FilterOption>
      <FilterOption htmlFor={'AsignaTierraFechaHasta'} name={'Fecha Hasta'}>
        <InputDateCustom
          fechaValue={fechaHastaFilter} setFechaValue={setFechaHastaFilter} />
      </FilterOption>
      <FilterOption htmlFor={'AsignaTierraUC'} name={'UC'}>
        <InputTextCustom textValue={ucFilter}
          placeholder='Ingrese el código UC' onChange={setUCFilter} />
      </FilterOption>
      <FilterOption htmlFor={'AsignaTierraUT'} name={'UT'}>
        <InputTextCustom textValue={utFilter}
          placeholder='Ingrese el código UT' onChange={setUTFilter} />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={sendDataToParent} />
	</SectionFilter>
  )
}
