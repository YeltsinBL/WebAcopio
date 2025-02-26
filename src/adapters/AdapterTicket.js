import { 
  convertirFechaDDMMYYYY, convertirFechaToYMD, FormatteDecimalMath 
} from "~utils/index"

export const TicketAdapterList =(tickets) =>{
  return tickets.map(ticket =>{
    return {...ticket, 
      ticketFecha: convertirFechaDDMMYYYY(convertirFechaToYMD(ticket.ticketFecha)),
      ticketCamionPeso : FormatteDecimalMath(ticket.ticketCamionPeso, 3),
      ticketVehiculoPeso : FormatteDecimalMath(ticket.ticketVehiculoPeso, 3),
      ticketPesoBruto : FormatteDecimalMath(ticket.ticketPesoBruto, 3)
    }
  })
}