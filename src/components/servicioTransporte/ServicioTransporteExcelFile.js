import ExcelJS from "exceljs"
import { FormatteDecimalMath } from "../../utils"
export const ServicioTransporteExcelFile = (data) => {
  let sumaPesoBruto=0
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

  worksheet.addRow(["Información del Servicio Transporte"]).font = boldStyle
  worksheet.addRow(["Fecha", data.servicioTransporteFecha]).font = boldStyle
  worksheet.addRow(["Transportista", data.carguilloTitular]).font = boldStyle
  worksheet.addRow(["Precio Transportista", data.servicioTransportePrecio]).font = boldStyle
  worksheet.addRow(["Palero", data.carguilloTitularPalero]).font = boldStyle
  worksheet.addRow(["Precio Transportista", FormatteDecimalMath(data.carguilloPaleroPrecio,2)]).font = boldStyle
  worksheet.addRow(["Estado", data.servicioTransporteEstadoDescripcion]).font = boldStyle

  // Separador vacío
  worksheet.addRow([])

  const headerRow = worksheet.addRow([
    "Ingenio",
    "Viaje",
    "Campo",
    "Camión",
    "Vehículo",
    "Transportista",
    "Fecha",
    "Peso Camión",
    "Peso Vehículo",
    "Peso Bruto",
    "Estado",
  ])
  headerRow.font = boldStyle
  headerRow.eachCell((cell) => {
    cell.border = borderStyle
  })

  // Agregar datos de la tabla
  data.servicioTransporteDetails.forEach((detalle) => {
    const row = worksheet.addRow([
      detalle.ticketIngenio,
      detalle.ticketViaje,
      detalle.ticketCampo || '',
      detalle.ticketCamion,
      detalle.ticketVehiculo,
      detalle.ticketTransportista,
      detalle.ticketFecha,
      detalle.ticketCamionPeso,
      detalle.ticketVehiculoPeso,
      detalle.ticketPesoBruto,
      detalle.ticketEstadoDescripcion,
    ])
    sumaPesoBruto += parseFloat(detalle.ticketPesoBruto )
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
    "Total:",
    FormatteDecimalMath(sumaPesoBruto,3),
    data.servicioTransporteTotal, // Total
  ]);

  // Formatear la celda con bordes y negrita
  totalRow2.getCell(9).font = { bold: true }; // Columna 9, "Total:"
  totalRow2.getCell(9).border = borderStyle;
  totalRow2.getCell(10).font = { bold: true }; // Columna 10, "cortePesoBrutoTotal:"
  totalRow2.getCell(10).border = borderStyle;

  totalRow2.getCell(11).font = { bold: true }; // Columna 11, corteTotal
  totalRow2.getCell(11).border = borderStyle;
  
  return workbook
}