
export const FormatteDecimal = (number, precision) => {
  return parseFloat(number).toFixed(precision)
}
export const FormatteDecimalMath = (number, precision) => {
  const factor = Math.pow(10, precision);
  return (Math.round(number * factor) / factor).toFixed(precision);
};
export const convertirFechaDDMMYYYY = (fechaString) => {
  const [year, month, day] = fechaString.split("-");
  return `${day}/${month}/${year}`;
  };
export const convertirFechaToYMD = (fechaISO) => {
  const fecha = new Date(fechaISO)
  const year = fecha.getFullYear()
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const day = String(fecha.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export const convertirFechaToISO = (fechaString) => {
  return new Date(fechaString.split('/').reverse().join('/'))
}
export const obtenerFechaLocal = ({date}) => {
  const fecha = new Date(date)
  return new Date(
    fecha.getTime() - fecha.getTimezoneOffset() * 60000
  ).toISOString()
}
export const formatterDataCombo = (id, value) => ({id: id, nombre: value})