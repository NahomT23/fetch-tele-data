import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../types"; 

interface CartItem extends Item {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

// Retrieve initial state from localStorage
const savedCart = localStorage.getItem("cart");
const initialState: CartState = savedCart
  ? JSON.parse(savedCart)
  : { items: [], totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        state.items.splice(index, 1);
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;

        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      } else if (item) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
