import { FormatteDecimalMath } from "~utils/index";

export const ReporteMasivoPdf = (data) => {
  const { totalPesoNeto, totalPesoBruto, liquidacionPagar, detalleFilas } = data.reduce(
    (acc, liquidacion) => {
      // Sumar valores
      acc.totalPesoNeto += parseFloat(liquidacion.liquidacionPesoNeto) || 0;
      acc.totalPesoBruto += parseFloat(liquidacion.liquidacionPesoBruto) || 0;
      acc.liquidacionPagar += parseFloat(liquidacion.liquidacionPagar) || 0;
  
      // Construir detalle
      acc.detalleFilas.push([
        { text: liquidacion.proveedorUT || "", alignment: "center" },
        { text: liquidacion.personaNombre || "", alignment: "left" },
        { text: liquidacion.tierraCampo || "", alignment: "center" },
        { text: liquidacion.liquidacionFechaInicio || "", alignment: "center" },
        { text: liquidacion.liquidacionFechaFin || "", alignment: "center" },
        { text: liquidacion.liquidacionPesoBruto || "0.000", alignment: "right" },
        { text: liquidacion.liquidacionPesoNeto || "0.000", alignment: "right" },
        { text: liquidacion.liquidacionPagar || "0.00", alignment: "right" },
        { text: liquidacion.liquidacionEstadoDescripcion || "", alignment: "center" },
      ])  
      return acc;
    },
    {
      totalPesoNeto: 0,
      totalPesoBruto: 0,
      liquidacionPagar: 0,
      detalleFilas: [],
    }
  )
  return {
    pageOrientation: 'landscape',
    content: [
      // Información principal
      {
        style: "table",
        table: {
          widths: ["*"],
          body: [
            [{text: "REPORTE MASIVO" , bold: true, alignment: "center"}],
          ],
        },
        layout: "noBorders", // Sin bordes
      },
      // Espacio
      { text: "\n" },
      // Tabla de Financiamiento
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*", "*","*", "*", "*"],
          body: [
            // Encabezados
            [
              { text: "UT", bold: true, alignment: "center"  },
              { text: "SEMBRADOR", bold: true, alignment: "center"  },
              { text: "CAMPO", bold: true, alignment: "center"  },
              { text: "FECHA INICIO", bold: true, alignment: "center"  },
              { text: "FECHA FINAL", bold: true, alignment: "center"  },
              { text: "PESO BRUTO", bold: true, alignment: "center"  },
              { text: "PESO NETO", bold: true, alignment: "center"  },
              { text: "POR PAGAR", bold: true, alignment: "center"  },
              { text: "ESTADO", bold: true, alignment: "center"  }
            ],            
            // Datos
            //...detalleFilasFinancia
            ...detalleFilas
          ]
        },
      },
      // Espacio
      { text: "\n" },
      // Totales
      {
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {text: "Total Peso Bruto:", bold: true, alignment: "right"}, 
              { text: FormatteDecimalMath(totalPesoBruto,3),  bold: true, alignment: "right" }, 
            ],
            [
              {text: "Total Peso Neto:", bold: true, alignment: "right"}, 
              {text: FormatteDecimalMath(totalPesoNeto,3), bold: true, alignment: "right"},
            ],
            [
              {text: "Total Por Pagar:", bold: true, alignment: "right"}, 
              { text: FormatteDecimalMath(liquidacionPagar,2),  bold: true, alignment: "center" },
            ],
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