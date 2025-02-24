import { FormatteDecimalMath } from "~utils/index";

export const ServicioTransportePdfGeneralFile = (data) => {
  const { 
    totalAnulado, totalPesoBrutoAnulado, totalActivo, totalPesoBrutoActivo, 
    totalPagado, totalPesoBrutoPagado, detalleFilas
  } = data.reduce(
    (acc, liquidacion) => {
      // Sumar valores
      console.log(liquidacion.servicioEstadoDescripcion)
        if(liquidacion.servicioEstadoDescripcion === "Anulado"){
          acc.totalPesoBrutoAnulado += parseFloat(liquidacion.servicioPesoBruto) || 0;
          acc.totalAnulado  += parseFloat(liquidacion.servicioTotal) || 0;
        }
        if(liquidacion.servicioEstadoDescripcion === "Activo"){
          acc.totalPesoBrutoActivo += parseFloat(liquidacion.servicioPesoBruto) || 0;
          acc.totalActivo  += parseFloat(liquidacion.servicioTotal) || 0;
        }
        if(liquidacion.servicioEstadoDescripcion === "Pagado"){
          acc.totalPesoBrutoPagado += parseFloat(liquidacion.servicioPesoBruto) || 0;
          acc.totalPagado  += parseFloat(liquidacion.servicioTotal) || 0;
        }
  
      // Construir detalle
      acc.detalleFilas.push([
        { text: liquidacion.servicioFecha || "", alignment: "center" },
        { text: liquidacion.servicioCarguilloTitular || "", alignment: "left" },
        { text: liquidacion.servicioPrecio || "0.00", alignment: "center" },
        { text: liquidacion.servicioPesoBruto || "0.000", alignment: "right" },
        { text: liquidacion.servicioTotal || "0.00", alignment: "right" },
        { text: liquidacion.servicioEstadoDescripcion || "", alignment: "left" },
      ])  
      return acc;
    },
    {
      totalAnulado: 0, totalPesoBrutoAnulado: 0, 
      totalActivo: 0, totalPesoBrutoActivo: 0, 
      totalPagado: 0, totalPesoBrutoPagado: 0,
      detalleFilas: [],
    }
  )
  return {
    content: [
      // Información principal
      {
        style: "table",
        table: {
          widths: ["*"],
          body: [
            [{text: "REPORTE GENERAL SERVICIO TRANSPORTE" , bold: true, alignment: "center"}],
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
          widths: ["auto", "*", "auto", "auto", "auto", "auto"],
          body: [
            // Encabezados 'Fecha', 'Transportista', 'Trans. Precio', 'Peso Bruto', 'Total', 'Estado',
            [
              { text: "FECHA", bold: true, alignment: "center"  },
              { text: "TRANSPORTISTA", bold: true, alignment: "center"  },
              { text: "PRECIO", bold: true, alignment: "center"  },
              { text: "PESO BRUTO", bold: true, alignment: "center"  },
              { text: "TOTAL", bold: true, alignment: "center"  },
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
          widths: ["*", "auto", "auto"],
          body: [
            [
              {text: "TOTALES ANULADOS:", bold: true, alignment: "right"}, 
              { text: FormatteDecimalMath(totalPesoBrutoAnulado,3),  bold: true, alignment: "right" }, 
              { text: FormatteDecimalMath(totalAnulado,2),  bold: true, alignment: "right" }, 
            ],
            [
              {text: "TOTALES ACTIVOS:", bold: true, alignment: "right"}, 
              {text: FormatteDecimalMath(totalPesoBrutoActivo,3), bold: true, alignment: "right"},
              { text: FormatteDecimalMath(totalActivo,2),  bold: true, alignment: "right" }, 
            ],
            [
              {text: "TOTALES PAGADOS:", bold: true, alignment: "right"}, 
              { text: FormatteDecimalMath(totalPesoBrutoPagado,3),  bold: true, alignment: "center" },
              { text: FormatteDecimalMath(totalPagado,2),  bold: true, alignment: "right" }, 
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