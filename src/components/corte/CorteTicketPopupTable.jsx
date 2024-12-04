import React from 'react'
import { NoRegistros } from '../common/NoRegistros'

const CorteTicketPopupTable = ({headers, ticketList, handleCheckboxChange}) => {
  return (
    <div className='pl-6 pr-6'>
      <div className="overflow-auto max-h-[350px] rounded-xl">
        <table className="w-auto table-auto md:w-full divide-y divide-gray-700 ">
          <thead className="bg-gray-800  sticky top-0 z-10">
            <tr>
              <th>
                Seleccionar
              </th>
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
                  <td>
                    <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(ticket)}
                    />
                  </td>
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
                </tr>
              ))
            ): ( <NoRegistros /> )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CorteTicketPopupTable