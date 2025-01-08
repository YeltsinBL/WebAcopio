import { useEffect, useState } from "react";
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, InputTextCustom, SectionFilter
} from "../../../../components/common"
import { ESTADO_BASIC } from "../../../../components/mocks/DataList"
import { searchTypeUser } from "../../../../services/tipousuario"
import { formatterDataCombo } from "../../../../utils"

export function UserFilter({onUserValues}) {
  const [nameFilter, setNameFilter] = useState('')
  const [userNameFilter, setUserNameFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [tipoUsuarioFilter, setTipoUsuarioFilter] = useState('')
  const [tipoUsuarioList, setTipoUsuarioList] = useState([])

  useEffect(() => {
    getTipoUsuarioList()
  },[])
  const getTipoUsuarioList = async() => {
    var tipos = await searchTypeUser({name:'',estado:true})
    const formatter= tipos?.map(tipo =>(
      formatterDataCombo(tipo.tipoUsuarioId, tipo.tipoUsuarioNombre)))
    setTipoUsuarioList(formatter)
  }

  const handleSelectionChangeTipoUsuario = (option) => {
    if(option==''|| isNaN(option)) return setTipoUsuarioFilter('')
    setTipoUsuarioFilter(option)
  }
  const handleEstadoChange= (option) => {
    if(option==''|| isNaN(option)) return setEstadoFilter('')
    setEstadoFilter(option == 2 ? false: true)
  }
  const sendDataToParent = (event) => {
    event.preventDefault()
    onUserValues({typeUserId: tipoUsuarioFilter, name:nameFilter,
      userName:userNameFilter, estado:estadoFilter})
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'TipoUsuarioEstadoFilter'} name={'Tipo Usuario'}>
        <ComboBoxCustom initialOptions={tipoUsuarioList} disabled={false}
          onSelectionChange={handleSelectionChangeTipoUsuario}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"} />
      </FilterOption>
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