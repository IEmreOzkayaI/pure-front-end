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
    state.confirmFetch = null;
  },
  confirmSuccess: (state, action) => {
    state.confirmInfo = action.payload;
    state.confirmError = false;
    state.confirmFetch = null;
    state.confirmProgress = false;
  },
  confirmFailure: (state, action) => {
    state.confirmError = action.payload;
    state.confirmInfo = null;
    state.confirmProgress = false;
    state.confirmFetch = null;
  },
  clearConfirmInfo: (state) => {
    state.confirmInfo = null;
    state.confirmError = false;
    state.confirmFetch = null;
    state.confirmProgress = false;
  },
  confirmFetch: (state, action) => {
    state.confirmFetch = action.payload;
    state.confirmInfo = null;
    state.confirmError = false;
    state.confirmProgress = false;
  },
  reConfirmFetch: (state, action) => {
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
  reConfirmFetch,
} = confirmSlice.actions;
export default confirmSlice.reducer;
