import ExcelJS from "exceljs"
export const CorteExcelFile = (data) => {
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
  
      // Información del Corte (títulos y valores)
      worksheet.addRow(["Información del Corte"]).font = boldStyle // Título principal
      //worksheet.addRow(["Fecha del Corte", data.corteFecha.split("T")[0]])
      worksheet.addRow(["Proveedores", data.proveedoresNombres]).font = boldStyle
      worksheet.addRow(["Campo", data.tierraCampo]).font = boldStyle
      //worksheet.addRow(["UC", data.tierraUC])
      worksheet.addRow(["Estado", data.corteEstadoDescripcion]).font = boldStyle
  
      // Separador vacío
      worksheet.addRow([])
  
      // Encabezado de la tabla de detalles
      const headerRow = worksheet.addRow([
        "Ingenio",
        "Viaje",
        "Campo",
        "Fecha",
        "Vehículo",
        "Camión",
        "Transportista",
        "Peso Vehículo",
        "Peso Camión",
        "Peso Bruto",
        "Estado",
      ])
      headerRow.font = boldStyle // Aplicar negritas a los encabezados
      headerRow.eachCell((cell) => {
        cell.border = borderStyle // Agregar bordes a los encabezados
      })
  
      // Agregar datos de la tabla
      data.corteDetail.forEach((detalle) => {
        const row = worksheet.addRow([
          detalle.ticketIngenio,
          detalle.ticketViaje,
          detalle.ticketCampo || "",
          detalle.ticketFecha,
          detalle.ticketVehiculo || "",
          detalle.ticketCamion || "",
          detalle.ticketTransportista,
          detalle.ticketVehiculoPeso,
          detalle.ticketCamionPeso,
          detalle.ticketPesoBruto,
          detalle.ticketEstadoDescripcion,
        ])
  
        // Aplicar bordes a cada celda de la fila
        row.eachCell((cell) => {
          cell.border = borderStyle
        })
      })
      // Agregar el total al lado de la suma de peso bruto
      const totalRow2 = worksheet.addRow([
        null, // Dejar las celdas vacías hasta llegar a la posición deseada
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "Suma Peso Bruto:",
        data.cortePesoBrutoTotal,
        null
      ]);
    
      // Formatear la celda con bordes y negrita
      totalRow2.getCell(9).font = { bold: true };
      totalRow2.getCell(9).border = borderStyle;

      totalRow2.getCell(10).font = { bold: true };
      totalRow2.getCell(10).border = borderStyle;
    
   // Agregar el total al lado de la suma de peso bruto
   const totalRow3 = worksheet.addRow([
    null, // Dejar las celdas vacías hasta llegar a la posición deseada
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "Precio:",
    data.cortePrecio,
    null
  ]);

  // Formatear la celda con bordes y negrita
  totalRow3.getCell(9).font = { bold: true };
  totalRow3.getCell(9).border = borderStyle;

  totalRow3.getCell(10).font = { bold: true };
  totalRow3.getCell(10).border = borderStyle;

  // Agregar el total al lado de la suma de peso bruto
  const totalRow4 = worksheet.addRow([
    null, // Dejar las celdas vacías hasta llegar a la posición deseada
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "Total:",
    data.corteTotal,
    null
  ]);

  // Formatear la celda con bordes y negrita
  totalRow4.getCell(9).font = { bold: true };
  totalRow4.getCell(9).border = borderStyle;
  totalRow4.getCell(10).font = { bold: true };
  totalRow4.getCell(10).border = borderStyle;

  return workbook
}