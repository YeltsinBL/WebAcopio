import React, { useEffect, useState } from 'react'
import { searchTicketsEstado } from '../../services/ticket'
import ComboBox from '../asignatierra/Combobox'

export const TicketFilter = ({onFiltersValue}) => {
  const [ingenioFilter, setIngenioFilter] = useState('')
  const [transportistaFilter, setTransportistaFilter] = useState('')
  const [viajeFilter, setviajeFilter] = useState('')
  const [fechaDesdeFilter, setFechaDesdeFilter] = useState('')
  const [fechaHastaFilter, setFechaHastaFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  
  const [ticketEstado, setTicketEstado] = useState([])

  useEffect(() => {
    getTicketEstados()
  }, [])
  const getTicketEstados = async() => {
    const estados = await searchTicketsEstado()
    const formatter= estados?.map(tipo =>({
        id: tipo.ticketEstadoId,
        uc:tipo.ticketEstadoDescripcion
      }))
    setTicketEstado(formatter)
  }
  const handleSelectionChange = (option) => {
    setEstadoFilter(option)
  };

  const handleSearch = (e) => {
    e.preventDefault()
    onFiltersValue({ingenio:ingenioFilter, transportista:transportistaFilter, viaje:viajeFilter, 
        fechaDesde: fechaDesdeFilter, fechaHasta: fechaHastaFilter, 
        estado:(estadoFilter==''|| isNaN(estadoFilter))?'':estadoFilter})
}
  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'>
		<form action="">
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 '>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="IngenioFilter" className="text-white">Ingenio</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ingrese el ingenio'
                        value={ingenioFilter}
                        onChange={(e) => setIngenioFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="TransportistaFilter" className="text-white">Transportista</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: Representaciones Shefa'
                        value={transportistaFilter}
                        onChange={(e) => setTransportistaFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="ViajeFilter" className="text-white">Viaje</label>
                    <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: 508689'
                        value={viajeFilter}
                        onChange={(e) => setviajeFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="FechaDesdeFilter" className="text-white">Fecha Desde</label>
                    <input type='date' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fechaDesdeFilter}
                        onChange={(e) => setFechaDesdeFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="FechaHastaFilter" className="text-white">Fecha Hasta</label>
                    <input type='date' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Ejm: 20/11/2024'
                        value={fechaHastaFilter}
                        onChange={(e) => setFechaHastaFilter(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 w-1/8'>
                    <label htmlFor="EstadoFilter" className="text-white">Estado</label>
                    <ComboBox  initialOptions={ticketEstado} disabled={false}
                      onSelectionChange={handleSelectionChange}
                      className={'bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500 '}
                      colorOptions={"text-black"}
                    />
                    {/* <input type='text' className='bg-transparent focus:outline-none w-full text-white border border-gray-300 rounded-md px-2 py-1 focus:border-blue-500'
                        name='query' placeholder='Selecciona un estado'
                        value={estadoFilter}
                        onChange={(e) => setEstadoFilter(e.target.value)}
                    /> */}
                </div>
                <button 
                    className="bg-[#313395] text-white active:bg-gray-700 hover:bg-gray-500 font-bold uppercase text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg outline-none 
                    mt-6 md:w-28  "
                    onClick={handleSearch}>
                    Buscar
                </button>
            </div>
        </form>
	</div>
  )
}
