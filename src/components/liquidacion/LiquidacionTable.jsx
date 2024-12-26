import { Edit, Trash2 } from "lucide-react"
import { NoRegistros, Table, TableButton, TableTd } from "../common"

export function LiquidacionTable({data, onRowSelect, onRowDelete}) {
  console.log(data)
  const headers = ['Sembrador','Campo','UT','Fecha Inicio', 'Fecha Final','Peso Neto', 
    'Toneladas Por Pagar Total', 'Financiamiento A Cuenta', 'Adicional Total','Por Pagar', 'Estado', 'Acciones'
  ]

  return (
    <Table nameTitle={'Lista de Liquidaciones'} headers={headers}>
      {data.length > 0 ? (
        data.map((liquidacion) =>(
          <tr key={liquidacion.liquidacionId}>
            <TableTd hidden={true}>{liquidacion.liquidacionId}</TableTd>
            <TableTd>{liquidacion.personaNombre}</TableTd>
            <TableTd>{liquidacion.tierraCampo}</TableTd>
            <TableTd>{liquidacion.proveedorUT}</TableTd>
            <TableTd>{liquidacion.liquidacionFechaInicio}</TableTd>
            <TableTd>{liquidacion.liquidacionFechaFin}</TableTd>
            <TableTd>{liquidacion.liquidacionPesoNeto}</TableTd>
            <TableTd>{liquidacion.liquidacionToneladaTotal}</TableTd>
            <TableTd>{liquidacion.liquidacionFinanciamientoACuenta}</TableTd>
            <TableTd>{liquidacion.liquidacionAdicionalTotal}</TableTd>
            <TableTd>{liquidacion.liquidacionPagar}</TableTd>
            <TableTd>{liquidacion.liquidacionEstadoDescripcion} </TableTd>
            <TableTd>
              <TableButton className={'text-blue-500 hover:text-blue-700 px-3'} 
                onRowSelect={()=>onRowSelect(liquidacion)}>
                <Edit size={18} />
              </TableButton>
              {/* {
                liquidacion.liquidacionEstadoDescripcion.toLowerCase() =='anulado' ? '':
                (
                  <TableButton className={'text-red-400 hover:text-red-300 '} 
                    onRowSelect={()=>onRowDelete(liquidacion.liquidacionId)}>
                    <Trash2 size={18} />
                  </TableButton>
                )
              } */}
            </TableTd>
          </tr>
        ))
      ):(
        <NoRegistros colSpan={headers.length} />
      )}
    </Table>
  )
}