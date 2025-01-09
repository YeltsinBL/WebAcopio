import React, { useEffect, useState } from 'react'
import { getCarguilloTipoList } from '../../../../services/carguillo'
import { formatterDataCombo } from '../../../../utils'
import { 
  ButtonCustom, ComboBoxCustom, FilterOption, SectionFilter
} from '../../../../components/common'
//import { ESTADO_BASIC } from '../../../../components/mocks/DataList'

const CarguilloFilter = ({onFiltersValue}) => {
  const [carguilloTipo, setCarguilloTipo] = useState('')
  const [carguilloTitular, setCarguilloTitular] = useState('')
  //const [carguilloEstado, setCarguilloEstado] = useState('')

  const [carguilloTipoList, setCarguilloTipoList] = useState([])

  useEffect(() => {
    getCaguilloLists()
  },[])
  const getCaguilloLists = async(value) =>{
    const tipos = await getCarguilloTipoList(value)
    const formatter = tipos?.map(tipo =>(formatterDataCombo(tipo.carguilloTipoId,tipo.carguilloTipoDescripcion)))
    setCarguilloTipoList(formatter)
  }
  const handleCarguilloTipoChange= (option) => 
    setCarguilloTipo((option==''|| isNaN(option))?'':option)
  
  // const handleCarguilloEstadoChange= (option) => 
  //   setCarguilloEstado((option==''|| isNaN(option))?'':option)
  
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