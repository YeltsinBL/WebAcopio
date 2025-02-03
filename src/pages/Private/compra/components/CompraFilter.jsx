import { useEffect, useState } from "react"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, InputTextCustom, SectionFilter 
} from "~components/common"
import { ESTADO_BASIC } from "~components/mocks/DataList"
import { searchTipoComprobante } from "~services/tipos"
import { formatterDataCombo } from "~utils/index"

export const CompraFilter = ({onFiltersValue}) => {
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [comprobanteFilter, setComprobanteFilter] = useState('')
  const [numeroFilter, setNumeroFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  const [comprobantesList, setComprobantesList] = useState([])

  useEffect(() => {
    getComprobantes()
  }, [])
  const getComprobantes = async() => {
    const estados = await searchTipoComprobante()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.tipoComprobanteId, tipo.tipoComprobanteNombre)
    ))
    setComprobantesList(formatter)
  }
  const handleComprobanteChange = (option) =>
    setComprobanteFilter((option==''|| isNaN(option))?'':option)
  const handleEstadoChange= (option) => {
    if(option==''|| isNaN(option)) return setEstadoFilter('')
    setEstadoFilter(option == 2 ? false: true)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue({
      fechaDesde: fechaDesdeFilter, fechaHasta: fechaHastaFilter, 
      tipoComprobanteId: comprobanteFilter, numeroComprobante: numeroFilter,
      estadoId: estadoFilter})
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