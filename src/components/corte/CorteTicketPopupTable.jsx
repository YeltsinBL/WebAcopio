import { 
  NoRegistros, TableBodyCustom, TableTd 
} from '~components/common'

const CorteTicketPopupTable = ({headers, ticketList, handleCheckboxChange}) => {
  return (
      <TableBodyCustom headers={headers}>
        {ticketList ? (
          ticketList.map((ticket) => (
            <tr key={ticket.ticketId} >
              <TableTd hidden>{ticket.ticketId}</TableTd>
              <TableTd>{ticket.ticketIngenio}</TableTd>
              <TableTd>{ticket.ticketViaje}</TableTd>
              <TableTd>{ticket.ticketFecha}</TableTd>
              <TableTd>{ticket.ticketVehiculo}</TableTd>
              <TableTd>{ticket.ticketCamion}</TableTd>
              <TableTd>{ticket.ticketTransportista}</TableTd>
              <TableTd>{ticket.ticketVehiculoPeso}</TableTd>
              <TableTd>{ticket.ticketCamionPeso}</TableTd>
              <TableTd>{ticket.ticketPesoBruto}</TableTd>
              <TableTd>{ticket.ticketCampo}</TableTd>
              <TableTd>{ticket.ticketEstadoDescripcion}</TableTd>
              <TableTd>
                <input
                type="checkbox"
                onChange={() => handleCheckboxChange(ticket)}
                />
              </TableTd>
            </tr>
          ))
        ): ( <NoRegistros colSpan={headers.length} /> )}
      </TableBodyCustom>
  )
}

export default CorteTicketPopupTable