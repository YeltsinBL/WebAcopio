import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/user";
import { modulesSlice } from "./states/modules";

export default configureStore({
  reducer:{
    user:userSlice.reducer,
    modules: modulesSlice.reducer
  }
})