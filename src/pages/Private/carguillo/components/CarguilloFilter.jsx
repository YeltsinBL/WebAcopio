import { 
  ButtonCustom, ComboBoxCustom, FilterOption, SectionFilter 
} from '~components/common'
import { useCarguilloFilter } from '../hooks'
import { CarguilloAdapterFilter } from '../adapter/CarguilloAdapter'

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
    onFiltersValue(CarguilloAdapterFilter({
      carguilloTipo, carguilloTitular
    }))
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
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo} />
    </SectionFilter>
  )
}

export default CarguilloFilter