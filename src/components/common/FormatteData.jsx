
export const FormatteDecimal = (number, precision) => {
  return parseFloat(number).toFixed(precision)
}
export const convertirFechaToYMD = (fechaISO) => {
  const fecha = new Date(fechaISO)
  const year = fecha.getFullYear()
  const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const day = String(fecha.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}