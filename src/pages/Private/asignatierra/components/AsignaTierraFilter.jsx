import { useState } from "react"
import { 
  ButtonCustom, FilterOption, InputDateCustom, InputTextCustom, SectionFilter 
} from "../../../../components/common"

export const AsignaTierraFilter = ({onFiltersValue}) => {
  const [ucFilter, setUCFilter] = useState('')
  const [utFilter, setUTFilter] = useState('')
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const sendDataToParent = (event) => {
    event.preventDefault()
    onFiltersValue({
      uc:ucFilter, ut:utFilter, 
      fechaDesde:fechaDesdeFilter, 
      fechaHasta: fechaHastaFilter})
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
