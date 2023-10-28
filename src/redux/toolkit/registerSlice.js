import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerInfo: null,
  registerError: false,
  registerProgress: false,
};

const reducers = {
  registerProgress: (state) => {
    state.registerInfo = null;
    state.registerError = false;
    state.registerProgress = true;
  },
  registerSuccess: (state, action) => {
    state.registerInfo = action.payload;
    state.registerError = false;
    state.registerProgress = false;
  },
  registerFailure: (state, action) => {
    state.registerError = action.payload;
    state.registerInfo = null;
    state.registerProgress = false;
  },
  clearRegisterInfo: (state) => {
    state.registerInfo = null;
    state.registerError = false;
    state.registerProgress = false;
  },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers,
});

export const {
  clearRegisterInfo,
  registerFailure,
  registerSuccess,
  registerProgress,
} = registerSlice.actions;
export default registerSlice.reducer;
