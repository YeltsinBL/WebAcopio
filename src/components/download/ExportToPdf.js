import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export const ExportToPdf = (docDefinition, name) => {

// Registrar las fuentes para pdfmake
pdfMake.vfs = pdfFonts.vfs;

// Generar y descargar el PDF
return pdfMake.createPdf(docDefinition).download(`${name}.pdf`);

  
}
