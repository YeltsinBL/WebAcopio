import { Edit, RefreshCcw, Trash2 } from "lucide-react";
import { 
  NoRegistros, Table, TableButton, TableTd
} from "../../../../components/common";

export function UserTable({data, onRowSelect, onDelete, onResetPassword}) {
  const header = ['Tipo Usuario', 'DNI', 'Nombre', 'Usuario','Activo', 'Acciones']
  return (
    <Table nameTitle={'Lista de Usuarios'} headers={header}>
      {data.length >0 ?
        data.map((user) =>(
          <tr key={user.userId}>
            <TableTd hidden>{user.userId}</TableTd>
            <TableTd>{user.typePersonName}</TableTd>
            <TableTd>{user.personDNI}</TableTd>
            <TableTd>{user.personName}</TableTd>
            <TableTd>{user.userName}</TableTd>
            <TableTd>{user.userStatus ? 'Activo':'Inactivo'}</TableTd>
            <TableTd>
		      <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
		  	    onRowSelect={()=>onRowSelect(user)}>
		  	    <Edit size={18} />
		      </TableButton>
		      { user.userStatus && (
		  	  <TableButton className={'text-red-400 hover:text-red-300 px-3'} 
		  	    onRowSelect={()=>onDelete(user)}>
		  	    <Trash2 size={18} />
		  	  </TableButton>
		      )}
          { user.userStatus && !user.userResetPassword && (
		  	  <TableButton className={'text-green-400 hover:text-green-300 '} 
		  	    onRowSelect={()=>onResetPassword(user)}>
		  	    <RefreshCcw size={18} />
		  	  </TableButton>
		      )}
          
		    </TableTd>
          </tr>
        )):( <NoRegistros colSpan={header.length}/>)
      }
    </Table>
  )
}
