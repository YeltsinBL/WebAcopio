import { appSetting } from "../settings/appsetting"

export const AuthorizationActivateResetPassword = async(userId) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Authorization/ActivateResetPassword/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('userSave:', error.message)
    throw new Error('Error al guardar el usuario')
  }
}