import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  selectedPlace: null,
  isLoading: false,
  error: null,
};

const findPlaceSlice = createSlice({
  name: "findPlace",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedPlace,
  setLoading,
  setError,
  clearError,
  reset,
} = findPlaceSlice.actions;

export default findPlaceSlice.reducer;
