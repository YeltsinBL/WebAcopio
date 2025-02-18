import { Edit } from "lucide-react"
import { NoRegistros, Table, TableButton, TableTd } from "~components/common"

export const FacturaVentaTable = ({data, onRowSelect, onDeleteSelect}) => {
  const headers = ['Fecha', 'N° Factura', 'Cantidad', 'Unidad Medida',
    'Importe Total', 'Detracción', 'Pendiente Pago','Estado','Acciones']
  return (
    <Table nameTitle={"Lista de Facturación Venta"} headers={headers} >
      {data.length > 0 ? (
        data.map((factura) => (
          <tr key={factura.facturaVentaId} >
            <TableTd hidden>{factura.facturaVentaId}</TableTd>
            <TableTd>{factura.facturaVentaFecha}</TableTd>
            <TableTd>{factura.facturaNumero}</TableTd>
            <TableTd>{factura.facturaCantidad}</TableTd>
            <TableTd>{factura.facturaUnidadMedida}</TableTd>
            <TableTd>{factura.facturaImporteTotal}</TableTd>
            <TableTd>{factura.facturaDetraccion}</TableTd>
            <TableTd>{factura.facturaPendientePago}</TableTd>
            <TableTd>{factura.facturaVentaEstado}</TableTd>
            <TableTd>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={() => onRowSelect(factura)} >
                <Edit size={18} />
              </TableButton>
              {/* {factura.facturaStatus  &&
                <TableButton className='text-red-400 hover:text-red-300'
                  onRowSelect={() => onDeleteSelect(factura)} >
                  <Trash2 size={18} />
                </TableButton> } */}
            </TableTd>
          </tr>
        ))
      ): ( <NoRegistros colSpan={headers.length }/> )}
    </Table>
  )
}
