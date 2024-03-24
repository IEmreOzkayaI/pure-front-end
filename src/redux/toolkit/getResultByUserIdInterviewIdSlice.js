import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getResultByUserIdInterviewIdInfo: null,
  getResultByUserIdInterviewIdError: false,
  getResultByUserIdInterviewIdProgress: false,
  getResultByUserIdInterviewIdInit: null,
};

const reducers = {
  getResultByUserIdInterviewIdProgress: (state) => {
    state.getResultByUserIdInterviewIdInfo = null;
    state.getResultByUserIdInterviewIdError = false;
    state.getResultByUserIdInterviewIdProgress = true;
    state.getResultByUserIdInterviewIdInit = false;
  },
  getResultByUserIdInterviewIdSuccess: (state, action) => {
    state.getResultByUserIdInterviewIdInfo = action.payload;
    state.getResultByUserIdInterviewIdError = false;
    state.getResultByUserIdInterviewIdInit = false;
    state.getResultByUserIdInterviewIdProgress = false;
  },
  getResultByUserIdInterviewIdFailure: (state, action) => {
    state.getResultByUserIdInterviewIdError = action.payload;
    state.getResultByUserIdInterviewIdInfo = null;
    state.getResultByUserIdInterviewIdProgress = false;
    state.getResultByUserIdInterviewIdInit = false;
  },
  cleargetResultByUserIdInterviewIdInfo: (state) => {
    state.getResultByUserIdInterviewIdInfo = null;
    state.getResultByUserIdInterviewIdError = false;
    state.getResultByUserIdInterviewIdInit = false;
    state.getResultByUserIdInterviewIdProgress = false;
  },
  getResultByUserIdInterviewIdFetch: (state, action) => {
    state.getResultByUserIdInterviewIdInit = action.payload;
    state.getResultByUserIdInterviewIdInfo = null;
    state.getResultByUserIdInterviewIdError = false;
    state.getResultByUserIdInterviewIdProgress = false;
  },
};

const getResultByUserIdInterviewIdSlice = createSlice({
  name: "getResultByUserIdInterviewIdSlice",
  initialState,
  reducers,
});

export const {
  getResultByUserIdInterviewIdProgress,
  getResultByUserIdInterviewIdFailure,
  getResultByUserIdInterviewIdSuccess,
  cleargetResultByUserIdInterviewIdInfo,
  getResultByUserIdInterviewIdFetch,
} = getResultByUserIdInterviewIdSlice.actions;
export default getResultByUserIdInterviewIdSlice.reducer;
