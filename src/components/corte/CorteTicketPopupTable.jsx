import React from 'react'
import { NoRegistros } from '../common'

const CorteTicketPopupTable = ({headers, ticketList, handleCheckboxChange}) => {
  return (
    <div className='pl-6 pr-6'>
      <div className="overflow-auto max-h-[350px] ">
        <table className="w-auto table-auto md:w-full divide-y divide-gray-700 ">
          <thead className="bg-gray-900  sticky top-0 z-10">
            <tr>
              { headers.map((header, index) => (
                <th key={index} className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${header =='ID' ? 'hidden':''}`}>
                  {header}
                </th>
              ))}
              <th className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider`}>
                Seleccionar
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>
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
                  <td className=' px-14 py-4 whitespace-nowrap text-sm text-gray-300'>
                    <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(ticket)}
                    />
                  </td>
                </tr>
              ))
            ): ( <NoRegistros colSpan={headers.length} /> )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CorteTicketPopupTable