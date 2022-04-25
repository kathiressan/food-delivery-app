import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import accountReducer from "./slices/accountSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
