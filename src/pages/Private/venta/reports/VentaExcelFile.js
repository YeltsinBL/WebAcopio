import ExcelJS from "exceljs"
import { convertirFechaDDMMYYYY } from "~utils/index"
export const VentaExcelFile = (data) => {
  let detailRow = 6
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
  worksheet.mergeCells('A1:D1') 
  const mergedCellTitle = worksheet.getCell('A1')
  mergedCellTitle.value = "ORDEN DE ENTREGA"
  mergedCellTitle.font = boldStyle

  worksheet.mergeCells('E1:F1') 
  const mergedCellNumero = worksheet.getCell('E1')
  mergedCellNumero.value = "001- N°"+ data.numeroModel
  mergedCellNumero.font = boldStyle

  worksheet.addRow(["Señor", data.personaNombre]).font = boldStyle
  worksheet.addRow(["Fecha", convertirFechaDDMMYYYY(data.ventaFecha)]).font = boldStyle

  // Separador vacío
  worksheet.addRow([])

  const headerRow = worksheet.addRow([
    "CANT.",
    "DESCRIPCIÓN",
  ])
  headerRow.eachCell((cell) => {
    cell.border = borderStyle
    cell.font = boldStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
  })
  // Fusionar las celdas 
  worksheet.mergeCells('B5:F5') // Combina columnas B-F en esta fila
  // Obtener la celda fusionada
  const mergedCellPCompra = worksheet.getCell('B5')
  mergedCellPCompra.value = "DESCRIPCIÓN"
  mergedCellPCompra.font = boldStyle
  mergedCellPCompra.alignment = { horizontal: 'center', vertical: 'middle' }
  

  // Agregar datos de la tabla
  data.ventaDetalles.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.cantidad,
      detalle.productoNombre
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(2).alignment = {horizontal: 'left', vertical:'middle'}
    worksheet.mergeCells(`B${detailRow}:F${detailRow}`)
    const mergedCell1 = worksheet.getCell(`B${detailRow}`)
    mergedCell1.alignment = { horizontal: 'left', vertical: 'middle' }
    detailRow += 1
  })
  
  return workbook
}