import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../types";
import { toast } from "sonner";

interface ComparisonState {
  items: TProduct[];
}

const initialState: ComparisonState = {
  items: [],
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<TProduct>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        toast.info("Product is already in the comparison list.");
        return;
      }
      if (state.items.length >= 3) {
        toast.warning("You can compare a maximum of 3 products at a time.");
        return;
      }
      state.items.push(action.payload);
      toast.success(`"${action.payload.name}" added to comparison.`);
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      toast.info("Product removed from comparison.");
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  comparisonSlice.actions;
export default comparisonSlice.reducer;
