import React from 'react'
import Table from '../common/Table'
import { NoRegistros } from '../common/NoRegistros'
import { Edit, Trash2 } from 'lucide-react'

const TicketTable = ({TICKET_DATA, onRowSelect, onDeleteSelect}) => {
  const headers = ['ID', 'Ingenio', 'Viaje', 'Fecha', 'Transportista', 'Camión', 
      'Camión Peso', 'Vehículo', 'Vehículo Peso', 'Peso Bruto', 'Estado', 'Acciones']
  return (
  <Table nameTitle={"Lista de Tickets"} headers={headers} data={TICKET_DATA} rowKey={'id'} >
	{TICKET_DATA ? (
	  TICKET_DATA.map((ticket) => (
        <tr key={ticket.id} >
          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center '>
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
              {ticket.caminoPeso}
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
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-30 '>
          <button
              className="text-blue-500 hover:text-blue-700 px-3"
              onClick={() => onRowSelect(ticket)}
          >
              <Edit size={18} />
          </button>
          <button className='text-red-400 hover:text-red-300'
            onClick={() => onDeleteSelect(ticket.id)}
             >
              <Trash2 size={18} />
          </button>
          </td>
        </tr>
	  ))
    ): ( <NoRegistros /> )}
  </Table>
	)
}

export default TicketTable