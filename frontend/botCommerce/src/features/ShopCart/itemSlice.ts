import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Item } from "../../types"; 

interface ItemsState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ItemsState = {
  items: [],
  status: "idle",
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  // const response = await fetch("http://localhost:5000/api/items");
  const response = await fetch("https://fetch-tele-data.vercel.app/api/items");
  return (await response.json()) as Item[];
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default itemsSlice.reducer;

