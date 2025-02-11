import { Edit, Trash2 } from "lucide-react"
import { ExcelIcon, PDFIcon } from "~assets/icons"
import { NoRegistros, Table, TableButton, TableTd } from "~components/common"

export const VentaTable = ({data, onRowSelect, onDeleteSelect, exportExcel, exportPdf}) => {
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
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={()=>exportExcel(venta.ventaId)} >
                <ExcelIcon />
              </TableButton>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={()=>exportPdf(venta.ventaId)} >
                <PDFIcon />
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