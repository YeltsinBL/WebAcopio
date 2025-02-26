import { 
  ButtonCustom, ComboBoxCustom, FilterOption, SectionFilter 
} from '~components/common'
import { useCarguilloFilter } from '../hooks'

const CarguilloFilter = ({onFiltersValue}) => {
  const {
    carguilloTipo, setCarguilloTipo,
    carguilloTitular, setCarguilloTitular,
    carguilloTipoList, 
  } = useCarguilloFilter()
  
  const handleCarguilloTipoChange= (option) => 
    setCarguilloTipo((option==''|| isNaN(option))?'':option)
  
  const handleSeachCarguillo=(e) => {
    e.preventDefault()
    onFiltersValue({
      tipoCarguilloId: carguilloTipo, 
      titular: carguilloTitular, 
      estado: ''
    })
  }

  return (
    <SectionFilter>
      <FilterOption htmlFor={"CarguilloTipoFilter"} name={"Tipo Carguillo"}>
        <ComboBoxCustom initialOptions={carguilloTipoList} disabled={false}
          onSelectionChange={handleCarguilloTipoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'CarguilloTitularFilter'} name={'Titular'} type={'text'}
        placeholder={'Ejm: Transportista 1'} value={carguilloTitular} onChange={setCarguilloTitular}/>
      {/* <FilterOption htmlFor={'CarguilloEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom initialOptions={ESTADO_BASIC} disabled={false}
          onSelectionChange={handleCarguilloEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption> */}
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo} />
    </SectionFilter>
  )
}

export default CarguilloFilter