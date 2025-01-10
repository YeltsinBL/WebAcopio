import { useEffect, useState } from "react"
import { searchCosechaTipo } from "../../../../services/cosecha"
import { ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, InputTextCustom, SectionFilter } from "../../../../components/common"
import { formatterDataCombo } from "../../../../utils"

export const CosechaFilter = ({onFiltersValue}) => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [utFilter, setUTFilter] = useState('')
  const [ucFilter, setUCFilter] = useState('')
  const [cosechaTipoFilter, setCosechaTipoFilter] = useState('')
  const [cosechaTipo, setCosechaTipo] = useState([])

  useEffect(() => {
      fetchOptionCosechaTipo()
  }, [])

  const handleSearchCosecha = (event) => {
    event.preventDefault()
    onFiltersValue({uc:ucFilter, ut:utFilter, 
        fechaDesde:fechaDesdeFilter, fechaHasta: fechaHastaFilter,
        tipoCosechaId:cosechaTipoFilter
    })
  }
  const fetchOptionCosechaTipo = async() => {
    const responseTipo = await searchCosechaTipo()
    const formatter= responseTipo?.map(tipo =>(
      formatterDataCombo(tipo.cosechaTipoId, tipo.descripcion)))
    setCosechaTipo(formatter)
  }
  const handleSelectionChangeCosechaTipo = (option) => 
    setCosechaTipoFilter((option==''|| isNaN(option))?'':option)
  
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
        <InputTextCustom textValue={ucFilter} 
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
