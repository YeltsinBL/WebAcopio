import { useState } from "react";
import { ButtonCustom, ComboBoxCustom, FilterOption, InputTextCustom, SectionFilter } from "../common";
import { ESTADO_BASIC } from "../mocks/DataList";

export default function UserFilter({onUserValues}) {
  const [nameFilter, setNameFilter] = useState('')
  const [userNameFilter, setUserNameFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const handleEstadoChange= (option) => {
    if(option==''|| isNaN(option)) return setEstadoFilter('')
    setEstadoFilter(option == 2 ? false: true)
  }
  const sendDataToParent = (event) => {
    event.preventDefault()
    onUserValues({name:nameFilter, userName:userNameFilter,
      estado:estadoFilter})
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'NameFilter'} name={'Nombre'}>
        <InputTextCustom placeholder="Ingresa el dni y/o nombre" 
          textValue={nameFilter} onChange={setNameFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'UserNameFilter'} name={'Usuario'}>
        <InputTextCustom placeholder="Ingresa el usuario" 
          textValue={userNameFilter} onChange={setUserNameFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'ProveedorEstadoFilter'} name={'Estado Usuario'}>
        <ComboBoxCustom initialOptions={ESTADO_BASIC} disabled={false}
          onSelectionChange={handleEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={sendDataToParent} />
    </SectionFilter>
  )
}