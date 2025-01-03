import { Edit, Trash2 } from 'lucide-react'
import { NoRegistros, Table } from '../common'

export const CorteTable = ({CORTE_DATA, onRowSelect, onRowDelete}) => {
  const headers = ['Fecha', 'UC', 'Campo','Precio', 
    'Cant. Ticket ', 'Peso Bruto', 'total ', 'Estado', 'Acciones']
  return (
    <Table nameTitle={'Lista de Cortes'} headers={headers}> 
      {CORTE_DATA.length > 0 ? (
        CORTE_DATA.map((corte) => (
            <tr key={corte.id} >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center hidden'>
                  {corte.id}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.fecha.toLocaleDateString('es-PE')}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.uc}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.campo}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.precio}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.cantidadTicket}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.pesoBruto}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.total}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {corte.estado}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-30 '>
                <button
                  className="text-blue-500 hover:text-blue-700 px-3"
                  onClick={()=>onRowSelect(corte)}
                >
                  <Edit size={18} />
                </button>
                {/* <button className='text-red-400 hover:text-red-300'
                  onClick={() => onRowDelete(corte.id)}
                >
                  <Trash2 size={18} />
                </button> */}
              </td>
            </tr>
          ))
      ):( <NoRegistros colSpan={headers.length } />)}
    </Table>
  )
}
