import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, InputTextCustom, SectionFilter 
} from "~components/common"
import { useFacturaVentaEstado, useFacturaVentaInitialFilter } from "../hooks"
import { FacturaVentaAdapterFilter } from "../adapter/FacturaVentaAdapter"

export const FacturaVentaFilter = ({onInformeFilters}) => {
  const {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    numberFilter, setNumberFilter,
    estadoFilter, setEstadoFilter
  } = useFacturaVentaInitialFilter()
  const { estadoList } = useFacturaVentaEstado()
  
  const handleSelectionEstadoChange = (option) =>
    setEstadoFilter((option==''|| isNaN(option))?'':option)
  
  const handleSearch = (e) => {
    e.preventDefault()
    onInformeFilters(FacturaVentaAdapterFilter({
      fechaDesdeFilter, fechaHastaFilter, numberFilter, estadoFilter
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
      <FilterOption htmlFor={'NumeroFilter'} name={'N° Factura'}>
        <InputTextCustom textValue={numberFilter} 
          placeholder={'Ejm: N° del Factura'} onChange={setNumberFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'estadoFilter'} name={'Estado'}>
        <ComboBoxCustom initialOptions={estadoList} disabled={false}
          onSelectionChange={handleSelectionEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch} />
    </SectionFilter>
  )
}