import React, { useEffect, useState } from 'react'
import { 
  ButtonCustom, InputDateCustom, FilterOption, SectionFilter, ComboBoxCustom 
} from '../../../../components/common'
import { useFetchData } from '../../../../hooks/common'
import { formatterDataCombo } from '../../../../utils'

export const RecojoFilter = ({onFiltersValue}) => {
  const [recojoEstadoList, setRecojoEstadoList] = useState([])
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  const { data } = useFetchData()

  useEffect(()=>{
    if(data) getTicketEstados()
  }, [data])

  const getTicketEstados = async() => {
    const formatter= data?.map(tipo =>(
      formatterDataCombo(tipo.recojoEstadoId, tipo.recojoEstadoDescripcion)))
    setRecojoEstadoList(formatter)
  }
  const handleSelectionChange = (option) =>
    setEstadoFilter((option==''|| isNaN(option))?'':option)
  
  const handleSeachCarguillo = (e) =>{
    e.preventDefault()
    onFiltersValue({
      fechaDesdeFilter, fechaHastaFilter, estadoFilter
    })
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaInicioFilter'} name={'Fecha Desde'}>
        <InputDateCustom fechaValue={fechaDesdeFilter} 
          setFechaValue={setFechaDesdeFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'}>
        <InputDateCustom fechaValue={fechaHastaFilter} 
          setFechaValue={setFechaHastaFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'RecojoEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom  initialOptions={recojoEstadoList} disabled={false}
          onSelectionChange={handleSelectionChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo}/>
    </SectionFilter>
  )
}
