import { saveAs } from "file-saver"

export const ExportToExcel = async(workbook, nameExcel) => {
  // Generar el archivo Excel
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { 
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
  })
  saveAs(blob, `${nameExcel}.xlsx`)
}
