import { FormatteDecimal } from "../common/FormatteData";

export const PROVEEDOR_DATA = [
    { id: 1, ut: "UT123", dni: "12345678", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
    { id: 2, ut: "UT456", dni: "87654320", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
    { id: 3, ut: "UT125", dni: "12345671", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
    { id: 4, ut: "UT455", dni: "87654322", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
    { id: 5, ut: "UT126", dni: "12345673", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
    { id: 6, ut: "UT457", dni: "87654324", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
    { id: 7, ut: "UT128", dni: "12345675", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
    { id: 8, ut: "UT459", dni: "87654326", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
    { id: 9, ut: "UT121", dni: "12345677", nombre: "Juan", apellidoPaterno:'Pérez',apellidoMaterno:'Leon', activo: true },
    { id: 10, ut: "UT452", dni: "87654329", nombre: "María", apellidoPaterno:'Gómez',apellidoMaterno:'Gómez', activo: false },
  ]
export const TIERRA_DATA = [
    { id: 1,  uc: 'UC123', campo: 'Guayaquil 1',  sector: 'Molino Larco 1', valle:'Chicama 1', ha:0.5, activo: false},
    { id: 2,  uc: 'UC456', campo: 'Guayaquil 2',  sector: 'Molino Larco 2', valle:'Chicama 2', ha:0.2, activo: true},
    { id: 3,  uc: 'UC125', campo: 'Guayaquil 3',  sector: 'Molino Larco 3', valle:'Chicama 3', ha:0.1, activo: true},
    { id: 4,  uc: 'UC455', campo: 'Guayaquil 4',  sector: 'Molino Larco 4', valle:'Chicama 4', ha:0.3, activo: false},
    { id: 5,  uc: 'UC126', campo: 'Guayaquil 5',  sector: 'Molino Larco 5', valle:'Chicama 5', ha:0.4, activo: true},
    { id: 6,  uc: 'UC457', campo: 'Guayaquil 6',  sector: 'Molino Larco 6', valle:'Chicama 6', ha:0.6, activo: false},
    { id: 7,  uc: 'UC128', campo: 'Guayaquil 7',  sector: 'Molino Larco 7', valle:'Chicama 7', ha:0.7, activo: false},
    { id: 8,  uc: 'UC459', campo: 'Guayaquil 8',  sector: 'Molino Larco 8', valle:'Chicama 8', ha:0.8, activo: true},
    { id: 9,  uc: 'UC121', campo: 'Guayaquil 9',  sector: 'Molino Larco 9', valle:'Chicama 9', ha:0.9, activo: false},
    { id: 10,  uc: 'UC452', campo: 'Guayaquil 10',  sector: 'Molino Larco 10', valle:'Chicama 10', ha:0, activo: true},
]
 const dataOriginal = [
    { id: 1,  uc: 'UC123', ut: "UT123", fecha: '16/11/2024', activo: false},
    { id: 2,  uc: 'UC456', ut: "UT456", fecha: '01/11/2024', activo: true},
    { id: 3,  uc: 'UC125', ut: "UT125", fecha: '10/11/2024', activo: true},
    { id: 4,  uc: 'UC455', ut: "UT455", fecha: '15/11/2024', activo: false},
    { id: 5,  uc: 'UC126', ut: "UT126", fecha: '18/11/2024', activo: true},
    { id: 6,  uc: 'UC457', ut: "UT457", fecha: '16/11/2024', activo: false},
    { id: 7,  uc: 'UC128', ut: "UT128", fecha: '19/11/2024', activo: false},
    { id: 8,  uc: 'UC459', ut: "UT459", fecha: '21/11/2024', activo: true},
    { id: 9,  uc: 'UC121', ut: "UT121", fecha: '04/11/2024', activo: false},
    { id: 10,  uc: 'UC452', ut: "UT452", fecha: '09/11/2024', activo: true},
]
const convertirFecha = (fechaString) => {
    const [day, month, year] = fechaString.split('/');
    // Crear fecha sin el ajuste automático de zona horaria
    return new Date(`${year}-${month}-${day}T00:00:00`);
  };
export const TIERRAASIGNADA_DATA = dataOriginal.map(item => ({
    ...item,
    fecha: convertirFecha(item.fecha) // Convertir DD/MM/YYYY a YYYY-MM-DD y luego a Date
  }));

const dataCosecha = [
    { id: 1, fecha: '16/11/2024', uc: 'UC123', valle:'Chicama 1', sector: 'Molino Larco 1', ut: "UT123", supervisor: 'Jose Vigo', campo: 'Guayaquil 1', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: true },
    { id: 2, fecha: '01/11/2024', uc: 'UC456', valle:'Chicama 2', sector: 'Molino Larco 2', ut: "UT456", supervisor: 'Jose Vigo', campo: 'Guayaquil 2', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: false },
    { id: 3, fecha: '10/11/2024', uc: 'UC125', valle:'Chicama 3', sector: 'Molino Larco 3', ut: "UT125", supervisor: 'Jose Vigo', campo: 'Guayaquil 3', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'No Cosecha', activo: true },
    { id: 4, fecha: '15/11/2024', uc: 'UC455', valle:'Chicama 4', sector: 'Molino Larco 4', ut: "UT455", supervisor: 'Jose Vigo', campo: 'Guayaquil 4', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: true },
    { id: 5, fecha: '18/11/2024', uc: 'UC126', valle:'Chicama 5', sector: 'Molino Larco 5', ut: "UT126", supervisor: 'Jose Vigo', campo: 'Guayaquil 5', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: false },
    { id: 6, fecha: '16/11/2024', uc: 'UC457', valle:'Chicama 6', sector: 'Molino Larco 6', ut: "UT457", supervisor: 'Jose Vigo', campo: 'Guayaquil 6', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Rechazado', activo: false },
    { id: 7, fecha: '19/11/2024', uc: 'UC128', valle:'Chicama 7', sector: 'Molino Larco 7', ut: "UT128", supervisor: 'Jose Vigo', campo: 'Guayaquil 7', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: true },
    { id: 8, fecha: '21/11/2024', uc: 'UC459', valle:'Chicama 8', sector: 'Molino Larco 8', ut: "UT459", supervisor: 'Jose Vigo', campo: 'Guayaquil 8', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: false },
    { id: 9, fecha: '04/11/2024', uc: 'UC121', valle:'Chicama 9', sector: 'Molino Larco 9', ut: "UT121", supervisor: 'Jose Vigo', campo: 'Guayaquil 9', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: true },
    { id: 10, fecha: '09/11/2024', uc: 'UC452', valle:'Chicama 10', sector: 'Molino Larco 10', ut: "UT452", supervisor: 'Jose Vigo', campo: 'Guayaquil 10', has:2.00, sac:12.99, red: 0.39, humedad:67.66, cosecha:'Cosecha', activo: true },
]
export const COSECHA_DATA = dataCosecha.map(item => ({
    ...item,
    fecha: convertirFecha(item.fecha)
}))

const data_Ticket = [
  { id: 1,  ingenio:'Casa Grande',fecha: '30/10/2024', viaje: '508689', transportista:'Representante SHEFA', chofer: 'TERCERO',      camion: "PE-Z3S930", caminoPeso: 19.590, vehiculo: 'PE-Z3S930', vehiculoPeso: 31.860, unidadPeso:'Kg', pesoBruto: 51.450, estado: 'Activo' },
  { id: 2,  ingenio:'Casa Grande',fecha: '31/10/2024', viaje: '508707', transportista:'Representante SHEFA', chofer: 'TERCERO',      camion: "PE-B8X726", caminoPeso: 19.400, vehiculo: 'PE-Z3S930', vehiculoPeso: 28.560, unidadPeso:'Kg', pesoBruto: 47.960, estado: 'Activo' },
  { id: 3,  ingenio:'Casa Grande',fecha: '31/10/2024', viaje: '508725', transportista:'Representante SHEFA', chofer: 'TRUCK DEL V.', camion: "PE-T3X896", caminoPeso: 19.860, vehiculo: 'PE-Z3S930', vehiculoPeso: 27.270, unidadPeso:'Kg', pesoBruto: 47.130, estado: 'Activo' },
  { id: 4,  ingenio:'Casa Grande',fecha: '31/10/2024', viaje: '508760', transportista:'Representante SHEFA', chofer: 'TRUCK DEL V.', camion: "PE-B8F726", caminoPeso: 16.630, vehiculo: 'PE-Z3S930', vehiculoPeso: 28.230, unidadPeso:'Kg', pesoBruto: 44.860, estado: 'Activo' },
  { id: 5,  ingenio:'Casa Grande',fecha: '31/10/2024', viaje: '508789', transportista:'Representante SHEFA', chofer: 'TERCERO',      camion: "PE-T1P890", caminoPeso: 20.610, vehiculo: 'PE-Z3S930', vehiculoPeso: 28.480, unidadPeso:'Kg', pesoBruto: 49.090, estado: 'Activo' },
  { id: 6,  ingenio:'Casa Grande',fecha: '01/11/2024', viaje: '508794', transportista:'Representante SHEFA', chofer: 'TRUCK DEL V.', camion: "PE-B5I782", caminoPeso: 22.800, vehiculo: 'PE-Z3S930', vehiculoPeso: 28.040, unidadPeso:'Kg', pesoBruto: 50.840, estado: 'Activo' },
  { id: 7,  ingenio:'Casa Grande',fecha: '01/11/2024', viaje: '508803', transportista:'Representante SHEFA', chofer: 'TRUCK DEL V.', camion: "PE-T3C820", caminoPeso: 16.710, vehiculo: 'PE-Z3S930', vehiculoPeso: 23.240, unidadPeso:'Kg', pesoBruto: 39.950, estado: 'Activo' },
  { id: 8,  ingenio:'Casa Grande',fecha: '01/12/2024', viaje: '508690', transportista:'Representante SHEFA', chofer: 'TERCERO',      camion: "PE-Z3S930", caminoPeso: 19.590, vehiculo: 'PE-Z3S930', vehiculoPeso: 31.860, unidadPeso:'Kg', pesoBruto: 51.450, estado: 'Archivado' },
  { id: 9,  ingenio:'Casa Grande',fecha: '01/12/2024', viaje: '508691', transportista:'Representante SHEFA', chofer: 'TERCERO',      camion: "PE-Z3S930", caminoPeso: 19.590, vehiculo: 'PE-Z3S930', vehiculoPeso: 31.860, unidadPeso:'Kg', pesoBruto: 51.450, estado: 'Tesoreria' },
  { id: 10, ingenio:'Casa Grande',fecha: '01/12/2024', viaje: '508692', transportista:'Representante SHEFA', chofer: 'TERCERO',      camion: "PE-Z3S930", caminoPeso: 19.590, vehiculo: 'PE-Z3S930', vehiculoPeso: 31.860, unidadPeso:'Kg', pesoBruto: 51.450, estado: 'Activo' },
]
export const TICKET_DATA = data_Ticket.map(item => ({
  ...item,
  fecha: convertirFecha(item.fecha),
  caminoPeso: FormatteDecimal(item.caminoPeso, 3),
  vehiculoPeso: FormatteDecimal(item.vehiculoPeso, 3),
  pesoBruto: FormatteDecimal(item.pesoBruto, 3)
}))

const now = new Date()
export const localISOString = new Date(
  now.getTime() - now.getTimezoneOffset() * 60000
).toISOString()