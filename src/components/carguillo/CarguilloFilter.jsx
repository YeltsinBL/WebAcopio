import React, { useEffect, useState } from 'react'
import SectionFilter from '../common/SectionFilter'
import FilterOption from '../common/FilterOption'
import ComboBox from '../asignatierra/Combobox'
import { getCarguilloTipoList } from '../../services/carguillo'
import ButtonCustom from '../common/ButtonCustom'

const CarguilloFilter = ({onFiltersValue}) => {
  const [carguilloTipo, setCarguilloTipo] = useState('')
  const [carguilloTitular, setCarguilloTitular] = useState('')
  const [carguilloEstado, setCarguilloEstado] = useState('')

  const [carguilloTipoList, setCarguilloTipoList] = useState([])
  const [carguilloEstadoList, setCarguilloEstadoList] = useState([])

  useEffect(() => {
    getCaguilloLists()
    setCarguilloEstadoList(
      [{id:1, uc:'Activo'},
      {id:2, uc:'Deshabilitado'}])
  },[])
  const getCaguilloLists = async(value) =>{
    const tipos = await getCarguilloTipoList(value)
    const formatter = tipos?.map(tipo =>({
      id: tipo.carguilloTipoId,
      uc: tipo.carguilloTipoDescripcion
    }))
    setCarguilloTipoList(formatter)
  }
  const handleCarguilloTipoChange= (option) => {
    setCarguilloTipo(option)
  }
  const handleCarguilloEstadoChange= (option) => {
    setCarguilloEstado(option)
  }
  const handleSeachCarguillo=(e) => {
    e.preventDefault()
    onFiltersValue({
      tipoCarguilloId: (carguilloTipo==''|| isNaN(carguilloTipo))?'':carguilloTipo, 
      titular: carguilloTitular, 
      estado: (carguilloEstado==''|| isNaN(carguilloEstado))?'':carguilloEstado
    })
  }

  return (
    <SectionFilter>
      <FilterOption htmlFor={"CarguilloTipoFilter"} name={"Tipo Carguillo"}>
        <ComboBox initialOptions={carguilloTipoList} disabled={false}
          onSelectionChange={handleCarguilloTipoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'CarguilloTitularFilter'} name={'Titular'} type={'text'}
      placeholder={'Ejm: Transportista 1'} value={carguilloTitular} onChange={setCarguilloTitular}/>
      <FilterOption htmlFor={'CarguilloEstadoFilter'} name={'Estado'}>
        <ComboBox initialOptions={carguilloEstadoList} disabled={false}
          onSelectionChange={handleCarguilloEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo} />
    </SectionFilter>
  )
}

export default CarguilloFilter