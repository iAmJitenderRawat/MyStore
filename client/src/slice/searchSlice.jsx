import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const getSearch = createAsyncThunk("products/getSearch", async (query) => {
  const res = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
  console.log(res.data);
  return res.data.products;
});

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSearch.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getSearch.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

export default searchSlice.reducer;
