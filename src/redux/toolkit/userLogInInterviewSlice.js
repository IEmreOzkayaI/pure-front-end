import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLogInInterviewInfo: null,
  userLogInInterviewError: false,
  userLogInInterviewProgress: false,
  userLogInInterviewInit: null,
};

const reducers = {
  userLogInInterviewProgress: (state) => {
    state.userLogInInterviewInfo = null;
    state.userLogInInterviewError = false;
    state.userLogInInterviewProgress = true;
    state.userLogInInterviewInit = null;
  },
  userLogInInterviewSuccess: (state, action) => {
    state.userLogInInterviewInfo = action.payload;
    state.userLogInInterviewError = false;
    state.userLogInInterviewInit = null;
    state.userLogInInterviewProgress = false;
  },
  userLogInInterviewFailure: (state, action) => {
    state.userLogInInterviewError = action.payload;
    state.userLogInInterviewInfo = null;
    state.userLogInInterviewProgress = false;
    state.userLogInInterviewInit = null;
  },
  clearUserLogInInterviewInfo: (state) => {
    state.userLogInInterviewInfo = null;
    state.userLogInInterviewError = false;
    state.userLogInInterviewInit = null;
    state.userLogInInterviewProgress = false;
  },
  userLogInInterviewInit: (state, action) => {
    state.userLogInInterviewInit = action.payload;
    state.userLogInInterviewInfo = null;
    state.userLogInInterviewError = false;
    state.userLogInInterviewProgress = false;
  },
};

const userLogInInterviewSlice = createSlice({
  name: "userLogInInterview",
  initialState,
  reducers,
});

export const {
  userLogInInterviewProgress,
  userLogInInterviewSuccess,
  userLogInInterviewFailure,
  clearUserLogInInterviewInfo,
  userLogInInterviewInit,
} = userLogInInterviewSlice.actions;
export default userLogInInterviewSlice.reducer;
