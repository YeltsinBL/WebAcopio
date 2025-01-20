import { 
  FilterOption, InputTextCustom, NoRegistros, TableBodyCustom, TableContainerCustom, 
  TableFooterCustom, TableHeaderCustom, TableTd, TitleCustom 
} from "~components/common"
import { FormatteDecimalMath } from "~utils/index"

export const ReporteMasivoTable = ({data}) => {
  const headers = ['UT','Sembrador','Campo','Fecha Inicio', 'Fecha Final','Peso Bruto', 
    'Peso Neto', 'Por Pagar', 'Estado'
  ]
  const summary = data.reduce(
    (acc, item) => {
      acc.liquidacionPesoNeto += parseFloat(item.liquidacionPesoNeto)
      acc.liquidacionPesoBruto += parseFloat(item.liquidacionPesoBruto)
      acc.liquidacionPagar += parseFloat(item.liquidacionPagar)
      return acc;
    },
    { liquidacionPesoNeto: 0, liquidacionPesoBruto: 0, liquidacionPagar: 0 }
  )
  return (
    <TableContainerCustom>
      <TableHeaderCustom>
        <TitleCustom titulo={'Lista de Reporte Masivo'}  />
      </TableHeaderCustom>
      <TableBodyCustom headers={headers}>
        {data.length > 0 ? (
          data.map((liquidacion) =>(
          <tr key={liquidacion.liquidacionId}>
            <TableTd hidden={true}>{liquidacion.liquidacionId}</TableTd>
            <TableTd>{liquidacion.proveedorUT}</TableTd>
            <TableTd>{liquidacion.personaNombre}</TableTd>
            <TableTd>{liquidacion.tierraCampo}</TableTd>
            <TableTd>{liquidacion.liquidacionFechaInicio}</TableTd>
            <TableTd>{liquidacion.liquidacionFechaFin}</TableTd>
            <TableTd>{liquidacion.liquidacionPesoBruto}</TableTd>
            <TableTd>{liquidacion.liquidacionPesoNeto}</TableTd>
            <TableTd>{liquidacion.liquidacionPagar}</TableTd>
            <TableTd>{liquidacion.liquidacionEstadoDescripcion} </TableTd>
          </tr>
          ))
        ):(
          <NoRegistros colSpan={headers.length} />
        )}
      </TableBodyCustom>
      <TableFooterCustom>
        <FilterOption html={'PesoBrutoModel'} name={'Peso Bruto'}>
          <InputTextCustom textValue={FormatteDecimalMath(summary.liquidacionPesoBruto,3)} placeholder="Automático" readOnly />
        </FilterOption>
        <FilterOption html={'PesoNetoModel'} name={'Peso Neto'}>
          <InputTextCustom textValue={FormatteDecimalMath(summary.liquidacionPesoNeto,3)} placeholder="Automático" readOnly />
        </FilterOption>
        <FilterOption htmlFor={'TotalModel'} name={'Total Pagar'}>
          <InputTextCustom textValue={FormatteDecimalMath(summary.liquidacionPagar,2)} placeholder="Automático" readOnly />
        </FilterOption>
      </TableFooterCustom>
    </TableContainerCustom>
  )
}