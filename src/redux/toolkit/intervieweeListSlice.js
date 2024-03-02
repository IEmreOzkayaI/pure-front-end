import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  intervieweeListInfo: null,
  intervieweeListError: false,
  intervieweeListProgress: false,
  intervieweeListInit: null,
};

const reducers = {
  intervieweeListProgress: (state) => {
    state.intervieweeListInfo = null;
    state.intervieweeListError = false;
    state.intervieweeListProgress = true;
    state.intervieweeListInit = false;
  },
  intervieweeListSuccess: (state, action) => {
    state.intervieweeListInfo = action.payload;
    state.intervieweeListError = false;
    state.intervieweeListInit = false;
    state.intervieweeListProgress = false;
  },
  intervieweeListFailure: (state, action) => {
    state.intervieweeListError = action.payload;
    state.intervieweeListInfo = null;
    state.intervieweeListProgress = false;
    state.intervieweeListInit = false;
  },
  clearIntervieweeListInfo: (state) => {
    state.intervieweeListInfo = null;
    state.intervieweeListError = false;
    state.intervieweeListInit = false;
    state.intervieweeListProgress = false;
  },
  intervieweeListFetch: (state, action) => {
    state.intervieweeListInit = action.payload;
    state.intervieweeListInfo = null;
    state.intervieweeListError = false;
    state.intervieweeListProgress = false;
  },
};

const intervieweeListSlice = createSlice({
  name: "intervieweeList",
  initialState,
  reducers,
});

export const {
  intervieweeListProgress,
  intervieweeListFailure,
  intervieweeListSuccess,
  clearIntervieweeListInfo,
  intervieweeListFetch,
} = intervieweeListSlice.actions;
export default intervieweeListSlice.reducer;
