import ExcelJS from "exceljs"
export const InformeIngresoGastoExcel = (data) => {
  console.log(data)
  let currentRow = 8;
  const obtenerTextoPrioridad = (orden) => {
    switch (orden) {
      case 1:
        return "Compra de caña (T. neta)";
      case 2:
        return "Transporte de caña (T. bruta)";
      case 3:
        return "Servicio de Pala (T. bruta)";
      case 4:
        return "Servicio de Corte (T. bruta)";
      case 5:
        return "Impuestos (T. bruta)";
      case 6:
        return "Otros Gastos (T. bruta)";
      default:
        return "";
    }
  };
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
  worksheet.mergeCells('A1:B1'); 
  const mergedCellTitle = worksheet.getCell('A1');
  mergedCellTitle.value = "INFORME DE INGESOS Y GASTOS";
  mergedCellTitle.font = boldStyle;

  worksheet.addRow(["SEMBRADO:", data.personaNombre]).font = boldStyle
  worksheet.mergeCells('B2:D2');
  const mergedCell1 = worksheet.getCell('B2');
  mergedCell1.value = data.personaNombre;
  mergedCell1.alignment = { horizontal: 'left', vertical: 'middle' };

  worksheet.addRow(["CAMPO:", data.tierraCampo]).font = boldStyle
  worksheet.mergeCells('B3:D3');
  const mergedCell2 = worksheet.getCell('B3');
  mergedCell2.value = data.tierraCampo;
  mergedCell2.alignment = { horizontal: 'left', vertical: 'middle' };

  worksheet.addRow(["U.T.:", data.proveedorUT]).font = boldStyle
  worksheet.mergeCells('B4:D4');
  const mergedCell3 = worksheet.getCell('B4');
  mergedCell3.value = data.proveedorUT;
  mergedCell3.alignment = { horizontal: 'left', vertical: 'middle' };
  // Separador vacío
  worksheet.addRow([])

  worksheet.addRow(["IMPORTE NETO DE LA FACTURA", data.liquidacionEstadoDescripcion]).font = boldStyle


  const headerTicket = worksheet.addRow([
    "FECHA",
    "FACTURA",
    "TOTAL"
  ])
  headerTicket.font = boldStyle
  headerTicket.eachCell((cell) => {
    cell.border = borderStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle' , wrapText: true };
  })

  data.informeFacturas.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.informeFacturaFecha,
      detalle.informeFacturaNumero,
      detalle.informeFacturaImporte,
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(2).alignment = {horizontal: 'left', vertical:'middle'}
    row.getCell(3).alignment = {horizontal: 'right', vertical:'middle'}

    currentRow +=1
  })

  const totalRowtICKET = worksheet.addRow([
    "",
    "TOTAL",
    data.informeFacturaTotal
  ]);

  const borderTicketTotal ={
    bottom: { style: "thin" },
  }
  // Formatear la celda con bordes y negrita
  totalRowtICKET.getCell(1).font = { bold: true };
  totalRowtICKET.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
  totalRowtICKET.getCell(2).font = { bold: true };
  totalRowtICKET.getCell(2).border = borderTicketTotal;
  totalRowtICKET.getCell(2).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowtICKET.getCell(3).font = { bold: true };
  totalRowtICKET.getCell(3).border = borderTicketTotal;
  totalRowtICKET.getCell(3).alignment = {horizontal: 'right', vertical:'middle'}
  // Separador vacío
  worksheet.addRow([])
  currentRow +=2

  worksheet.mergeCells(`A${currentRow}:B${currentRow}`);
  const mergedCellAdicional = worksheet.getCell(`A${currentRow}`);
  mergedCellAdicional.value = "COSTOS";
  mergedCellAdicional.alignment = { horizontal: 'left', vertical: 'middle' };
  mergedCellAdicional.font = {bold: true}

  const headerCostos = worksheet.addRow([
    "",null,null,null,null,
    "PRECIO",
    "TONELADAS",
    "TOTAL"
  ])
  headerCostos.font = boldStyle
  headerCostos.eachCell((cell) => {
    cell.border = borderStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle' , wrapText: true };
  })
  currentRow += 1
  worksheet.mergeCells(`A${currentRow}:E${currentRow}`); // Combina 4 columnas
  const mergedCellcosto = worksheet.getCell(`A${currentRow}`);
  mergedCellcosto.value = "";
  mergedCellcosto.alignment = { horizontal: 'left', vertical: 'middle' };
  // Agregar datos de la tabla
  data.informeCostos.forEach((detalle) => {
    const row = worksheet.addRow([
      obtenerTextoPrioridad(detalle.informeCostoOrden),
      null,null,null,null,
      detalle.informeCostoPrecio,
      detalle.informeCostoTonelada, detalle.informeCostoTotal
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'left', vertical:'middle'}
    row.getCell(6).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(7).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(8).alignment = {horizontal: 'right', vertical:'middle'}

    currentRow += 1
    worksheet.mergeCells(`A${currentRow}:E${currentRow}`); // Combina 4 columnas
    const mergedCell1 = worksheet.getCell(`A${currentRow}`);
    mergedCell1.value = obtenerTextoPrioridad(detalle.informeCostoOrden);
    mergedCell1.alignment = { horizontal: 'left', vertical: 'middle' };
  })
  const totalRowAdicional = worksheet.addRow([
    null, null, null, null,null, null,
    "TOTAL:",
    data.informeCostoTotal
  ]);
  // Formatear la celda con bordes y negrita
  totalRowAdicional.getCell(7).font = { bold: true };
  totalRowAdicional.getCell(7).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowAdicional.getCell(8).font = { bold: true };
  totalRowAdicional.getCell(8).alignment = {horizontal: 'right', vertical:'middle'}

  worksheet.addRow([])

  // Agregar el total al lado de la suma de peso bruto
  const totalRowPorPagar = worksheet.addRow([
    null, null, null, null,null, null,
    "UTILIDAD:",
    data.informeTotal
  ]);
  const borderStylePorPagar = {
    top: { style: "thin" },
    bottom: { style: "thin" },
  }
  // Formatear la celda con bordes y negrita
  totalRowPorPagar.getCell(7).font = { bold: true };
  totalRowPorPagar.getCell(7).border = borderStylePorPagar;
  totalRowPorPagar.getCell(7).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowPorPagar.getCell(8).font = { bold: true };
  totalRowPorPagar.getCell(8).border = borderStylePorPagar;
  totalRowPorPagar.getCell(8).alignment = {horizontal: 'right', vertical:'middle'}
  
  worksheet.addRow([])
  worksheet.addRow(["RESULTADO"]).font = boldStyle
  worksheet.addRow([data.informeResultado])

  return workbook
}