import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRegisterInterviewInfo: null,
  userRegisterInterviewError: false,
  userRegisterInterviewProgress: false,
  userRegisterInterviewInit: null,
};

const reducers = {
  userRegisterInterviewProgress: (state) => {
    state.userRegisterInterviewInfo = null;
    state.userRegisterInterviewError = false;
    state.userRegisterInterviewProgress = true;
    state.userRegisterInterviewInit = null;
  },
  userRegisterInterviewSuccess: (state, action) => {
    state.userRegisterInterviewInfo = action.payload;
    state.userRegisterInterviewError = false;
    state.userRegisterInterviewInit = null;
    state.userRegisterInterviewProgress = false;
  },
  userRegisterInterviewFailure: (state, action) => {
    state.userRegisterInterviewError = action.payload;
    state.userRegisterInterviewInfo = null;
    state.userRegisterInterviewProgress = false;
    state.userRegisterInterviewInit = null;
  },
  clearUserRegisterInterviewInfo: (state) => {
    state.userRegisterInterviewInfo = null;
    state.userRegisterInterviewError = false;
    state.userRegisterInterviewInit = null;
    state.userRegisterInterviewProgress = false;
  },
  userRegisterInterviewInit: (state, action) => {
    state.userRegisterInterviewInit = action.payload;
    state.userRegisterInterviewInfo = null;
    state.userRegisterInterviewError = false;
    state.userRegisterInterviewProgress = false;
  },
};

const userRegisterInterviewSlice = createSlice({
  name: "userRegisterInterview",
  initialState,
  reducers,
});

export const {
  userRegisterInterviewProgress,
  userRegisterInterviewSuccess,
  userRegisterInterviewFailure,
  clearUserRegisterInterviewInfo,
  userRegisterInterviewInit,
} = userRegisterInterviewSlice.actions;
export default userRegisterInterviewSlice.reducer;
