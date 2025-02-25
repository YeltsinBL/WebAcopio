import ExcelJS from "exceljs"
export const ProductoExcel = (data) => {
  let detailRow=4
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
  worksheet.mergeCells('A1:F1'); 
  const mergedCellTitle = worksheet.getCell('A1');
  mergedCellTitle.value = "REPORTE PRODUCTOS";
  mergedCellTitle.font = boldStyle;
  mergedCellTitle.alignment = { horizontal: 'center', vertical: 'middle' }

  // Separador vacío
  worksheet.addRow([])
  const headerRow = worksheet.addRow([
    'CANTIDAD','','DESCRIPCIÓN DEL PRODUCTO'
  ])
  headerRow.eachCell((cell) => {
    cell.border = borderStyle
    cell.font = boldStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  })
  // Fusionar las celdas 
  worksheet.mergeCells('A3:B3')
  // Obtener la celda fusionada
  const mergedCellCant = worksheet.getCell('A3')
  mergedCellCant.value = "CANTIDAD"
  mergedCellCant.font = boldStyle
  mergedCellCant.alignment = { horizontal: 'center', vertical: 'middle' }

  // Fusionar las celdas 
  worksheet.mergeCells('C3:F3')
  // Obtener la celda fusionada
  const mergedCellPCompra = worksheet.getCell('C3')
  mergedCellPCompra.value = "DESCRIPCIÓN DEL PRODUCTO"
  mergedCellPCompra.font = boldStyle
  mergedCellPCompra.alignment = { horizontal: 'center', vertical: 'middle' }
  

  data.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.productoStock + ' '+ (detalle.productoTipoDetalle || ''),
      " ",
      detalle.productoNombre,       
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(3).alignment = {horizontal: 'left', vertical:'middle'}

    worksheet.mergeCells(`A${detailRow}:B${detailRow}`)
    const mergedCell = worksheet.getCell(`A${detailRow}`)
    mergedCell.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.mergeCells(`C${detailRow}:F${detailRow}`)
    const mergedCell1 = worksheet.getCell(`C${detailRow}`)
    mergedCell1.alignment = { horizontal: 'left', vertical: 'middle' }
    detailRow += 1
  })
 
  return workbook
}