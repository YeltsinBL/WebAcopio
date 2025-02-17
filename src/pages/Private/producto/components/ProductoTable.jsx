import { Edit, Trash2 } from "lucide-react"
import { 
  NoRegistros, TableBodyCustom, TableButton, TableContainerCustom, 
  TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
export const ProductoTable = ({data, onRowSelect, onDelete}) => {
  const header = ['Tipo','Producto', 'Stock', 'Precio Venta', 'Activo', 'Acciones']

  return (
    <TableContainerCustom>
      <TableHeaderCustom grid>
        <TitleCustom titulo={'Lista de Productos'} />

      </TableHeaderCustom>
      <TableBodyCustom headers={header}>
        {data.length >0 ?
          data.map((user) =>(
          <tr key={user.productoId}>
          <TableTd hidden>{user.productoId}</TableTd>
          <TableTd>{user.productoTipoDetalle}</TableTd>
          <TableTd>{user.productoNombre}</TableTd>
          <TableTd>{user.productoStock}</TableTd>
          <TableTd>{user.productoPrecioVenta}</TableTd>
          <TableTd>{user.productoStatus ? 'Activo':'Inactivo'}</TableTd>
          <TableTd>
          <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
              onRowSelect={()=>onRowSelect(user)}>
              <Edit size={18} />
          </TableButton>
          { user.productoStatus && (
          <TableButton className={'text-red-400 hover:text-red-300 '} 
              onRowSelect={()=>onDelete(user)}>
              <Trash2 size={18} />
          </TableButton>
          )}
          </TableTd>
          </tr>
          )):( <NoRegistros colSpan={header.length}/>)
        }        
      </TableBodyCustom>
    </TableContainerCustom>
  )
}