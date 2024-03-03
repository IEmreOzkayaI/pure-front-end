import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userByIdInfo: null,
  userByIdError: false,
  userByIdProgress: false,
  userByIdInit: null,
};

const reducers = {
  userByIdProgress: (state) => {
    state.userByIdInfo = null;
    state.userByIdError = false;
    state.userByIdProgress = true;
    state.userByIdInit = false;
  },
  userByIdSuccess: (state, action) => {
    state.userByIdInfo = action.payload;
    state.userByIdError = false;
    state.userByIdInit = false;
    state.userByIdProgress = false;
  },
  userByIdFailure: (state, action) => {
    state.userByIdError = action.payload;
    state.userByIdInfo = null;
    state.userByIdProgress = false;
    state.userByIdInit = false;
  },
  clearUserByIdInfo: (state) => {
    state.userByIdInfo = null;
    state.userByIdError = false;
    state.userByIdInit = false;
    state.userByIdProgress = false;
  },
  userByIdFetch: (state, action) => {
    state.userByIdInit = action.payload;
    state.userByIdInfo = null;
    state.userByIdError = false;
    state.userByIdProgress = false;
  },
};

const userByIdSlice = createSlice({
  name: "userById",
  initialState,
  reducers,
});

export const {
  userByIdProgress,
  userByIdFailure,
  userByIdSuccess,
  clearUserByIdInfo,
  userByIdFetch,
} = userByIdSlice.actions;
export default userByIdSlice.reducer;
