export const InformeIngresoGastoPdf = (data) => {
  // Función para obtener el texto según la prioridad
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
  const detalleFactura = data.informeFacturas.map((detalle) => [
    { text: detalle.informeFacturaFecha, alignment: "center" },
    { text: detalle.informeFacturaNumero, alignment: "center" },
    { text: detalle.informeFacturaImporte, alignment: "right" },
  ])
  const detalleCosto = data.informeCostos.map((detalle) => [
      { text: obtenerTextoPrioridad(detalle.informeCostoOrden), alignment: "left" },
      { text: detalle.informeCostoPrecio, alignment: "center" },
      { text: detalle.informeCostoTonelada, alignment: "center" },
      { text: detalle.informeCostoTotal, alignment: "right" },
    ])
  return {
    content: [
      // Información principal
      {
        style: "table",
        table: {
          widths: ["*"],
          body: [
            [{text: "INFORME DE INGRESOS Y GASTOS" , bold: true, alignment: "center"}],
          ],
        },
        layout: "noBorders", // Sin bordes
      },
      // Espacio
      { text: "\n" },
      {
        style: "table",
        table: {
          widths: ["auto", "*"],
          body: [
            [{text: "SEMBRADO:" , bold: true}, data.personaNombre],
            [{text: "CAMPO:" , bold: true}, data.tierraCampo],
            [{text: "U.T.:" , bold: true}, data.proveedorUT],
          ],
        },
        layout: "noBorders", // Sin bordes
      },
      // Espacio
      // Tabla de Financiamiento
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto"],
          body: [
            // Encabezados
            [
              { text: "FECHA", bold: true, alignment: "center"  },
              { text: "FACTURA", bold: true, alignment: "center"  },
              { text: "TOTAL", bold: true, alignment: "center"  }
            ],            
            // Datos
            ...detalleFactura
          ]
        },
      },    
      // Totales
      {
        style: "table",
        table: {
          widths: ["26%", "auto"],
          body: [
            [
              {text: "TOTAL:", bold: true, alignment: "right"}, 
              {text: data.informeFacturaTotal, bold: true, alignment: "right"}],
          ],
        },
        layout: {
          hLineWidth: () => 1, // Bordes horizontales
          vLineWidth: () => 1, // Bordes verticales
        },
      },
      { text: "\n" },
      // Tabla de COSTOS
      { text: "COSTOS", bold: true },
      {
        style: "table",
        table: {
            headerRows: 1,
            widths: ["auto","auto", "auto", "auto"],
            body: [
              // Encabezados
              [
                { text: ""},
                { text: "PRECIO", bold: true, alignment: "center"  },
                { text: "TONELADAS", bold: true, alignment: "right"  },
                { text: "TOTAL", bold: true, alignment: "right"  },
                // { text: "Estado", bold: true },
              ],            
              // Datos
              ...detalleCosto
            ]
          },
      },
      // Totales
      {
        style: "table",
        table: {
          widths: ["56%", "auto"],
          body: [
            [
              {text: "TOTAL:", bold: true, alignment: "right"}, 
              {text: data.informeCostoTotal, bold: true, alignment: "right"}],
          ],
        },
        layout: {
          hLineWidth: () => 1, // Bordes horizontales
          vLineWidth: () => 1, // Bordes verticales
        },
      },
      
      // Espacio
      { text: "\n" },
      // Totales
      {
        columns:[
          { width: "43%", text: "" }, 
          {
            style: "table",
            table: {
              widths: ["auto", "auto"],
              body: [
                [
                  {text: "UTILIDAD:", bold: true, alignment: "right", }, 
                  {text: data.informeTotal, bold: true, alignment: "right"}            
                ],
              ],
            },
            layout: {
              hLineWidth: () => 1, // Bordes horizontales
              vLineWidth: () => 1, // Bordes verticales
            },
          },
          { width: "10%", text: "" }, 
        ]
      },
      
      { text: "\n" },
      { text: "RESULTADO", bold: true },
      { text: data.informeResultado },

    ],
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      table: { margin: [0, 5, 0, 15] },
    },
  }
}