import { Edit, Trash2 } from 'lucide-react'
import { NoRegistros, Table, TableButton, TableTd } from '../common'

export const ServicioTransporteTable = ({data, onRowSelect, onRowDelete}) => {
  const headers =['Fecha', 'Transportista', 'Trans. Precio', 'Palero', 'Pala Precio','Total', 'Estado', 'Acciones']
  return (
    <Table nameTitle={'Lista de Servicio Transporte'} headers={headers}>
      {data.length > 0 ? (
        data.map((servicio) =>(
          <tr key={servicio.servicioTransporteId}>
            <TableTd hidden={true}>{servicio.servicioTransporteId} </TableTd>
            <TableTd>{servicio.servicioTransporteFecha}</TableTd>
            <TableTd>{servicio.servicioTransporteCarguilloTitular}</TableTd>
            <TableTd> {servicio.servicioTransportePrecio} </TableTd>
            <TableTd>{servicio.servicioTransporteCarguilloPalero}</TableTd>
            <TableTd> {servicio.carguilloPaleroPrecio} </TableTd>
            <TableTd> {servicio.servicioTransporteTotal} </TableTd>
            <TableTd> {servicio.servicioTransporteEstadoDescripcion} </TableTd>
            <TableTd>
              <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                onRowSelect={()=>onRowSelect(servicio)}>
                <Edit size={18} />
              </TableButton>
              {
                servicio.servicioTransporteEstadoDescripcion.toLowerCase() =='anulado' ? '':
                (
                  <TableButton className={'text-red-400 hover:text-red-300 '} 
                    onRowSelect={()=>onRowDelete(servicio.servicioTransporteId)}>
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
