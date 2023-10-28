import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authInfo: null,
  authError: false,
  authProgress: false,
  authFetch: null,
};

const reducers = {
  authProgress: (state) => {
    state.authInfo = null;
    state.authError = false;
    state.authProgress = true;
    // state.authFetch = false;
  },
  authSuccess: (state, action) => {
    console.log(action);
    state.authInfo = action.payload;
    state.authError = false;
    state.authFetch = false;
    state.authProgress = false;
  },
  authFailure: (state, action) => {
    state.authError = action.payload;
    state.authInfo = null;
    state.authProgress = false;
    state.authFetch = false;
  },
  clearAuthInfo: (state) => {
    state.authInfo = null;
    state.authError = false;
    state.authFetch = false;
    state.authProgress = false;
  },
  authFetch: (state, action) => {
    state.authFetch = action.payload;
    state.authInfo = null;
    state.authError = false;
    state.authProgress = false;
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export const {
  authProgress,
  authFailure,
  authSuccess,
  clearAuthInfo,
  authFetch,
} = authSlice.actions;
export default authSlice.reducer;
