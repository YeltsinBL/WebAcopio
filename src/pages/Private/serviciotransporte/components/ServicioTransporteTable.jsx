import { Edit, Trash2 } from 'lucide-react'
import { ExcelIcon, PDFIcon } from '~assets/icons'
import { 
  NoRegistros, Table, TableButton, TableTd 
} from '~components/common'

export const ServicioTransporteTable = ({data, onRowSelect, onRowDelete, exportExcel, exportPdf}) => {
  const headers =['Fecha', 'Transportista', 'Precio', 'Peso Bruto','Total', 'Estado', 'Acciones']
  return (
    <Table nameTitle={'Lista de Servicio Transporte'} headers={headers}>
      {data.length > 0 ? (
        data.map((servicio) =>(
          <tr key={servicio.servicioId}>
            <TableTd hidden={true}>{servicio.servicioId} </TableTd>
            <TableTd>{servicio.servicioFecha}</TableTd>
            <TableTd>{servicio.servicioCarguilloTitular}</TableTd>
            <TableTd> {servicio.servicioPrecio} </TableTd>
            <TableTd> {servicio.servicioPesoBruto} </TableTd>
            <TableTd> {servicio.servicioTotal} </TableTd>
            <TableTd> {servicio.servicioEstadoDescripcion} </TableTd>
            <TableTd>
              <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                onRowSelect={()=>onRowSelect(servicio)}>
                <Edit size={18} />
              </TableButton>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={()=>exportExcel(servicio.servicioId)} >
                <ExcelIcon />
              </TableButton>
              <TableButton className="text-blue-500 hover:text-blue-700 px-3"
                onRowSelect={()=>exportPdf(servicio.servicioId)} >
                <PDFIcon />
              </TableButton>
              {
                servicio.servicioEstadoDescripcion.toLowerCase() =='activo' &&
                (
                  <TableButton className={'text-red-400 hover:text-red-300 '} 
                    onRowSelect={()=>onRowDelete(servicio)}>
                    <Trash2 size={18} />
                  </TableButton>
                )
              }
            </TableTd>
          </tr>
        ))
      ):(<NoRegistros colSpan={headers. length} />)}
    </Table>
  )
}
