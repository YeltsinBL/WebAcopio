import { NoRegistros, Table, TableButton, TableTd} from '../../../../components/common'
import { Edit, Trash2 } from 'lucide-react'

export const TicketTable = ({TICKET_DATA, onRowSelect, onDeleteSelect}) => {
  const headers = ['Ingenio', 'Campo','Viaje', 'Fecha', 'Transportista', 'Camión', 
      'Vehículo', 'Peso Bruto', 'Estado', 'Acciones']
  return (
  <Table nameTitle={"Lista de Tickets"} headers={headers} >
	{TICKET_DATA.length > 0 ? (
	  TICKET_DATA.map((ticket) => (
        <tr key={ticket.ticketId} >
          <TableTd hidden>{ticket.ticketId}</TableTd>
          <TableTd>{ticket.ticketIngenio}</TableTd>
          <TableTd>{ticket.ticketCampo}</TableTd>
          <TableTd>{ticket.ticketViaje}</TableTd>
          <TableTd>{ticket.ticketFecha}</TableTd>
          <TableTd>{ticket.ticketTransportista}</TableTd>
          <TableTd>{ticket.ticketCamion}</TableTd>
          <TableTd>{ticket.ticketVehiculo}</TableTd>
          <TableTd>{ticket.ticketPesoBruto}</TableTd>
          <TableTd>{ticket.ticketEstadoDescripcion}</TableTd>
          <TableTd>
            <TableButton className="text-blue-500 hover:text-blue-700 px-3"
              onRowSelect={() => onRowSelect(ticket)} >
              <Edit size={18} />
            </TableButton>
            {ticket.ticketEstadoDescripcion == 'Activo'?
              <TableButton className='text-red-400 hover:text-red-300'
                onRowSelect={() => onDeleteSelect(ticket)} >
                <Trash2 size={18} />
              </TableButton> 
            :''}
          </TableTd>
        </tr>
	  ))
    ): ( <NoRegistros colSpan={headers.length }/> )}
  </Table>
	)
}
