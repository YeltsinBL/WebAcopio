export const ServicioTransportePdfFile = (data) => {
  return {
    pageOrientation: 'landscape',
    content: [
      // Información principal
      {
        style: "table",
        table: {
          widths: ["auto", "*"],
          body: [
            ["Fecha:", data.servicioFecha],
            ["Transportista:", data.carguilloTitular],
            ["Estado:", data.servicioEstadoDescripcion],
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
              { text: "Fecha", bold: true, alignment: "center"  },            
              { text: "Vehículo", bold: true, alignment: "center"  },
              { text: "Camión", bold: true, alignment: "center"  },
              { text: "Transportista", bold: true, alignment: "center"  },
              { text: "Peso Vehículo", bold: true, alignment: "center"  },
              { text: "Peso Camión", bold: true, alignment: "center"  },
              { text: "Peso Bruto", bold: true, alignment: "center"  },
              // { text: "Estado", bold: true },
            ],            
            // Datos
            ...data.servicioDetails.map((detalle) => [
              { text: detalle.ticketIngenio, alignment: "center" },
              { text: detalle.ticketViaje, alignment: "center" },
              { text: detalle.ticketCampo, alignment: "center" },
              { text: detalle.ticketFecha, alignment: "center" },
              { text: detalle.ticketVehiculo, alignment: "center" },
              { text: detalle.ticketCamion, alignment: "center" },
              { text: detalle.ticketTransportista, alignment: "center" },
              { text: detalle.ticketVehiculoPeso, alignment: "right" },
              { text: detalle.ticketCamionPeso, alignment: "right" },
              { text: detalle.ticketPesoBruto, alignment: "right" },
            ]),
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
              {text: data.servicioPesoBruto, bold: true, alignment: "right"}],
            [
              {text: "Precio:", bold: true, alignment: "right"},
              {text: data.servicioPrecio, bold: true, alignment: "right"}],
            [
              {text: "Total:", bold: true, alignment: "right"}, 
              {text: data.servicioTotal, bold: true, alignment: "right"}],
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