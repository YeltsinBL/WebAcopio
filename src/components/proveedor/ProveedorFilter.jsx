import { useState } from "react"
import { ButtonCustom, ComboBoxCustom, FilterOption, InputTextCustom, SectionFilter } from "../common"
import { ESTADO_BASIC } from "../mocks/DataList"

export const ProveedorFilter = ({onUTValue}) => {
    const [utFilter, setUTFilter] = useState('')
    const [nombreFilter, setNombreFilter] = useState('')
    const [estadoFilter, setEstado] = useState('')

    const handleEstadoChange= (option) => {
      setEstado(option)
    }
    const sendDataToParent = (event) => {
      event.preventDefault()
      onUTValue({ut:utFilter, nombre:nombreFilter,
        estado:(estadoFilter==''|| isNaN(estadoFilter))?''
        :(estadoFilter == 2 ? false: true)})
    }

  return (
    <SectionFilter>
      <FilterOption htmlFor={'ProveedorUTFilter'} name={'UT'}>
        <InputTextCustom textValue={utFilter} 
          placeholder={'Ingrese el código UT'} onChange={setUTFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'ProveedorNombre'} name={'Nombre'}>
        <InputTextCustom textValue={nombreFilter} 
          placeholder={'Busca por nombre o dni'} onChange={setNombreFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'ProveedorEstadoFilter'} name={'Estado UT'}>
        <ComboBoxCustom initialOptions={ESTADO_BASIC} disabled={false}
          onSelectionChange={handleEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={sendDataToParent} />
    </SectionFilter>
  )
}
