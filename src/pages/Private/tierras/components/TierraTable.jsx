
import { Edit, Trash2 } from "lucide-react"
import { 
	NoRegistros, Table,
	TableButton,
	TableTd
} from "../../../../components/common"

export const TierrasTable = ({TIERRA_DATA, onRowSelect, eliminarTierra}) => {
const header = ['UC', 'Campo', 'Sector','Valle','H.A.', 'Activo', 'Actions']
  return (
	<Table nameTitle={'Lista de Tierras'} headers={header}>
	  {TIERRA_DATA?.length > 0 ? (
	  	TIERRA_DATA.map((tierra) => (
	  	<tr key={tierra.tierraId} >
		  <TableTd hidden>{tierra.tierraId}</TableTd>
		  <TableTd>{tierra.tierraUc}</TableTd>
		  <TableTd>{tierra.tierraCampo}</TableTd>
		  <TableTd>	{tierra.tierraSector}</TableTd>
		  <TableTd>	{tierra.tierraValle}</TableTd>
		  <TableTd>	{tierra.tierraHa}</TableTd>
		  <TableTd>	{tierra.tierraStatus ? "Activo" : "Inactivo"}
		  </TableTd>
		  <TableTd>
		  	<TableButton className="text-blue-500 hover:text-blue-700 px-3"
		  	  onRowSelect={() => onRowSelect(tierra)} >
		  	  <Edit size={18} />
		  	</TableButton>
			{tierra.tierraStatus ? (
		  	<TableButton className='text-red-400 hover:text-red-300' 
		  	  onRowSelect={() => {eliminarTierra(tierra)}}>
		  	  <Trash2 size={18} />
		  	</TableButton>
			):('')}
		  </TableTd>
	  	</tr>
	  	))
	  ): (<NoRegistros colSpan={header.length} />)}
	</Table>
  )
}
