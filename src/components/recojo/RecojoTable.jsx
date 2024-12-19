import { 
    NoRegistros, Table, TableButton, TableTd 
} from '../common'
import { Edit, Trash2 } from 'lucide-react'

export const RecojoTable = ({data, onRowSelect, onRowDelete}) => {
  const headers = ['Fecha Inicio', 'Fecha Final',
    'Precio Días', 'Precio Camión', 'Total', 'Estado', 'Acciones'
  ]
  return (
    <Table nameTitle={'Lista de Recojo'} headers={headers}>
      {data.length > 0 ? (
        data.map((recojo) => (
          <tr key={recojo.recojoId}>
            <TableTd hidden={true}>{recojo.recojoId}</TableTd>
            <TableTd>
              {recojo.recojoFechaInicio}
            </TableTd>
            <TableTd>
              {recojo.recojoFechaFin}
            </TableTd>
            <TableTd> {recojo.recojoDiasPrecio} </TableTd>
            <TableTd> {recojo.recojoCamionesPrecio} </TableTd>
            <TableTd> {recojo.recojoTotalPrecio} </TableTd> 
            <TableTd> {recojo.recojoEstadoDescripcion} </TableTd>
            <TableTd>
              <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                onRowSelect={()=>onRowSelect(recojo)}>
                <Edit size={18} />
              </TableButton>
              {
                recojo.recojoEstadoDescripcion.toLowerCase() =='anulado' ? '':
                (
                  <TableButton className={'text-red-400 hover:text-red-300 '} 
                    onRowSelect={()=>onRowDelete(recojo.recojoId)}>
                    <Trash2 size={18} />
                  </TableButton>
                )
              }
            </TableTd>
          </tr>
        ))
      ):(<NoRegistros colSpan={headers.length} />)}
    </Table>
  )
}
