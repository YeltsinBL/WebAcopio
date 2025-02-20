import { convertirFechaDDMMYYYY, FormatteDecimalMath } from "~utils/index"

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
          widths: ["auto", "auto","auto","auto"],
          body: [
            [
              {text: "Señor:", bold: true, alignment: "left"}, 
              {text: data.personaNombre, bold: true, alignment: "left"},
              {text: "", bold: true, alignment: "left"},
              {text: "", bold: true, alignment: "left"}
            ],
            [
              {text: "Fecha:", bold: true, alignment: "left"},
              {text: convertirFechaDDMMYYYY(data.ventaFecha), bold: true, alignment: "left"},
              {text: "", bold: true, alignment: "left"},
              {text: "", bold: true, alignment: "left"}
            ],
            [
              {text: "Tipo:", bold: true, alignment: "left"},
              {text: data.ventaTipoNombre, bold: true, alignment: "left"},
              {text: data.ventaTipoId ==3?"Días:":"", bold: true, alignment: "left"},
              {text: data.ventaTipoId ==3?data.ventaDia:"", bold: true, alignment: "left"}
            ]
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
          widths: ["auto", "*","auto","auto"],
          body: [
            // Encabezados
            [
              { text: "Cantidad", bold: true, alignment: "center"  },
              { text: "Descripción", bold: true, alignment: "center"  },
              { text: "Precio", bold: true },
              { text: "SubTotal", bold: true },
            ],            
            // Datos
            ...data.ventaDetalles.map((detalle) => [
              { text: detalle.cantidad, alignment: "center" },
              { text: detalle.productoNombre, alignment: "left" },
              { text: FormatteDecimalMath(detalle.ventaDetallePrecio,2), alignment:"center" },
              { text: FormatteDecimalMath(parseInt(detalle.cantidad)*parseFloat(detalle.ventaDetallePrecio),2), alignment:"center" },
            ]),
          ]
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? "#CCCCCC" : null), // Fondo gris en encabezado
        },
      },
      {
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {text: "TOTAL:", bold: true, alignment: "right"}, 
              {text: data.ventaTotal, bold: true, alignment: "right"}
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1, // Bordes horizontales
          vLineWidth: () => 1, // Bordes verticales
        },
      },
      { text: "\n" },
      { text: "\n" },
      { text: "\n" },
      {
        table: {
          widths: ["10%", "35%", "10%","35%", "10%"], // Dos columnas
          body: [
            [
              {text: "", alignment: "center", margin: [0, 0, 0, 0],border: [false, false, false, false]},
              { text: "FIRMA DEL CLIENTE", alignment: "center", margin: [20, 0, 0, 0], border: [false, true, false, false] },
              {text: "", alignment: "center", margin: [0, 0, 0, 0],border: [false, false, false, false]},
              { text: "FIRMA DEL VENDEDOR", alignment: "center", margin: [20, 0, 0, 0], border: [false, true, false, false] },
              {text: "", alignment: "center", margin: [0, 0, 0, 0],border: [false, false, false, false]}
            ]
          ]
        },
      }
    ],
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      table: { margin: [0, 5, 0, 15] },
    },
  }
}