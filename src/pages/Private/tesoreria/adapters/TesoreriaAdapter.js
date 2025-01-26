import { convertirFechaDDMMYYYY, FormatteDecimalMath } from "~utils/index"

export const TesoreriaAdapterList =(tesorerias)=>{
    return tesorerias.map(tesoreria =>{
      return {...tesoreria, 
        tesoreriaFecha: convertirFechaDDMMYYYY(tesoreria.tesoreriaFecha)}
    })
} 

export const TesoreriaAdapterGetData =(tesoreria)=>{
  const formatter= tesoreria.tesoreriaDetallePagos?.map(tesoreriaDetail => (formatterTesoreriaDetail(tesoreriaDetail)))
  console.log('formatter:', formatter)
  return {...tesoreria, 
    tesoreriaMonto: FormatteDecimalMath(tesoreria.tesoreriaMonto,2),
    tesoreriaPagado: FormatteDecimalMath(tesoreria.tesoreriaPagado,2),
    tesoreriaPendientePagar: FormatteDecimalMath(tesoreria.tesoreriaPendientePagar,2),
    tesoreriaDetallePagos: formatter
  }
}
const formatterTesoreriaDetail = (data) => {
  return {...data,
    tesoreriaDetallePagoFecha: data.tesoreriaDetallePagoFecha.split("T")[0],
    tesoreriaDetallePagoPagado : FormatteDecimalMath(data.tesoreriaDetallePagoPagado, 2)
  }
}