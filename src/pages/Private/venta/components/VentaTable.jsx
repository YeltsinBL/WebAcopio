import { Edit, Trash2 } from "lucide-react"
import { NoRegistros, Table, TableButton, TableTd } from "~components/common"

export const VentaTable = ({data, onRowSelect, onDeleteSelect}) => {
  const headers = ['Fecha', 'Tipo Venta', 'N° Comprobante', 'Cliente',
    'Total', 'Estado', 'Acciones']
  return (
    <Table nameTitle={"Lista de Venta"} headers={headers} >
      {data.length > 0 ? (
        data.map((venta) => (
          <tr key={venta.ventaId} >
            <TableTd hidden>{venta.ventaId}</TableTd>
            <TableTd>{venta.ventaFecha}</TableTd>
            <TableTd>{venta.ventaTipoNombre}</TableTd>
            <TableTd>{venta.ventaNumeroDocumento}</TableTd>
            <TableTd>{venta.personaNombre}</TableTd>
            <TableTd>{venta.ventaTotal}</TableTd>
            <TableTd>{venta.ventaEstadoNombre}</TableTd>
            <TableTd>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={() => onRowSelect(venta)} >
                <Edit size={18} />
              </TableButton>
              {venta.ventaEstadoNombre =='Activo' &&
                <TableButton className='text-red-400 hover:text-red-300'
                  onRowSelect={() => onDeleteSelect(venta)} >
                  <Trash2 size={18} />
                </TableButton> }
            </TableTd>
          </tr>
        ))
      ): ( <NoRegistros colSpan={headers.length }/> )}
    </Table>
  )
}