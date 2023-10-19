// store.js
import {  createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    seller: null,
    loading: true,
    success: false,
    error: null,
  },
  reducers: {
    setSellerData: (state, action) => {
      state.seller = action.payload;
    },
  },
});

export const { setSellerData } = sellerSlice.actions;
export default sellerSlice.reducer;
