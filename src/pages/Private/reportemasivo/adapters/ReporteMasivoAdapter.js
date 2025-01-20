import { convertirFechaDDMMYYYY, FormatteDecimalMath } from "~utils/index"

export const ReporteMasivoAdapterList = (datos=[]) => {
  return datos.map(data =>{
    return {...data,
      liquidacionFechaInicio: convertirFechaDDMMYYYY(data.liquidacionFechaInicio),
      liquidacionFechaFin   : convertirFechaDDMMYYYY(data.liquidacionFechaFin),
      liquidacionPesoNeto: FormatteDecimalMath(data.liquidacionPesoNeto,3),
      liquidacionPesoBruto: FormatteDecimalMath(data.liquidacionPesoBruto,3),
      liquidacionPagar: FormatteDecimalMath(data.liquidacionPagar,2)
    }
  })
}