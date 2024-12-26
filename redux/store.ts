import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import authReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    authSlice:authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(baseApi.middleware);
  },
});



export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch

export default store
