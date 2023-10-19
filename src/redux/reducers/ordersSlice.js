import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    loading: true,
    success: false,
    error: null,
  },
  reducers: {
    setOrdersData: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrdersData } = orderSlice.actions;
export default orderSlice.reducer;
