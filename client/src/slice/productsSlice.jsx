import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const res = await axios.get(`https://dummyjson.com/products?limit=100`);
  console.log(res.data);
  return res.data.products;
});


export const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

export default productsSlice.reducer;


