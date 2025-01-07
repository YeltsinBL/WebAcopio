import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, persistLocalStorage } from "../../utils";

export const ModuleKey = 'modules'

export const modulesSlice = createSlice({
  name: "modules",
  initialState: localStorage.getItem(ModuleKey) ? Object.values(JSON.parse(localStorage.getItem(ModuleKey))):[],
  reducers: {
    setModuleNames(_, action) {
      persistLocalStorage(ModuleKey, action.payload)
      return action.payload
    },
    updateModulesName: (state, action) => {
      const update = {...state, ...action.payload}
      persistLocalStorage(ModuleKey, update)
      return update
    },
    clearModuleNames() {
      clearLocalStorage(ModuleKey)
      return []
    }
  }
})

export const { setModuleNames, updateModulesName, clearModuleNames } = modulesSlice.actions

export default modulesSlice.reducer
