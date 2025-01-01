import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/ShopCart/itemSlice";
import cartReducer from "../features/ShopCart/cartSlice"

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

