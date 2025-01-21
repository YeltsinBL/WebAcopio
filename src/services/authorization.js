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
export const AuthorizationVerifyPassword = async(credentials) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Authorization/VerifyPassword`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('userSave:', error.message)
    throw new Error('Error al guardar el usuario')
  }
}
export const AuthorizationResetPassword = async(credentials) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Authorization/ResetPassword`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.log('userSave:', error.message)
    throw new Error('Error al guardar el usuario')
  }
}
export const AuthorizationLogIn = async(credentials) => {
  try {
    const response = await fetch(`${appSetting.apiUrl}Authorization/LogIn`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    if (!response.ok) {
      return {
        result: false,
        error: await response.text()
      }
      //throw new Error(`HTTP error! status: ${await response.text()}`)
    }
    return await response.json()
  } catch (error) {
    console.log('userSave:', error.message)
    throw new Error('Error al guardar el usuario')
  }
}