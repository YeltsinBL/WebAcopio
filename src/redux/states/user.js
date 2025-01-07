import { createSlice } from "@reduxjs/toolkit"
import { clearLocalStorage, persistLocalStorage } from "../../utils/localStorage"

export const UserKey = 'userKey'

export const userSlice = createSlice({
  name: UserKey,
  initialState: localStorage.getItem(UserKey) ? JSON.parse(localStorage.getItem(UserKey)):{},
  reducers: {
    createUser: (_, action) => {
      persistLocalStorage(UserKey, action.payload)
      return action.payload
    },
    updateUser: (state, action) => {
      const update = {...state, ...action.payload}
      persistLocalStorage(UserKey, update)
      return update
    },
    resetUser: () => {
      clearLocalStorage(UserKey)
      return {}
    }
  }
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
