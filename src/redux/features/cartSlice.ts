import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../types";

export interface CartItem extends TProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  vendorId: string | null;
}

const initialState: CartState = {
  items: [],
  vendorId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TProduct>) => {
      const product = action.payload;

      if (state.vendorId && state.vendorId !== product?.shop?.id) {
        throw new Error("DIFFERENT_VENDOR_DETECTED"); // Custom error identifier
      }

      if (!state.vendorId) state.vendorId = product?.shop?.id ?? null;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1; // Increase the quantity if product exists
      } else {
        state.items.push({ ...product, quantity: 1 }); // Add new product with quantity 1
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (state.items.length === 0) state.vendorId = null;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.vendorId = null;
    },
    replaceCart: (state, action: PayloadAction<TProduct[]>) => {
      const products = action.payload;
      state.items = products.map((product) => ({ ...product, quantity: 1 }));
      state.vendorId = products[0]?.shop?.id || null;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  clearCart,
  replaceCart,
} = cartSlice.actions;

export default cartSlice.reducer;
