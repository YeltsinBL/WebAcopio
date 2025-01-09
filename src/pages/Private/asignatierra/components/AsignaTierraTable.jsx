
import { Edit, Trash2 } from "lucide-react"
import { NoRegistros, Table, TableTd } from "../../../../components/common"

export const AsignaTierraTable = ({AsignaTierra_DATA, onRowSelect, eliminarAsigna}) => {
  const headers =['Fecha', 'UC', 'Campo', 'UT', 'Estado','Acciones']
  return (
	<Table nameTitle={'Lista de Tierras Asignadas'} headers={headers} >
	  {AsignaTierra_DATA?.length > 0 ? (
	  	AsignaTierra_DATA.map((asigna) => (
	  	<tr key={asigna.asignarTierraId} >
	  		<TableTd hidden>{asigna.asignarTierraId}</TableTd>
			<TableTd>{asigna.asignarTierraFecha}</TableTd>
	  		<TableTd>{asigna.asignarTierraTierraUC}</TableTd>
			<TableTd>{asigna.tierraCampo}</TableTd>
			<TableTd>{asigna.asignarTierraProveedorUT}</TableTd>
	  		<TableTd>{asigna.asignarTierraStatus ? "Activo" : "Inactivo"}</TableTd>
	  		<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-30 '>
	  			<button
	  				className="text-blue-500 hover:text-blue-700 px-3"
	  				onClick={() => onRowSelect(asigna)}
	  				>
	  				<Edit size={18} />
	  			</button>
	  			<button className='text-red-400 hover:text-red-300' 
	  				onClick={(e) => {
	  					e.preventDefault()
	  					eliminarAsigna(asigna)}
	  				}>
	  				<Trash2 size={18} />
	  			</button>
	  		</td>
	  	</tr>
	  	))
	  ): (<NoRegistros colSpan={headers.length} />)}
	</Table>
  )
}
