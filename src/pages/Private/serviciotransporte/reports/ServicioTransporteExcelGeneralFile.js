import ExcelJS from "exceljs"
import { FormatteDecimalMath } from "~utils/index"
export const ServicioTransporteExcelGeneralFile = (data) => {

  let sumaTotalAnulado = 0
  let sumaTotalActivo = 0
  let sumaTotalPagado = 0
  let sumaPesoBrutoAnulado = 0
  let sumaPesoBrutoActivo = 0
  let sumaPesoBrutoPagado = 0
  const obtenerTextoPrioridad = (orden, pesoBruto, valorTotal) => {
    switch (orden) {
      case "activo":
        sumaPesoBrutoActivo += pesoBruto
        return sumaTotalActivo += valorTotal
      case "anulado":
        sumaPesoBrutoAnulado += pesoBruto
        return sumaTotalAnulado += valorTotal
      default:
        sumaPesoBrutoPagado += pesoBruto
        return sumaTotalPagado += valorTotal
    }
  };
  // Crear el workbook y una hoja
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("Reporte General")

  // Estilos generales
  const boldStyle = { bold: true }
  const borderStyle = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  }
  
  // Fusionar las celdas 
  worksheet.mergeCells('A1:F1'); 
  const mergedCellTitle = worksheet.getCell('A1');
  mergedCellTitle.value = "Información del Reporte General de Servicio de Transporte";
  mergedCellTitle.font = boldStyle;

  // Separador vacío
  worksheet.addRow([])
  const headerRowFinancia = worksheet.addRow([
    'FECHA', 'TRANSPORTISTA', 'PRECIO', 'PESO BRUTO', 'TOTAL', 'ESTADO',
  ])
  headerRowFinancia.font = boldStyle
  headerRowFinancia.eachCell((cell) => {
    cell.border = borderStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  })
  data.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.servicioFecha,
      detalle.servicioCarguilloTitular,
      detalle.servicioPrecio,
      detalle.servicioPesoBruto,
      detalle.servicioTotal,
      detalle.servicioEstadoDescripcion,       
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(2).alignment = {horizontal: 'left', vertical:'middle'}
    row.getCell(3).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(4).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(6).alignment = {horizontal: 'left', vertical:'middle'}

    obtenerTextoPrioridad(
      detalle.servicioEstadoDescripcion.toLowerCase(), 
      parseFloat(detalle.servicioPesoBruto), 
      parseFloat(detalle.servicioTotal)
  )
  })
  // Separador vacío
  worksheet.addRow([])
  const borderStyleTotales = {
    top: { style: "thin" },
    bottom: { style: "thin" },
  }
  // Agregar el total al lado de la suma de peso bruto
  const totalRowAnulados = worksheet.addRow([
    null, null, "TOTALES ANULADOS",
    FormatteDecimalMath(sumaPesoBrutoAnulado,2),
    FormatteDecimalMath(sumaTotalAnulado,2),
  ]);
  // Formatear la celda con bordes y negrita
  totalRowAnulados.getCell(3).font = { bold: true };
  totalRowAnulados.getCell(3).border = borderStyleTotales;
  totalRowAnulados.getCell(3).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowAnulados.getCell(4).font = { bold: true };
  totalRowAnulados.getCell(4).border = borderStyleTotales;
  totalRowAnulados.getCell(4).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowAnulados.getCell(5).font = { bold: true };
  totalRowAnulados.getCell(5).border = borderStyleTotales;
  totalRowAnulados.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}

  const totalRowActivos = worksheet.addRow([
    null, null, "TOTALES ACTIVOS",
    FormatteDecimalMath(sumaPesoBrutoActivo,2),
    FormatteDecimalMath(sumaTotalActivo,2),
  ]);

  totalRowActivos.getCell(3).font = { bold: true };
  totalRowActivos.getCell(3).border = borderStyleTotales;
  totalRowActivos.getCell(3).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowActivos.getCell(4).font = { bold: true };
  totalRowActivos.getCell(4).border = borderStyleTotales;
  totalRowActivos.getCell(4).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowActivos.getCell(5).font = { bold: true };
  totalRowActivos.getCell(5).border = borderStyleTotales;
  totalRowActivos.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}

  const totalRowPorPagar = worksheet.addRow([
    null, null, "TOTALES PAGADOS",
    FormatteDecimalMath(sumaPesoBrutoPagado,2),
    FormatteDecimalMath(sumaTotalPagado,2),
  ]);
  totalRowPorPagar.getCell(3).font = { bold: true };
  totalRowPorPagar.getCell(3).border = borderStyleTotales;
  totalRowPorPagar.getCell(3).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowPorPagar.getCell(4).font = { bold: true };
  totalRowPorPagar.getCell(4).border = borderStyleTotales;
  totalRowPorPagar.getCell(4).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowPorPagar.getCell(5).font = { bold: true };
  totalRowPorPagar.getCell(5).border = borderStyleTotales;
  totalRowPorPagar.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}

  return workbook
}