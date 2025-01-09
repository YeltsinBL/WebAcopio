import { useEffect, useState } from 'react'
import { searchTicketsEstado } from '../../../../services/ticket'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, InputTextCustom, SectionFilter 
} from '../../../../components/common'
import { formatterDataCombo } from '../../../../utils'

export const TicketFilter = ({onFiltersValue}) => {
  const [ingenioFilter, setIngenioFilter] = useState('')
  const [transportistaFilter, setTransportistaFilter] = useState('')
  const [viajeFilter, setviajeFilter] = useState('')
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  
  const [ticketEstado, setTicketEstado] = useState([])

  useEffect(() => {
    getTicketEstados()
  }, [])
  const getTicketEstados = async() => {
    const estados = await searchTicketsEstado()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.ticketEstadoId, tipo.ticketEstadoDescripcion)))
    setTicketEstado(formatter)
  }
  const handleSelectionChange = (option) =>
    setEstadoFilter((option==''|| isNaN(option))?'':option)
  

  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue({
      ingenio:ingenioFilter, transportista:transportistaFilter, 
      viaje:viajeFilter, fechaDesde: fechaDesdeFilter, 
      fechaHasta: fechaHastaFilter, estado:estadoFilter})
}
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaDesdeFilter'} name={'Fecha Desde'}>
        <InputDateCustom  fechaValue={fechaDesdeFilter}
          setFechaValue={(e) => setFechaDesdeFilter(e.target.value)} />
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'}>
        <InputDateCustom fechaValue={fechaHastaFilter}
          setFechaValue={(e) => setFechaHastaFilter(e.target.value)} />
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
