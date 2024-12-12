import React from 'react'
import { Edit } from 'lucide-react'
import { NoRegistros, Table } from '../common'

const CarguilloTable = ({data, onRowSelect}) => {
  const headers = ['id', 'Tipo', 'Titular', 'Estado', 'Acciones']
  return (
    <Table nameTitle={'Lista de Carguillos'} headers={headers}> 
      {data ? (
        data.map((carguillo) => (
          <tr key={carguillo.carguilloId}>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 gap-2 items-center '>
              {carguillo.carguilloId}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
              {carguillo.carguilloTipoDescripcion }
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
              {carguillo.carguilloTitular}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
              {carguillo.carguilloEstado ? 'Activo': 'Deshabilitado'}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-30 '>
                <button
                  className="text-blue-500 hover:text-blue-700 px-3"
                  onClick={()=>onRowSelect(carguillo)}
                >
                  <Edit size={18} />
                </button>
              </td>
          </tr>
        ))
      ):(<NoRegistros colSpan={headers.length -1}/>)}
    </Table>
  )
}

export default CarguilloTable
