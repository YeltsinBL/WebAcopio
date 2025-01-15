import { FormatteDecimalMath } from "../../utils"

export const ServicioTransportePdfFile = (data) => {
  //let sumaPesoBruto=0
  const { sumaPesoBruto, detalleFilas } = data.servicioTransporteDetails.reduce(
    (acc, detalle) => {
      acc.sumaPesoBruto += parseFloat(detalle.ticketPesoBruto || 0); // Manejar valores nulos o indefinidos
      acc.detalleFilas.push([
        { text: detalle.ticketIngenio, alignment: "center" },
        { text: detalle.ticketViaje, alignment: "center" },
        { text: detalle.ticketCampo, alignment: "center" },
        { text: detalle.ticketCamion, alignment: "center" },
        { text: detalle.ticketVehiculo, alignment: "center" },
        { text: detalle.ticketTransportista, alignment: "center" },
        { text: detalle.ticketFecha, alignment: "center" },
        { text: detalle.ticketCamionPeso, alignment: "right" },
        { text: detalle.ticketVehiculoPeso, alignment: "right" },
        { text: detalle.ticketPesoBruto, alignment: "right" },
      ]);
      return acc;
    },
    { sumaPesoBruto: 0, detalleFilas: [] }
  )
  return {
    pageOrientation: 'landscape',
    content: [
      // Información principal
      {
        style: "table",
        table: {
          widths: ["auto", "*"],
          body: [
            ["Fecha:", data.servicioTransporteFecha],
            ["Transportista:", data.carguilloTitular],
            ["Precio Transportista", data.servicioTransportePrecio],
            ["Estado:", data.servicioTransporteEstadoDescripcion],
          ],
        },
        layout: "noBorders", // Sin bordes
      },
      // Espacio
      { text: "\n" },
      // Tabla de detalles
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*", "*", "auto", "auto", "auto", "auto"],
          body: [
            // Encabezados
            [
              { text: "Ingenio", bold: true, alignment: "center"  },
              { text: "Viaje", bold: true, alignment: "center"  },
              { text: "Campo", bold: true, alignment: "center"  },
              { text: "Camión", bold: true, alignment: "center"  },
              { text: "Vehículo", bold: true, alignment: "center"  },
              { text: "Transportista", bold: true, alignment: "center"  },
              { text: "Fecha", bold: true, alignment: "center"  },            
              { text: "Peso Camión", bold: true, alignment: "center"  },
              { text: "Peso Vehpiculo", bold: true, alignment: "center"  },
              { text: "Peso Bruto", bold: true, alignment: "center"  },
              // { text: "Estado", bold: true },
            ],            
            // Datos
            ...detalleFilas
          ]
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? "#CCCCCC" : null), // Fondo gris en encabezado
        },
      },
    
      // Totales
      {
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {text: "Suma Peso Bruto:", bold: true, alignment: "right"},
              {text: FormatteDecimalMath(sumaPesoBruto, 3), bold: true, alignment: "right"}],
            [
              {text: "Total:", bold: true, alignment: "right"}, 
              {text: data.servicioTransporteTotal, bold: true, alignment: "right"}],
          ],
        },
        layout: {
          hLineWidth: () => 1, // Bordes horizontales
          vLineWidth: () => 1, // Bordes verticales
        },
      },
    ],
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      table: { margin: [0, 5, 0, 15] },
    },
  }
}