import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productToEdit: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductToEdit: (state, action) => {
      state.productToEdit = action.payload;
    },
  },
});

export const { setProductToEdit } = productSlice.actions;

// Selectors
export const selectProductToEdit = (state) => state.product.productToEdit;

export default productSlice.reducer;
