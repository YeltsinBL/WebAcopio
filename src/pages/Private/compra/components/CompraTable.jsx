import { Edit, Trash2 } from "lucide-react"
import { NoRegistros, Table, TableButton, TableTd } from "~components/common"

export const CompraTable = ({data, onRowSelect, onDeleteSelect}) => {
  const headers = ['Fecha', 'Tipo Comprobante', 'N° Comprobante', 
        'Total', 'Estado', 'Acciones']
  return (
    <Table nameTitle={"Lista de Compra"} headers={headers} >
      {data.length > 0 ? (
        data.map((compra) => (
          <tr key={compra.compraId} >
            <TableTd hidden>{compra.compraId}</TableTd>
            <TableTd>{compra.compraFecha}</TableTd>
            <TableTd>{compra.tipoComprobanteDescripcion}</TableTd>
            <TableTd>{compra.compraNumeroComprobante}</TableTd>
            <TableTd>{compra.compraTotal}</TableTd>
            <TableTd>{compra.compraEstado}</TableTd>
            <TableTd>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={() => onRowSelect(compra)} >
                <Edit size={18} />
              </TableButton>
              {compra.compraStatus ?
                <TableButton className='text-red-400 hover:text-red-300'
                  onRowSelect={() => onDeleteSelect(compra)} >
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