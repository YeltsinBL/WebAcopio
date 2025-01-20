import ExcelJS from "exceljs"
import { FormatteDecimalMath } from "~utils/index"
export const ReporteMasivoExcel = (data) => {
  let sumaPesoBruto=0
  let sumaPesoNeto=0
  let sumaTotal=0
  // Crear el workbook y una hoja
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("Reporte")

  // Estilos generales
  const boldStyle = { bold: true }
  const borderStyle = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  }

  // Fusionar las celdas 
  worksheet.mergeCells('A1:D1'); 
  const mergedCellTitle = worksheet.getCell('A1');
  mergedCellTitle.value = "Información de Reporte Masivo";
  mergedCellTitle.font = boldStyle;

  // Separador vacío
  worksheet.addRow([])
  const headerRowFinancia = worksheet.addRow([
    'UT','SEMBRADOR','CAMPO','FECHA INICIO', 'FECHA FINAL','PESO BRUTO', 
    'PESO NETO', 'POR PAGAR', 'ESTADO'
  ])
  headerRowFinancia.font = boldStyle
  headerRowFinancia.eachCell((cell) => {
    cell.border = borderStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  })
  data.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.proveedorUT,
      detalle.personaNombre,
      detalle.tierraCampo,
      detalle.liquidacionFechaInicio,
      detalle.liquidacionFechaFin,
      detalle.liquidacionPesoBruto,
      detalle.liquidacionPesoNeto,
      detalle.liquidacionPagar,
      detalle.liquidacionEstadoDescripcion          
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'left', vertical:'middle'}
    row.getCell(2).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(3).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(4).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(5).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(6).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(7).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(8).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(9).alignment = {horizontal: 'center', vertical:'middle'}

    sumaPesoBruto += parseFloat(detalle.liquidacionPesoBruto)
    sumaPesoNeto += parseFloat(detalle.liquidacionPesoNeto)
    sumaTotal += parseFloat(detalle.liquidacionPagar)
  })
  
  // Agregar el total al lado de la suma de peso bruto
  const totalRowPorPagar = worksheet.addRow([
    null,
    null,
    null,
    null,
    "TOTALES",
    FormatteDecimalMath(sumaPesoBruto,3),
    FormatteDecimalMath(sumaPesoNeto,3),
    FormatteDecimalMath(sumaTotal,2),
  ]);
  const borderStylePorPagar = {
    top: { style: "thin" },
    bottom: { style: "thin" },
  }
  // Formatear la celda con bordes y negrita
  totalRowPorPagar.getCell(5).font = { bold: true };
  totalRowPorPagar.getCell(5).border = borderStylePorPagar;
  totalRowPorPagar.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowPorPagar.getCell(6).font = { bold: true };
  totalRowPorPagar.getCell(6).border = borderStylePorPagar;
  totalRowPorPagar.getCell(6).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowPorPagar.getCell(7).font = { bold: true };
  totalRowPorPagar.getCell(7).border = borderStylePorPagar;
  totalRowPorPagar.getCell(7).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowPorPagar.getCell(8).font = { bold: true };
  totalRowPorPagar.getCell(8).border = borderStylePorPagar;
  totalRowPorPagar.getCell(8).alignment = {horizontal: 'right', vertical:'middle'}
  
  return workbook
}