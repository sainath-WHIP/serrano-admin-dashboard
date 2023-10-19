// store.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: true,
    success: false,
    error: null,
  },
  reducers: {
    setProductData: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;
