import { Edit } from "lucide-react"
import { 
  NoRegistros, Table, TableButton, TableTd 
} from "~components/common"

export const TesoreriaTable = ({data, onRowSelect}) => {
  const headers =['Fecha', 'Sembrador', 'UT', 'Campo', 'Monto','Pagado','Pendiente', 'Acciones']
  return (
    <Table nameTitle={'Lista de Liquidación de Pago'} headers={headers}>
     { data.length > 0 ? (
        data.map((tesoreria) =>(
          <tr key={tesoreria.tesoreriaId}>
            <TableTd hidden>{ tesoreria.tesoreriaId }</TableTd>
            <TableTd>{ tesoreria.tesoreriaFecha }</TableTd>
            <TableTd>{ tesoreria.personaNombre }</TableTd>
            <TableTd>{ tesoreria.proveedorUT }</TableTd>
            <TableTd>{ tesoreria.tierraCampo }</TableTd>
            <TableTd>{ tesoreria.tesoreriaMonto }</TableTd>
            <TableTd>{ tesoreria.tesoreriaPagado }</TableTd>
            <TableTd>{ tesoreria.tesoreriaPendientePagar }</TableTd>
            <TableTd>
              <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                onRowSelect={()=>onRowSelect(tesoreria)}>
                <Edit size={18} />
              </TableButton>
            </TableTd>
          </tr>
        ))
     ):(<NoRegistros colSpan={headers.length} />)}
    </Table>
  )
}