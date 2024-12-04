import React, { useEffect, useState } from 'react'
import SectionFilter from '../common/SectionFilter'
import FilterOption from '../common/FilterOption'
import ButtonCustom from '../common/ButtonCustom'
import { searchTierrasAvailable } from '../../services/tierra'
import ComboBox from '../asignatierra/Combobox'
import { CORTEEstado_DATA } from '../mocks/DataList'

const CorteFilter = ({onFiltersValue}) => {
  const [ucFilter, setUcFilter] = useState('')
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  const [ucLista, setUcLista] = useState([])
  const [estadoLista, setEstadoLista] = useState([])

  useEffect(()=> {
    getListUC()
  })
  const getListUC = async() => {
    const ucs = await searchTierrasAvailable()
    const formatter= ucs?.map(tipo =>({
        id: tipo.id,
        uc:tipo.uc
      }))
    setUcLista(formatter)

    const estados = CORTEEstado_DATA
    const formatterEstados= estados?.map(tipo =>({
        id: tipo.id,
        uc:tipo.descripcion
    }))
    setEstadoLista(formatterEstados)
  }
  const handleSelectionChange = (option) => {
    setUcFilter(option)
  }
  const handleSelectionChangeEstado = (option) => {
    setEstadoFilter(option)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue({
        uc:(ucFilter==''|| isNaN(ucFilter))?'':ucFilter, 
        fechaDesde:fechaDesdeFilter, fechaHasta:fechaHastaFilter, 
        estado:(estadoFilter==''|| isNaN(estadoFilter))?'':estadoFilter}
    )
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'UCFilter'} name={'UC'} >
        <ComboBox  initialOptions={ucLista} disabled={false}
          onSelectionChange={handleSelectionChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'FechaDesdeFilter'} name={'Fecha Desde'} type={'date'}
        placeholder={'Ejm: 20/11/2024'} value={fechaDesdeFilter} onChange={setFechaDesdeFilter}/>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'} type={'date'}
        placeholder={'Ejm: 20/11/2024'} value={fechaHastaFilter} onChange={setFechaHastaFilter}/>
      <FilterOption htmlFor={'EstadoFilter'} name={'Estado'} >
        <ComboBox  initialOptions={estadoLista} disabled={false}
          onSelectionChange={handleSelectionChangeEstado}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSearch}/>
    </SectionFilter>
  )
}

export default CorteFilter