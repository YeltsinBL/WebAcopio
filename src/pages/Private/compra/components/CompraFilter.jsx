import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, InputTextCustom,
  SectionFilter 
} from "~components/common"
import { ESTADO_BASIC } from "~components/mocks/DataList"
import { useCompraInitialFilter } from "../hooks"
import { CompraAdapterFilter } from "../adapter/CompraAdapter"
import { useTipoComprobante } from "../hooks/useTipoComprobante"

export const CompraFilter = ({onFiltersValue}) => {
  const {
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    comprobanteFilter, setComprobanteFilter,
    numeroFilter, setNumeroFilter,
    estadoFilter, setEstadoFilter,
  } = useCompraInitialFilter()
  const {comprobantesList} = useTipoComprobante()

  const handleComprobanteChange = (option) =>
    setComprobanteFilter((option==''|| isNaN(option))?'':option)
  const handleEstadoChange= (option) => {
    if(option==''|| isNaN(option)) return setEstadoFilter('')
    setEstadoFilter(option == 2 ? false: true)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue(CompraAdapterFilter({
      fechaDesdeFilter, fechaHastaFilter, 
      comprobanteFilter, numeroFilter,
      estadoFilter
    }))
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaDesdeFilter'} name={'Fecha Desde'}>
        <InputDateCustom  fechaValue={fechaDesdeFilter}
          setFechaValue={setFechaDesdeFilter} />
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'}>
        <InputDateCustom fechaValue={fechaHastaFilter}
          setFechaValue={setFechaHastaFilter} />
      </FilterOption>
      <FilterOption htmlFor={'TipoComprobanteFilter'} name={'Comprobante'}>
        <ComboBoxCustom initialOptions={comprobantesList} disabled={false}
          onSelectionChange={handleComprobanteChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'ComprobanteNumeroFilter'} name={'N° Comprobante'}>
        <InputTextCustom textValue={numeroFilter} 
          placeholder={'Ejm: N° del Factura'} onChange={setNumeroFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'TipoEstadoFilter'} name={'Estado Tipo'}>
        <ComboBoxCustom initialOptions={ESTADO_BASIC} disabled={false}
          onSelectionChange={handleEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch} />
    </SectionFilter>
      
  )
}