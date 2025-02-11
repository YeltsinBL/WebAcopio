import { convertirFechaDDMMYYYY } from "~utils/index"

export const VentaPdfFile = (data) => {
  return {
    content: [
      // Información principal
      {
        table: {
          widths: ["*", "auto"],
          body: [
            [
              { text: "ORDEN DE ENTREGA", style: "header", alignment: "left", border: [false, false, false, false]},
              { text: "001- N°"+ data.numeroModel, style: "headerBox", alignment: "center" }
            ]
          ]
        },
      },    
      // Espacio
      { text: "\n" },
      {
        style: "table",
        table: {
          widths: ["auto", "*"],
          body: [
            ["Señor:", data.personaNombre],
            ["Fecha:", convertirFechaDDMMYYYY(data.ventaFecha)],
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
          widths: ["auto", "*"],
          body: [
            // Encabezados
            [
              { text: "Cantidad", bold: true, alignment: "center"  },
              { text: "Descripción", bold: true, alignment: "center"  },
              // { text: "Estado", bold: true },
            ],            
            // Datos
            ...data.ventaDetalles.map((detalle) => [
              { text: detalle.cantidad, alignment: "center" },
              { text: detalle.productoNombre, alignment: "center" },
            ]),
          ]
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? "#CCCCCC" : null), // Fondo gris en encabezado
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