import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "../services/brandService";

const initialState = {
  brands: [],
  loading: false,
  fulfilled: false,
  error: false,
  message: "",
};

export const getBrandDetails = createAsyncThunk(
  "brands/getBrands",
  async (brand, ThunkAPI) => {
    try {
      return await brandService.getBrandDetails(brand);
    } catch (error) {
      const message = error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetBrands: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getBrandDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrandDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.fulfilled = true;
        if (action.payload[0]) {
          state.brands = [...state.brands, action.payload[0]];
        }
      })
      .addCase(getBrandDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { resetBrands } = brandSlice.actions;
export default brandSlice.reducer;
