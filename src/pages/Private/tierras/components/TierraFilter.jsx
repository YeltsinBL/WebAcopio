import { useState } from "react"
import { 
    ButtonCustom,
    FilterOption,
    InputTextCustom,
    SectionFilter 
} from "../../../../components/common"

export const TierraFilter = ({onFiltersValue}) => {
  const [ucFilter, setUcFilter] = useState('')
  const [campoFilter, setCampoFilter] = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const [valleFilter, setValleFilter] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue({
      uc:ucFilter, 
      campo:campoFilter, 
      sector:sectorFilter, 
      valle: valleFilter})
  }

  return (
    <SectionFilter>
      <FilterOption htmlFor={'TierraUC'} name={'UC'}>
        <InputTextCustom placeholder='Ingrese el código UC'
          textValue={ucFilter}
          onChange={setUcFilter}
        />
      </FilterOption>
      <FilterOption htmlFor={'TierraCampo'} name={'Campo'}>
        <InputTextCustom placeholder='Ejm: Guayaquil'
          textValue={campoFilter}
          onChange={setCampoFilter}
        />
      </FilterOption>
      <FilterOption htmlFor={'TierraSector'} name={'Sector'} >
        <InputTextCustom placeholder='Ejm: Molino Larco'
          textValue={sectorFilter}
          onChange={setSectorFilter}
        />
      </FilterOption>
      <FilterOption htmlFor="TierraValle" name={'Valle'}>
        <InputTextCustom placeholder='Ejm: Chicama'
          value={valleFilter}
          onChange={setValleFilter}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch} />
	</SectionFilter>
  )
}
