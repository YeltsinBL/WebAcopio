import React, { useEffect, useState } from 'react'
import { ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, SectionFilter } from '../common'
import { servicioTransporteEstadosList } from '../../services/serviciotransporte'
import { formatterDataCombo } from '../../utils'
import { searchCarguilloList } from '../../services/carguillo'

export const ServicioTransporteFilter = ({onFiltersValue}) => {
  const [estadoList, setEstadoList] = useState([])
  const [carguilloList, setCarguilloList] = useState([])
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [carguilloFilter, setCarguilloFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  useEffect(()=>{
    getEstados()
    getCarguillo()
  }, [])

  const getEstados = async()=>{
    const estados = await servicioTransporteEstadosList()
    const formatter= estados?.map(tipo =>(
      formatterDataCombo(tipo.estadoId, tipo.estadoDescripcion)))
    setEstadoList(formatter)
  }
  const getCarguillo = async() =>{
    const tipos = await searchCarguilloList({
        tipoCarguilloId: 2, titular:'', estado:1
    })
    const formatter = tipos?.map(tipo =>(
        formatterDataCombo(tipo.carguilloId,tipo.carguilloTitular)))
    setCarguilloList(formatter)
  }

  const handleSelectionCarguilloChange = (option) => setCarguilloFilter(option)
  const handleSelectionEstadoChange = (option) => setEstadoFilter(option)
  const handleSeachCarguillo = (e) =>{
    e.preventDefault()
    onFiltersValue({
      fechaDesdeFilter, fechaHastaFilter, 
      carguilloFilter: (carguilloFilter==''|| isNaN(carguilloFilter))?'':carguilloFilter,
      estadoFilter:(estadoFilter==''|| isNaN(estadoFilter))?'':estadoFilter
    })
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaInicioFilter'} name={'Fecha Inicio'}>
        <InputDateCustom fechaValue={fechaDesdeFilter} 
          setFechaValue={setFechaDesdeFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'FechaInicioFilter'} name={'Fecha Inicio'}>
        <InputDateCustom fechaValue={fechaHastaFilter} 
          setFechaValue={setFechaHastaFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'CarguilloFilter'} name={'Transportista'}>
        <ComboBoxCustom initialOptions={carguilloList} disabled={false}
          onSelectionChange={handleSelectionCarguilloChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'RecojoEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom initialOptions={estadoList} disabled={false}
          onSelectionChange={handleSelectionEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo}/>
    </SectionFilter>
  )
}
