
import { Edit, Trash2 } from "lucide-react"
import { NoRegistros, Table, TableButton, TableTd } from "../../../../components/common"
import { ExpendableButton } from "../../../../components/common/ExpendableButton"
import useOpenController from "../../../../hooks/common/useOpenFileTable"

export const ProveedorTable = ({PROVEEDOR_DATA, onRowSelect, eliminarProducto}) => {
  const header = ['UT', 'DNI', 'Nombre', 'Activo', 'Actions']
  return (
	<Table nameTitle={'Lista de Proveedores'} headers={header}>
      { PROVEEDOR_DATA.length > 0 ?
	  PROVEEDOR_DATA.map((personDetails) => (
        <TableSection key={personDetails.proveedorId} personDetails={personDetails} onRowSelect={onRowSelect} eliminarProducto={eliminarProducto} />
	  )):(<NoRegistros  colSpan={header.length} />)}
    </Table>
  )
}

const TableSection = ({ personDetails, onRowSelect, eliminarProducto}) => {
	const { isOpen, toggle } = useOpenController(false);
	return (
	  <>
		<tr key={personDetails.proveedorId}>
		  <TableTd hidden={true}>{personDetails.proveedorId}</TableTd>
		  <TableTd>
			<ExpendableButton isOpen={isOpen} toggle={toggle} />		  
			<b>{personDetails.proveedorUT} </b>
		  </TableTd>
		  <TableTd></TableTd>
		  <TableTd></TableTd>
		  <TableTd>{personDetails.proveedorStatus ? 'Activo':'Inactivo'}</TableTd>
		  <TableTd>
		    <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
		  	onRowSelect={()=>onRowSelect(personDetails)}>
		  	  <Edit size={18} />
		    </TableButton>
		    { personDetails.proveedorStatus &&
		    (
		  	<TableButton className={'text-red-400 hover:text-red-300 '} 
		  	  onRowSelect={()=>eliminarProducto(personDetails.proveedorId)}>
		  	  <Trash2 size={18} />
		  	</TableButton>
		    )}
		  </TableTd>
		</tr>
		{isOpen && <TableRow personDetails={personDetails} />}
	  </>
	);
  };
  const TableRow = ({ personDetails }) => {
	return (
	  <>
		{personDetails.personas.map((detail, index) => (
		  <tr key={`${personDetails.proveedorUT}_${index}`}>
		    <TableTd>{personDetails.proveedorUT}</TableTd>
			<TableTd>{detail.personDNI}</TableTd>
			<TableTd>{detail.proveedorNombre}</TableTd>
			<TableTd>{detail.proveedorPersonStatus ? 'Activo':'Inactivo'}</TableTd>
			<TableTd></TableTd>
		  </tr>
		))}
	  </>
	);
  };
  
