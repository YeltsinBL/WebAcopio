import { convertirFechaDDMMYYYY } from "~utils/index"

export const LiquidacionPdfFile = (data) => {
  const detalleFilasFinancia = data.liquidacionFinanciamiento.length > 0?
    data.liquidacionFinanciamiento.map((detalle) => [
        { text: detalle.liquidacionFinanciamientoFecha, alignment: "center" },
        { text: detalle.liquidacionFinanciamientoACuenta, alignment: "right" },
        { text: detalle.liquidacionFinanciamientoTiempo, alignment: "center" },
        { text: detalle.liquidacionFinanciamientoInteresMes, alignment: "center" },
        { text: detalle.liquidacionFinanciamientoInteres, alignment: "right" },
        { text: detalle.liquidacionFinanciamientoTotal, alignment: "right" },
    ]): [[
        { text: "", alignment: "center" },
        { text: "", alignment: "right" },
        { text: "", alignment: "center" },
        { text: "", alignment: "center" },
        { text: "", alignment: "right" },
        { text: "", alignment: "right" },
    ]]
  const detalleFilasAdicional = data.liquidacionAdicionals.length > 0 ?
    data.liquidacionAdicionals.map((detalle) => [
        { text: detalle.liquidacionAdicionalMotivo, alignment: "center" },
        { text: detalle.liquidacionAdicionalTotal, alignment: "right" },
    ]): [[
        { text: "", alignment: "center" },
        { text: "", alignment: "right" },
    ]]

  return {
    content: [
      // Información principal
      {
        style: "table",
        table: {
          widths: ["auto", "*"],
          body: [
            [{text: "SEMBRADO:" , bold: true}, data.personaNombre],
            [{text: "CAMPO:" , bold: true}, data.tierraCampo],
            [{text: "U.T.:" , bold: true}, data.proveedorUT],
            [{text: "Estado" , bold: true}, data.liquidacionEstadoDescripcion]
          ],
        },
        layout: "noBorders", // Sin bordes
      },
      // Espacio
      { text: "\n" },
      // Tabla de Ticket
      {
        style: "table",
        table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              // Encabezados
              [
                { text: "FECHA", bold: true, alignment: "center"  },
                { text: "PESO BRUTO", bold: true, alignment: "center"  },
                { text: "PESO NETO", bold: true, alignment: "center"  },
                // { text: "Estado", bold: true },
              ],            
              // Datos
               [
                { text: `${convertirFechaDDMMYYYY(data.liquidacionFechaInicio)}
                    AL
                    ${convertirFechaDDMMYYYY(data.liquidacionFechaFin)}`, alignment: "center" },
                { text: data.liquidacionPesoBruto, alignment: "right" },
                { text: data.liquidacionPesoNeto, alignment: "right" },
              ],
            ]
          },
      },      
      {
        style: "table",
        table: {
          widths: ["*", "*", "*"],
          body: [
            [
              {text: "TOTAL:", bold: true, alignment: "center"}, 
              {text: data.liquidacionPesoBruto, bold: true, alignment: "right"},
              {text: data.liquidacionPesoNeto, bold: true, alignment: "right"}
            ],
          ],
        },
        layout: {
          vLineWidth: () => 1, // Bordes verticales
        },
      },
      // Espacio
      { text: "\n" },
      { text: "TONELADAS POR PAGAR", bold: true },
      // Tabla de Tonelada
      {
        style: "table",
        table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              // Encabezados
              [
                { text: "PESOS NETOS", bold: true, alignment: "center"  },
                { text: "P. COMPRA", bold: true, alignment: "center"  },
                { text: "TOTAL", bold: true, alignment: "center"  },
                // { text: "Estado", bold: true },
              ],            
              // Datos
               [
                { text: data.liquidacionPesoNeto, alignment: "center" },
                { text: data.liquidacionToneladaPrecioCompra, alignment: "center" },
                { text: data.liquidacionToneladaTotal, alignment: "right" },
              ],
            ]
          },
      },
      {
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {text: "Total:", bold: true, alignment: "right"}, 
              {text: data.liquidacionToneladaTotal, bold: true, alignment: "right"}
            ],
          ],
        }
      },
      // Espacio
      { text: "\n" },
      { text: "FINANCIAMIENTO", bold: true },
      // Tabla de Financiamiento
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*", "*"],
          body: [
            // Encabezados
            [
              { text: "FECHA", bold: true, alignment: "center"  },
              { text: "A CUENTA", bold: true, alignment: "center"  },
              { text: "TIEMPO", bold: true, alignment: "center"  },
              { text: "INTERES DIA", bold: true, alignment: "center"  },
              { text: "INTERES S/", bold: true, alignment: "center"  },
              { text: "TOTAL", bold: true, alignment: "center"  }
            ],            
            // Datos
            ...detalleFilasFinancia
          ]
        },
      },    
      // Totales
      {
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {text: "A CUENTA:", bold: true, alignment: "right"}, 
              {text: data.liquidacionFinanciamientoACuenta, bold: true, alignment: "right"}],
          ],
        },
        layout: {
          hLineWidth: () => 1, // Bordes horizontales
          vLineWidth: () => 1, // Bordes verticales
        },
      },
      
      // Espacio
      { text: "\n" },
      { text: "ADICIONALES", bold: true },
      // Tabla de ADICIONALES
      {
        style: "table",
        table: {
          headerRows: 1,
          widths: ["*", "auto"],
          body: [        
            // Datos
            ...detalleFilasAdicional
          ]
        },
      },    
      // Totales
      {
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {text: "TOTAL:", bold: true, alignment: "right"}, 
              {text: data.liquidacionAdicionalTotal, bold: true, alignment: "right"}            
            ],
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
        style: "table",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {text: "POR PAGAR:", bold: true, alignment: "right"}, 
              {text: data.liquidacionPagar, bold: true, alignment: "right"}            
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