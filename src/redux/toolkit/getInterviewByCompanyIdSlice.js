import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interviewInfo: null,
  interviewError: false,
  interviewProgress: false,
  interviewInit: null,
};

const reducers = {
  interviewProgress: (state) => {
    state.interviewInfo = null;
    state.interviewError = false;
    state.interviewProgress = true;
    state.interviewInit = false;
  },
  interviewSuccess: (state, action) => {
    state.interviewInfo = action.payload;
    state.interviewError = false;
    state.interviewInit = false;
    state.interviewProgress = false;
  },
  interviewFailure: (state, action) => {
    state.interviewError = action.payload;
    state.interviewInfo = null;
    state.interviewProgress = false;
    state.interviewInit = false;
  },
  clearInterviewInfo: (state) => {
    state.interviewInfo = null;
    state.interviewError = false;
    state.interviewInit = false;
    state.interviewProgress = false;
  },
  interviewFetch: (state, action) => {
    state.interviewInit = action.payload;
    state.interviewInfo = null;
    state.interviewError = false;
    state.interviewProgress = false;
  },
};

const getInterviewByCompanyIdSlice = createSlice({
  name: "getInterviewByCompanyId",
  initialState,
  reducers,
});

export const {
  interviewProgress,
  interviewFailure,
  interviewSuccess,
  clearInterviewInfo,
  interviewFetch,
} = getInterviewByCompanyIdSlice.actions;
export default getInterviewByCompanyIdSlice.reducer;
