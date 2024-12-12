import React, { useEffect, useState } from 'react'
import SectionFilter from '../common/SectionFilter'
import FilterOption from '../common/FilterOption'
import ButtonCustom from '../common/ButtonCustom'
import ComboBoxCustom from "../common/ComboBoxCustom"
import { searchCorteEstados } from '../../services/corte'
import { searchAsignaTierra } from '../../services/asignartierra'
import { formatterDataCombo } from '../common/FormatteData'

const CorteFilter = ({onFiltersValue}) => {
  const [ucFilter, setUcFilter] = useState('')
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  const [ucLista, setUcLista] = useState([])
  const [estadoLista, setEstadoLista] = useState([])

  useEffect(()=> {
    getListCombos()
  },[])
  const getListCombos = async() => {
    const ucs = await searchAsignaTierra({})
    const formatter= ucs?.map(tipo =>
      (formatterDataCombo(tipo.tierraId,tipo.uc)))
    setUcLista(formatter)

    const estados = await searchCorteEstados()
    const formatterEstados= estados?.map(tipo =>
      (formatterDataCombo(tipo.corteTipoId,tipo.corteDescripcion)))
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
      tierraId:(ucFilter==''|| isNaN(ucFilter))?'':ucFilter, 
        fechaDesde:fechaDesdeFilter, fechaHasta:fechaHastaFilter, 
        estadoId:(estadoFilter==''|| isNaN(estadoFilter))?'':estadoFilter}
    )
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'UCFilter'} name={'UC'} >
        <ComboBoxCustom  initialOptions={ucLista} disabled={false}
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
        <ComboBoxCustom  initialOptions={estadoLista} disabled={false}
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