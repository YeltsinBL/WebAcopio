import ExcelJS from "exceljs"
import { convertirFechaDDMMYYYY } from "../../utils"
export const LiquidacionExcelFile = (data) => {
    console.log(data)
  let currentRow = 21;
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
  mergedCellTitle.value = "Información del Servicio Transporte";
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
  worksheet.addRow(["Estado", data.liquidacionEstadoDescripcion]).font = boldStyle

  // Separador vacío
  worksheet.addRow([])

  const headerTicket = worksheet.addRow([
    "FECHA",
    "PESO BRUTO",
    "PESO NETO"
  ])
  headerTicket.font = boldStyle
  headerTicket.eachCell((cell) => {
    cell.border = borderStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle' , wrapText: true };
  })

  const rowTicket = worksheet.addRow([
    `${convertirFechaDDMMYYYY(data.liquidacionFechaInicio)}
    AL
    ${convertirFechaDDMMYYYY(data.liquidacionFechaFin)}`,
    data.liquidacionPesoBruto,
    data.liquidacionPesoNeto
  ]);

  // Formatear la celda con bordes
  rowTicket.getCell(1).border = borderStyle;
  rowTicket.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' , wrapText: true };
  rowTicket.getCell(2).border = borderStyle;
  rowTicket.getCell(2).alignment = {horizontal: 'right', vertical:'middle', wrapText: true}
  rowTicket.getCell(3).border = borderStyle;
  rowTicket.getCell(3).alignment = {horizontal: 'right', vertical:'middle', wrapText: true}

  const totalRowtICKET = worksheet.addRow([
    "TOTAL",
    data.liquidacionPesoBruto,
    data.liquidacionPesoNeto
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

  worksheet.mergeCells('A11:C11');
  const mergedCellTonelada = worksheet.getCell('A11');
  mergedCellTonelada.value = "TONELADAS POR PAGAR";
  mergedCellTonelada.alignment = { horizontal: 'left', vertical: 'middle' };
  mergedCellTonelada.font = { bold: true}

  const headerRow = worksheet.addRow([
    "PESOS NETOS",
    "P. COMPRA",
    "","",
    "TOTAL"
  ])
  headerRow.eachCell((cell) => {
    cell.border = borderStyle
    cell.font = boldStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  })
  // Fusionar las celdas para "P. COMPRA"
  worksheet.mergeCells('B12:D12'); // Combina columnas B, C y D en esta fila
  // Obtener la celda fusionada para "P. COMPRA" y actualizarla
  const mergedCellPCompra = worksheet.getCell('B12');
  mergedCellPCompra.value = "P. COMPRA";
  mergedCellPCompra.font = boldStyle;
  mergedCellPCompra.alignment = { horizontal: 'center', vertical: 'middle' };
  
  const rowTonelda = worksheet.addRow([
    data.liquidacionPesoNeto,
    data.liquidacionToneladaPrecioCompra,
    null,null,
    data.liquidacionToneladaTotal
  ]);

  // Formatear la celda con bordes y alineación
  rowTonelda.getCell(1).border = borderStyle
  rowTonelda.getCell(2).border = borderStyle
  rowTonelda.getCell(5).border = borderStyle
  rowTonelda.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
  rowTonelda.getCell(2).alignment = { horizontal: 'center', vertical: 'middle' };
  rowTonelda.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}
  
  worksheet.mergeCells('B13:D13');
  const mergedCellPCompraValue = worksheet.getCell('B13');
  mergedCellPCompraValue.value = data.liquidacionToneladaPrecioCompra
  mergedCellPCompraValue.alignment = { horizontal: 'center', vertical: 'middle' };

  const totalRowTonelada = worksheet.addRow([
    null,null, null,
    "TOTAL:",
    data.liquidacionToneladaTotal
  ]);

  // Formatear la celda negrita
  totalRowTonelada.getCell(4).font = { bold: true };
  totalRowTonelada.getCell(4).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowTonelada.getCell(5).font = { bold: true };
  totalRowTonelada.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}
  // Separador vacío
  worksheet.addRow([])

  worksheet.mergeCells('A16:C16');
  const mergedCellFinancia = worksheet.getCell('A16');
  mergedCellFinancia.value = "FINANCIAMIENTO";
  mergedCellFinancia.alignment = { horizontal: 'left', vertical: 'middle' };
  mergedCellFinancia.font = {bold: true}

  const headerRowFinancia = worksheet.addRow([
    "FECHA",
    "A CUENTA",
    "TIEMPO",
    "INTERES DIA",
    "INTERES S/",
    "TOTAL"
  ])
  headerRowFinancia.font = boldStyle
  headerRowFinancia.eachCell((cell) => {
    cell.border = borderStyle
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  })
  // Agregar datos de la tabla
  data.liquidacionFinanciamiento.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.liquidacionFinanciamientoFecha,
      detalle.liquidacionFinanciamientoACuenta,
      detalle.liquidacionFinanciamientoTiempo,
      detalle.liquidacionFinanciamientoInteresMes,
      detalle.liquidacionFinanciamientoInteres,
      detalle.liquidacionFinanciamientoTotal
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(2).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(3).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(4).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}
    row.getCell(6).alignment = {horizontal: 'right', vertical:'middle'}

    currentRow +=1
  })
  const totalRowFinancia = worksheet.addRow([
    null,
    null,
    null,
    null,
    "A CUENTA:",
    data.liquidacionFinanciamientoACuenta
  ]);

  // Formatear la celda con bordes y negrita
  totalRowFinancia.getCell(5).font = { bold: true };
  totalRowFinancia.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowFinancia.getCell(6).font = { bold: true };
  totalRowFinancia.getCell(6).alignment = {horizontal: 'right', vertical:'middle'}

  worksheet.addRow([])

  worksheet.mergeCells(`A${currentRow-1}:B${currentRow-1}`);
  const mergedCellAdicional = worksheet.getCell(`A${currentRow-1}`);
  mergedCellAdicional.value = "ADICIONALES";
  mergedCellAdicional.alignment = { horizontal: 'left', vertical: 'middle' };
  mergedCellAdicional.font = {bold: true}

  // Agregar datos de la tabla
  data.liquidacionAdicionals.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.liquidacionAdicionalMotivo,
      null, null, null, null,
      detalle.liquidacionAdicionalTotal
    ])
    row.eachCell((cell) => {
      cell.border = borderStyle
    })
    row.getCell(1).alignment = {horizontal: 'center', vertical:'middle'}
    row.getCell(6).alignment = {horizontal: 'right', vertical:'middle'}

    worksheet.mergeCells(`A${currentRow}:E${currentRow}`); // Combina 4 columnas
    const mergedCell1 = worksheet.getCell(`A${currentRow}`);
    mergedCell1.value = detalle.liquidacionAdicionalMotivo;
    mergedCell1.alignment = { horizontal: 'center', vertical: 'middle' };
    currentRow += 1
  })
  const totalRowAdicional = worksheet.addRow([
    null, null, null, null,
    "TOTAL:",
    data.liquidacionAdicionalTotal
  ]);
  // Formatear la celda con bordes y negrita
  totalRowAdicional.getCell(5).font = { bold: true };
  totalRowAdicional.getCell(5).alignment = {horizontal: 'right', vertical:'middle'}
  totalRowAdicional.getCell(6).font = { bold: true };
  totalRowAdicional.getCell(6).alignment = {horizontal: 'right', vertical:'middle'}

  worksheet.addRow([])

  // Agregar el total al lado de la suma de peso bruto
  const totalRowPorPagar = worksheet.addRow([
    null,
    null,
    null,
    null,
    "POR PAGAR:",
    data.liquidacionPagar
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
  
  return workbook
}