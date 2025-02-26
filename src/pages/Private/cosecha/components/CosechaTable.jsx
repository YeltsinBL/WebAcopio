
import { Edit } from "lucide-react"
import { NoRegistros, Table, TableButton, TableTd } from "~components/common"
export const CosechaTable = ({Cosecha_DATA, onRowSelect}) => {
  const header = ['Fecha.', 'UC', 'Valle', 'Sector', 'UT', 'Campo', 'Activo', 'Acciones']
  
  return (
	<Table nameTitle={'Lista de Cosechas'} headers={header}>
	{Cosecha_DATA.length > 0 ? (
	  Cosecha_DATA.map((cosecha) => (
		<tr key={cosecha.cosechaId} >
		  <TableTd hidden>{ cosecha.cosechaId }</TableTd>
		  <TableTd>{ cosecha.cosechaFecha}</TableTd>
		  <TableTd>{ cosecha.cosechaTierraUC}</TableTd>
		  <TableTd>{ cosecha.cosechaTierraValle}</TableTd>
		  <TableTd>{ cosecha.cosechaTierraSector}</TableTd>
		  <TableTd>{ cosecha.cosechaProveedorUT}</TableTd>
		  <TableTd>{ cosecha.cosechaTierraCampo}</TableTd>
		  <TableTd>{ cosecha.cosechaCosechaTipo}</TableTd>
		  <TableTd>
		    <TableButton className="text-blue-500 hover:text-blue-700 px-3"
		  	onRowSelect={() => onRowSelect(cosecha)} >
		  	<Edit size={18} />
		    </TableButton>
		  </TableTd>
		</tr>
	  ))
	):(<NoRegistros colSpan={header.length} />)}
	</Table>
  )
}
