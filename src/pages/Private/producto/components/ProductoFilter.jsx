import { useState } from "react"
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputTextCustom, SectionFilter 
} from "~components/common"
import { ESTADO_BASIC, STOCK_BASIC } from "~components/mocks/DataList"

export const ProductoFilter = ({onProductFilters}) => {
  const [nameFilter, setNameFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [stockFilter, setStockFilter] = useState('')

  const handleEstadoChange= (option) => {
    if(option==''|| isNaN(option)) return setEstadoFilter('')
    setEstadoFilter(option == 2 ? false: true)
  }
  const handleStockChange= (option) => {
    if(option==''|| isNaN(option)) return setStockFilter('')
      setStockFilter(option == 2 ? false: true)
  }
const sendDataToParent = (event) => {
  event.preventDefault()
  onProductFilters({nombre:nameFilter, estado:estadoFilter, stock: stockFilter})
}
  return (
    <SectionFilter>
      <FilterOption htmlFor={'NameFilter'} name={'Nombre'}>
        <InputTextCustom placeholder="Ingrese el nombre" 
            textValue={nameFilter} onChange={setNameFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'TipoEstadoFilter'} name={'Estado Tipo'}>
        <ComboBoxCustom initialOptions={ESTADO_BASIC} disabled={false}
          onSelectionChange={handleEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
      <FilterOption htmlFor={'StockFilter'} name={'Stock'}>
        <ComboBoxCustom initialOptions={STOCK_BASIC} disabled={false}
          onSelectionChange={handleStockChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={sendDataToParent} />
    </SectionFilter>
  )
}