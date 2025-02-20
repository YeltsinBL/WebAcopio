import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputTextCustom, SectionFilter 
} from "~components/common"
import { ESTADO_BASIC } from "~components/mocks/DataList"
import { useClienteInitialFilter } from "../hooks/useClienteInitialFilter"

export const ClienteFilter = ({onClienteFilters}) => {

  const {
    nameFilter, setNameFilter, estadoFilter, setEstadoFilter,
  } = useClienteInitialFilter()

  const handleEstadoChange= (option) => {
    if(option==''|| isNaN(option)) return setEstadoFilter('')
    setEstadoFilter(option == 2 ? false: true)
  }
  const sendDataToParent = (event) => {
    event.preventDefault()
    onClienteFilters({nombre:nameFilter, estadoId:estadoFilter})
  }

  return (
    <SectionFilter>
      <FilterOption htmlFor={'NameFilter'} name={'Nombre'}>
        <InputTextCustom placeholder="Ingrese el nombre" 
            textValue={nameFilter} onChange={setNameFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'TipoEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom initialOptions={ESTADO_BASIC} disabled={false}
          onSelectionChange={handleEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={sendDataToParent} />
    </SectionFilter>
  )
}