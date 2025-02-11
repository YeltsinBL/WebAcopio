import { FormatteDecimalMath } from "~utils/index";

export const ProductoPdf = (data) => {
  return {
    content: [
      // Información principal
      {
        style: "table",
        table: {
          widths: ["*"],
          body: [
            [{text: "REPORTE PRODUCTOS" , bold: true, alignment: "center"}],
          ],
        },
        layout: "noBorders", // Sin bordes
      },
      // Espacio
      { text: "\n" },
      // Tabla de Financiamiento
      {
        columns:[
          { width: "10%", text: "" }, 
          {
          style: "table",
          alignment: "center",
          table: {
            headerRows: 1,
            widths: ["auto", "*"],
            body: [
              // Encabezados
              [
                { text: "CANTIDAD", bold: true, alignment: "center"  },
                { text: "DESCRIPCIÓN DEL PRODUCTO", bold: true, alignment: "center"  },
              ],            
              // Datos
              //...detalleFilasFinancia
              ...data.map((detalle) => [
                { text: detalle.productoCantidad + ' '+ (detalle.productoTipoDetalle || ''), alignment: "center" },
                { text: detalle.productoNombre, alignment: "left" },
              ]),
            ]
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#CCCCCC" : null), // Fondo gris en encabezado
          },
          },
          { width: "10%", text: "" }, 
        ]
      }
    ],
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      table: { margin: [0, 5, 0, 15] },
    },
  }
}