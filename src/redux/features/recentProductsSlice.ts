import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  link: string;
}

interface RecentProductsState {
  products: Product[];
}

const initialState: RecentProductsState = {
  products: JSON.parse(localStorage.getItem("recentProducts") || "[]"),
};

const recentProductsSlice = createSlice({
  name: "recentProducts",
  initialState,
  reducers: {
    addRecentProduct: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Remove the existing product to re-add it to the top
        state.products.splice(existingIndex, 1);
      }

      state.products.unshift(action.payload); // Add new product to the top

      if (state.products.length > 10) {
        state.products.pop(); // Remove the oldest product
      }

      // Persist to localStorage
      localStorage.setItem("recentProducts", JSON.stringify(state.products));
    },
  },
});

export const { addRecentProduct } = recentProductsSlice.actions;

export default recentProductsSlice.reducer;
