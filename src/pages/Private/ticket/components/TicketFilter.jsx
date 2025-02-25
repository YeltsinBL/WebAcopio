import {   
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, InputTextCustom, 
  SectionFilter  } from '~components/common'
import { useTicketFilter } from '../hooks/useTicketFilter'
import { TicketAdapterFilter } from '../adapter/TicketAdapter'

export const TicketFilter = ({onFiltersValue}) => {
  const {
    ingenioFilter, setIngenioFilter,
    transportistaFilter, setTransportistaFilter,
    viajeFilter, setviajeFilter,
    fechaDesdeFilter, setFechaDesdeFilter,
    fechaHastaFilter, setFechaHastaFilter,
    estadoFilter, setEstadoFilter,
    ticketEstado,
  } = useTicketFilter()
  const handleSelectionChange = (option) =>
    setEstadoFilter((option==''|| isNaN(option))?'':option)  

  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue(TicketAdapterFilter({
      ingenioFilter, transportistaFilter, 
      viajeFilter, fechaDesdeFilter, 
      fechaHastaFilter, estadoFilter
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
      <FilterOption htmlFor={'IngenioFilter'} name={'Ingenio'}>
        <InputTextCustom  textValue={ingenioFilter}
          placeholder='Ingrese el ingenio' onChange={setIngenioFilter} />
      </FilterOption>
      <FilterOption htmlFor={'TransportistaFilter'} name={'Transportista'}>
        <InputTextCustom textValue={transportistaFilter}
          placeholder='Ejm: Representaciones Shefa' onChange={setTransportistaFilter} />
      </FilterOption>
      <FilterOption htmlFor={'ViajeFilter'} name={'Viaje'}>
        <InputTextCustom textValue={viajeFilter}
          placeholder='Ejm: 508689' onChange={setviajeFilter} />
      </FilterOption>
      <FilterOption htmlFor={'EstadoFilter'} name={'Estado'}>
        <ComboBoxCustom  initialOptions={ticketEstado} disabled={false}
          onSelectionChange={handleSelectionChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch}/>
	</SectionFilter>
  )
}
