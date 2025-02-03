import { appSetting } from "~settings/appsetting";

export const searchTipoComprobante = async() => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Tipos/TipoComprobante`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('searchTipoComprobante:', error.message)
    throw new Error('Error al buscar los Tipos de Comprobantes')
  }
}