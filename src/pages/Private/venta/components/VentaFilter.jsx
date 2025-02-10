import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, 
  InputTextCustom, SectionFilter 
} from "~components/common"
import { useVentaInitialFilter } from "../hooks/useVentaInitialFilter"
  
export const VentaFilter = ({onFiltersValue}) => {
  const {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    tipoFilter, setTipoFilter,
    numeroFilter, setNumeroFilter,
    estadoFilter, setEstadoFilter,
    ventaTipoList, ventaEstadoList
  } = useVentaInitialFilter()
  const handleTipoChange = (option) =>
    setTipoFilter((option==''|| isNaN(option))?'':option)
  const handleEstadoChange= (option) => {
    setEstadoFilter((option==''|| isNaN(option))?'':option)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue({
      fechaDesde: fechaDesdeFilter, fechaHasta: fechaHastaFilter, 
      tipoVentaId: tipoFilter, numeroComprobante: numeroFilter,
      estadoId: estadoFilter
    })
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
      <FilterOption htmlFor={'TipoVentaFilter'} name={'Tipo'}>
        <ComboBoxCustom initialOptions={ventaTipoList} disabled={false}
          onSelectionChange={handleTipoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'ComprobanteNumeroFilter'} name={'N° Comprobante'}>
        <InputTextCustom textValue={numeroFilter} 
          placeholder={'Ejm: N° del Factura'} onChange={setNumeroFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'TipoEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom initialOptions={ventaEstadoList} disabled={false}
          onSelectionChange={handleEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch} />
    </SectionFilter>
  )
}