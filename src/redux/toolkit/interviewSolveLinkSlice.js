import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interviewSolveLinkInfo: null,
  interviewSolveLinkError: false,
  interviewSolveLinkProgress: false,
  interviewSolveLinkInit: null,
};

const reducers = {
  interviewSolveLinkProgress: (state) => {
    state.interviewSolveLinkInfo = null;
    state.interviewSolveLinkError = false;
    state.interviewSolveLinkProgress = true;
    state.interviewSolveLinkInit = false;
  },
  interviewSolveLinkSuccess: (state, action) => {
    state.interviewSolveLinkInfo = action.payload;
    state.interviewSolveLinkError = false;
    state.interviewSolveLinkInit = false;
    state.interviewSolveLinkProgress = false;
  },
  interviewSolveLinkFailure: (state, action) => {
    state.interviewSolveLinkError = action.payload;
    state.interviewSolveLinkInfo = null;
    state.interviewSolveLinkProgress = false;
    state.interviewSolveLinkInit = false;
  },
  clearInterviewSolveLinkInfo: (state) => {
    state.interviewSolveLinkInfo = null;
    state.interviewSolveLinkError = false;
    state.interviewSolveLinkInit = false;
    state.interviewSolveLinkProgress = false;
  },
  interviewSolveLinkFetch: (state, action) => {
    state.interviewSolveLinkInit = action.payload;
    state.interviewSolveLinkInfo = null;
    state.interviewSolveLinkError = false;
    state.interviewSolveLinkProgress = false;
  },
};

const interviewSolveLinkSlice = createSlice({
  name: "interviewSolveLink",
  initialState,
  reducers,
});

export const {
  interviewSolveLinkProgress,
  interviewSolveLinkFailure,
  interviewSolveLinkSuccess,
  clearInterviewSolveLinkInfo,
  interviewSolveLinkFetch,
} = interviewSolveLinkSlice.actions;
export default interviewSolveLinkSlice.reducer;
