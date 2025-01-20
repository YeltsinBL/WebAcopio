import { useEffect, useState } from "react";
import { liquidacionEstadosList } from "../../services/liquidacion";
import { ButtonCustom, ComboBoxCustom, FilterOption, InputDateCustom, SectionFilter } from "../common";
import { formatterDataCombo } from "../../utils";
import { searchAsignaTierra } from "~services/asignartierra";

export function LiquidacionFilter({onFiltersValue}) {
  const [utList, setUtList] = useState([])
  const [liquidacionEstadoList, setLiquidacionEstadoList] = useState([])
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [utFilter, setUtFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  useEffect(()=>{
    getUts()
    getTicketEstados()
  }, [])

  const getUts = async() => {
    const uts = await searchAsignaTierra()
    const formatter= uts?.map(ut =>(
      formatterDataCombo(ut.asignarTierraProveedorId, ut.asignarTierraProveedorUT)))
    setUtList(formatter)
    
  }
  const getTicketEstados = async() => {
    const estados = await liquidacionEstadosList()
    const formatter= estados?.map(estado =>(
      formatterDataCombo(estado.estadoId, estado.estadoDescripcion)))
    setLiquidacionEstadoList(formatter)
  }
  const handleSelectionUTChange = (option) =>{
    setUtFilter(option)
  }
  const handleSelectionEstadoChange = (option) =>{
    setEstadoFilter(option)
  }
  const handleSeachCarguillo = (e) =>{
    e.preventDefault()
    onFiltersValue({
      fechaDesdeFilter, fechaHastaFilter,
      utFilter:(utFilter==''|| isNaN(utFilter))?'':utFilter,
      estadoFilter:(estadoFilter==''|| isNaN(estadoFilter))?'':estadoFilter
    })
  }
  return (
    <SectionFilter>
      <FilterOption htmlFor={'FechaDesdeFilter'} name={'Fecha Desde'}>
        <InputDateCustom fechaValue={fechaDesdeFilter} 
          setFechaValue={setFechaDesdeFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'FechaHastaFilter'} name={'Fecha Hasta'}>
        <InputDateCustom fechaValue={fechaHastaFilter} 
          setFechaValue={setFechaHastaFilter}/>
      </FilterOption>
      <FilterOption htmlFor={'UtFilter'} name={'UT'}>
        <ComboBoxCustom  initialOptions={utList} disabled={false}
          onSelectionChange={handleSelectionUTChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <FilterOption htmlFor={'RecojoEstadoFilter'} name={'Estado'}>
        <ComboBoxCustom  initialOptions={liquidacionEstadoList} disabled={false}
          onSelectionChange={handleSelectionEstadoChange}
          className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
          colorOptions={"text-black"}
        />
      </FilterOption>
      <ButtonCustom extraClassName={'mt-6 md:w-28'} name={'Buscar'} onClick={handleSeachCarguillo}/>
    </SectionFilter>
  )
}