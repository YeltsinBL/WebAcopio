import { Edit, Trash2 } from "lucide-react"
import { ExcelIcon, PDFIcon } from "~assets/icons"
import { NoRegistros, Table, TableButton, TableTd } from "~components/common"

export const InformeIngresoGastoTable = ({data, onRowSelect, onDeleteSelect, exportExcel, exportPdf}) => {
  const headers = ['Fecha', 'Sembrador', 'Campo', 'Factura Total',
      'Costos Total', 'Utilidad', 'Estado', 'Acciones']
  return (
    <Table nameTitle={"Lista de Informa de Ingresos y Gastos"} headers={headers} >
      {data.length > 0 ? (
        data.map((informe) => (
          <tr key={informe.informeId} >
            <TableTd hidden>{informe.informeId}</TableTd>
            <TableTd>{informe.informeFecha}</TableTd>
            <TableTd>{informe.personaNombre}</TableTd>
            <TableTd>{informe.tierraCampo}</TableTd>
            <TableTd>{informe.informeFacturaTotal}</TableTd>
            <TableTd>{informe.informeCostoTotal}</TableTd>
            <TableTd>{informe.informeTotal}</TableTd>
            <TableTd>{informe.informeStatus}</TableTd>
            <TableTd>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={() => onRowSelect(informe)} >
                <Edit size={18} />
              </TableButton>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={()=>exportExcel(informe.informeId)} >
                <ExcelIcon />
              </TableButton>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={()=>exportPdf(informe.informeId)} >
                <PDFIcon />
              </TableButton>
              {informe.informeStatus =="Activo" &&
                <TableButton className='text-red-400 hover:text-red-300'
                  onRowSelect={() => onDeleteSelect(informe)} >
                  <Trash2 size={18} />
                </TableButton> }
            </TableTd>
          </tr>
        ))
      ): ( <NoRegistros colSpan={headers.length }/> )}
    </Table>
  )
}