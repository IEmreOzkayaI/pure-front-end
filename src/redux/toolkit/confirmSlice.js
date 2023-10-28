import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmInfo: null,
  confirmError: false,
  confirmProgress: false,
  confirmFetch: null,
};

const reducers = {
  confirmProgress: (state) => {
    state.confirmInfo = null;
    state.confirmError = false;
    state.confirmProgress = true;
    // state.confirmFetch = false;
  },
  confirmSuccess: (state, action) => {
    state.confirmInfo = action.payload;
    state.confirmError = false;
    state.confirmFetch = false;
    state.confirmProgress = false;
  },
  confirmFailure: (state, action) => {
    state.confirmError = action.payload;
    state.confirmInfo = null;
    state.confirmProgress = false;
    state.confirmFetch = false;
  },
  clearConfirmInfo: (state) => {
    state.confirmInfo = null;
    state.confirmError = false;
    state.confirmFetch = false;
    state.confirmProgress = false;
  },
  confirmFetch: (state, action) => {
    state.confirmFetch = action.payload;
    state.confirmInfo = null;
    state.confirmError = false;
    state.confirmProgress = false;
  },
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers,
});

export const {
  confirmProgress,
  confirmFailure,
  confirmSuccess,
  clearAuthInfo,
  confirmFetch,
} = confirmSlice.actions;
export default confirmSlice.reducer;
