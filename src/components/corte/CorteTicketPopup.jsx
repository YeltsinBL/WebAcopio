import React, { useEffect, useState } from 'react'
import Table from '../common/Table'
import { NoRegistros } from '../common/NoRegistros'
import { TICKET_DATA } from '../mocks/DataList'
import Footer from '../common/Footer'
import FooterButton from '../common/FooterButton'

const CorteTicketPopup = ({onShowModel, headers}) => {
  const [ticketList, setTICKET_DATA] = useState([])
  useEffect(()=> {
    setTICKET_DATA(TICKET_DATA)
  }, [])
  const handleCancelar = (e) => {
    e.preventDefault()
    onShowModel({ id: 100, ingenio:'Casa Grande',fecha: '01/12/2024', viaje: '508692', transportista:'Representante SHEFA', chofer: 'TERCERO',      camion: "PE-Z3S930", caminoPeso: 19.590, vehiculo: 'PE-Z3S930', vehiculoPeso: 31.860, unidadPeso:'Kg', pesoBruto: 51.450, estado: 'Activo' },
    )
  }
  return (
    <>
      <div
        className="justify-center items-center md:flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-bold text-[#313395]">
              Lista de Tickets Activos
            </h3>
          </div>
          {/*body*/}
          <div className='pl-6 pr-6'>
            <div className="overflow-auto max-h-[350px] rounded-xl">
              <table className="w-auto table-auto md:w-full divide-y divide-gray-700 ">
                <thead className="bg-gray-800  sticky top-0 z-10">
                  <tr>
                    { headers.map((header, index) => (
                      <th key={index} className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${header =='ID' ? 'hidden':''}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                  {ticketList ? (
                    ticketList.map((ticket) => (
                      <tr key={ticket.id} >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center hidden'>
                            {ticket.id}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.ingenio}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.viaje}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.fecha.toLocaleDateString('es-PE')}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.transportista}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.camion}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.camionPeso}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.vehiculo}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.vehiculoPeso}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.pesoBruto}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                            {ticket.estado}
                        </td>
                      </tr>
                    ))
                  ): ( <NoRegistros /> )}
                </tbody>
              </table>
            </div>
          </div>
          {/*footer*/}
          <Footer>
            <FooterButton name={'Guardar'} accion={handleCancelar}/>
            <FooterButton name={'Cancelar'} accion={handleCancelar}/>
          </Footer>
        </div>
      </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default CorteTicketPopup