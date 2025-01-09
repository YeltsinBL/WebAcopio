import { Edit } from 'lucide-react'
import { 
  NoRegistros, Table , TableButton, TableTd 
} from '../../../../components/common'

const CarguilloTable = ({data, onRowSelect}) => {
  const headers = ['Tipo', 'Titular', 'Estado', 'Acciones']
  return (
    <Table nameTitle={'Lista de Carguillos'} headers={headers}> 
      {data.length > 0 ? (
        data.map((carguillo) => (
          <tr key={carguillo.carguilloId}>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center hidden'>
              {carguillo.carguilloId}
            </td>
            <TableTd>{carguillo.carguilloTipoDescripcion }</TableTd>
            <TableTd>{carguillo.carguilloTitular}</TableTd>
            <TableTd>{carguillo.carguilloEstado ? 'Activo': 'Inactivo'}</TableTd>
            <TableTd>
              <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                onRowSelect={()=>onRowSelect(carguillo)}>
                <Edit size={18} />
              </TableButton>
              </TableTd>
          </tr>
        ))
      ):(<NoRegistros colSpan={headers.length -1}/>)}
    </Table>
  )
}

export default CarguilloTable
