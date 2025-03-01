import { Edit, Trash2 } from 'lucide-react'
import { ExcelIcon, PDFIcon } from '~assets/icons'
import { NoRegistros, Table, TableButton, TableTd } from '~components/common'

export const CorteTable = ({CORTE_DATA, onRowSelect, onRowDelete, exportExcel, exporPdf}) => {
  const headers = ['Fecha', 'UC', 'Campo','Precio', 
    'Cant. Ticket ', 'Peso Bruto', 'total ', 'Estado', 'Acciones']
  return (
    <Table nameTitle={'Lista de Cortes'} headers={headers}> 
      {CORTE_DATA.length > 0 ? (
        CORTE_DATA.map((corte) => (
            <tr key={corte.corteId} >
              <TableTd hidden>{corte.corteId}</TableTd>
              <TableTd>{corte.corteFecha}</TableTd>
              <TableTd>{corte.tierraUC}</TableTd>
              <TableTd>{corte.tierraCampo}</TableTd>
              <TableTd>{corte.cortePrecio}</TableTd>
              <TableTd>{corte.corteCantidadTicket}</TableTd>
              <TableTd>{corte.cortePesoBrutoTotal}</TableTd>
              <TableTd>{corte.corteTotal}</TableTd>
              <TableTd>{corte.corteEstadoDescripcion}</TableTd>
              <TableTd>
                <TableButton
                  className="text-blue-500 hover:text-blue-700 px-3"
                  onRowSelect={()=>onRowSelect(corte)}
                >
                  <Edit size={18} />
                </TableButton>
                <TableButton
                  className="text-blue-500 hover:text-blue-700 px-3"
                  onRowSelect={()=>exportExcel(corte.corteId)}
                >
                  <ExcelIcon />
                </TableButton>
                <TableButton
                  className="text-blue-500 hover:text-blue-700 px-3"
                  onRowSelect={()=>exporPdf(corte.corteId)}
                >
                  <PDFIcon />
                </TableButton>
                { corte.corteEstadoDescripcion.toLowerCase() === 'activo' && 
                (
                  <TableButton 
                    className='text-red-400 hover:text-red-300'
                    onRowSelect={() => onRowDelete(corte)}
                  >
                    <Trash2 size={18} />
                  </TableButton>
                )}
               
              </TableTd>
            </tr>
          ))
      ):( <NoRegistros colSpan={headers.length } />)}
    </Table>
  )
}
